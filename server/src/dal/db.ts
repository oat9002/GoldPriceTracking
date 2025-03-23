import { mapUserFromDb, User } from "../models/User";
import dayjs from "../util/dayjs";
import { LogLevel } from "../util/enums";
import * as utils from "../util/logger";
import { mapPriceFromDb, Price } from "./../models/Price";
import { firestore as db } from "./firebase";
import { Timestamp } from "firebase-admin/firestore";

const priceCollection = db.collection("price");
const userCollection = db.collection("user");

export async function addPrice(buy: number, sell: number): Promise<void> {
    try {
        const latestPrice = await getLatestPrice();
        await priceCollection.add({
            buy: buy,
            sell: sell,
            buyDifferent: buy - latestPrice.buy,
            sellDifferent: sell - latestPrice.sell,
            created_at: Timestamp.fromMillis(dayjs().valueOf()),
        });
    } catch (err: unknown) {
        throw createErrorFromException(err);
    }
}

export async function shouldAddPrice(buy: number, sell: number): Promise<boolean> {
    try {
        const snapshot = await priceCollection.orderBy("created_at", "desc").limit(1).get();

        const data = snapshot.docs[0].data();
        const oldBuy = data.buy;
        const oldSell = data.sell;

        if (buy - oldBuy !== 0 || sell - oldSell !== 0) {
            return true;
        }

        return false;
    } catch (err: unknown) {
        throw createErrorFromException(err);
    }
}

export async function getLatestPrice(): Promise<Price> {
    try {
        const snapshot = await priceCollection.orderBy("created_at", "desc").limit(1).get();
        const data = snapshot.docs[0].data();

        return mapPriceFromDb(data);
    } catch (err: unknown) {
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
                ? await priceCollection.orderBy("created_at", "desc").limit(number).get()
                : await priceCollection.orderBy("created_at", "desc").get();

        snapshot.forEach((childSnapshot) => {
            priceArr[idx++] = mapPriceFromDb(childSnapshot.data());
        });

        return priceArr;
    } catch (err: unknown) {
        throw createErrorFromException(err);
    }
}

export async function getPricesLastByDay(days: number) {
    const now = dayjs();
    const end = Timestamp.fromMillis(now.valueOf());
    const start = Timestamp.fromMillis(
        now.hour(0).millisecond(0).second(0).millisecond(0).subtract(days, "day").valueOf()
    );
    let idx = 0;

    try {
        const snapshot = await priceCollection
            .where("created_at", ">=", start)
            .where("created_at", "<=", end)
            .orderBy("created_at", "desc")
            .get();

        if (snapshot.empty) {
            return null;
        }

        const priceArr: Price[] = new Array(snapshot.docs.length);
        snapshot.forEach((childSnapshot) => {
            priceArr[idx++] = mapPriceFromDb(childSnapshot.data());
        });

        return priceArr;
    } catch (err: unknown) {
        throw createErrorFromException(err);
    }
}

export function createErrorFromException(err: unknown) {
    if (err instanceof Error) {
        const errMsg = err.message + "\n" + err.stack;
        utils.log(errMsg, LogLevel.error, err);

        return new Error(err.message);
    }

    return new Error();
}
