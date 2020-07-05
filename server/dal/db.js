"use strict";
const admin = require("firebase-admin");
const utils = require("../util/utils");
const serviceAccount = require("../config/goldpricetracking-firebase-adminsdk-718s5-85e720333f.json");

let app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});

let db = app.database();

function getInstance() {
    return db;
}

async function addPrice(buy, sell) {
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

async function shouldAddPrice(buy, sell) {
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

async function getLatestPrice() {
    try {
        const snapshot = await db
            .ref("price")
            .orderByChild("created_at")
            .limitToLast(1)
            .once("value");
        const toReturn = [];

        snapshot.forEach((childSnapshot) => {
            toReturn.push(childSnapshot.val());
        });

        return toReturn[0];
    } catch (err) {
        throw createErrorFromException(err);
    }
}

async function addLineUser(userId) {
    try {
        const uid = db.ref().child("user").push().key;
        await db.ref("user/" + uid).set({
            id: userId,
        });
    } catch (err) {
        throw createErrorFromException(err);
    }
}

async function getAllUser() {
    try {
        const snapshot = await db.ref("user").once("value");

        return snapshot.val();
    } catch (err) {
        throw createErrorFromException(err);
    }
}

/* number: number of latest data (0 = all)*/
async function getLatestPrices(number) {
    const priceArr = new Array(number);
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
            priceArr[idx++] = childSnapshot.val();
        });

        return priceArr;
    } catch (err) {
        throw createErrorFromException(err);
    }
}

async function getPricesLastByDay(days) {
    let now = new Date();
    let end = now.getTime();
    let idx = 0;

    now.setHours(0, 0, 0, 0);
    now.setDate(now.getDate() - days);

    let start = now.getTime();
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

        const priceArr = new Array(numberOfChildren);
        snapshot.forEach((childSnapshot) => {
            priceArr[idx++] = childSnapshot.val();
        });

        return priceArr.reverse();
    } catch (err) {
        throw createErrorFromException(err);
    }
}

function createErrorFromException(err) {
    // const errMsg = err.message + "\n" + err.stack;
    utils.log(err.message);
    return new Error(err.message);
}

module.exports = {
    getInstance,
    addPrice,
    getLatestPrice,
    shouldAddPrice,
    addLineUser,
    getAllUser,
    getLatestPrices,
    getPricesLastByDay,
};
