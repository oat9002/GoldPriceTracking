import * as serviceAccount from "../config/goldpricetracking-firebase-adminsdk-718s5-85e720333f.json";
import { User } from "../models/User";
import * as utils from "../util/utils";
import { mapPriceFromDb, Price } from "./../models/Price";
import admin = require("firebase-admin");

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = app.database();

export function getInstance() {
    return db;
}

export async function addPrice(buy: number, sell: number): Promise<void> {
    try {
        const latestPrice = await getLatestPrice();
        const uid = db.ref().child("price").push().key;
        await db.ref("price/" + uid).set({
            buy: buy,
            sell: sell,
            buyDifferent: buy - latestPrice.buy,
            sellDifferent: sell - latestPrice.sell,
            created_at: new Date().getTime(),
        });
    } catch (err) {
        utils.log(err.message + "\n" + err.stack);
    }
}

export async function shouldAddPrice(
    buy: number,
    sell: number
): Promise<boolean> {
    try {
        const snapshot = await db
            .ref("price")
            .orderByChild("created_at")
            .limitToLast(1)
            .once("value");

        const data = snapshot.val();
        const id = Object.keys(data)[0];
        const oldBuy = data[id].buy;
        const oldSell = data[id].sell;

        if (buy - oldBuy !== 0 || sell - oldSell !== 0) {
            return true;
        }

        return false;
    } catch (err) {
        throw createErrorFromException(err);
    }
}

export async function getLatestPrice(): Promise<Price> {
    try {
        const snapshot = await db
            .ref("price")
            .orderByChild("created_at")
            .limitToLast(1)
            .once("value");
        const toReturn: Price[] = [];

        snapshot.forEach((childSnapshot) => {
            toReturn.push(mapPriceFromDb(childSnapshot.val()));
        });

        return toReturn[0];
    } catch (err) {
        throw createErrorFromException(err);
    }
}

export async function addLineUser(userId: string): Promise<void> {
    try {
        const uid = db.ref().child("user").push().key;
        await db.ref("user/" + uid).set({
            id: userId,
        });
    } catch (err) {
        throw createErrorFromException(err);
    }
}

export async function getAllUser(): Promise<User[]> {
    try {
        const snapshot = await db.ref("user").once("value");

        return snapshot.val();
    } catch (err) {
        throw createErrorFromException(err);
    }
}

/* number: number of latest data (0 = all)*/
export async function getLatestPrices(number: number): Promise<Price[]> {
    const priceArr: Price[] = new Array(number);
    let idx = 0;
    try {
        const snapshot =
            number !== 0
                ? await db
                      .ref("price")
                      .orderByChild("created_at")
                      .limitToLast(number)
                      .once("value")
                : await db
                      .ref("price")
                      .orderByChild("created_at")
                      .once("value");

        snapshot.forEach((childSnapshot) => {
            priceArr[idx++] = mapPriceFromDb(childSnapshot.val());
        });

        return priceArr;
    } catch (err) {
        throw createErrorFromException(err);
    }
}

export async function getPricesLastByDay(days: number) {
    const now = new Date();
    const end = now.getTime();
    let idx = 0;

    now.setHours(0, 0, 0, 0);
    now.setDate(now.getDate() - days);

    const start = now.getTime();
    try {
        const snapshot = await db
            .ref("price")
            .orderByChild("created_at")
            .startAt(start)
            .endAt(end)
            .once("value");

        const numberOfChildren = snapshot.numChildren();
        if (numberOfChildren === 0) {
            return null;
        }

        const priceArr: Price[] = new Array(numberOfChildren);
        snapshot.forEach((childSnapshot) => {
            priceArr[idx++] = mapPriceFromDb(childSnapshot.val());
        });

        return priceArr.reverse();
    } catch (err) {
        throw createErrorFromException(err);
    }
}

export function createErrorFromException(err: Error) {
    // const errMsg = err.message + "\n" + err.stack;
    utils.log(err.message);
    return new Error(err.message);
}
