"use strict";
const admin = require("firebase-admin");
const serviceAccount = require("../config/goldpricetracking-firebase-adminsdk-718s5-85e720333f.json");

let app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

let db = app.database();

function getInstance() {
    return db;
}

function addPrice(buy, sell) {
    getLatestPrice()
        .then(latestPrice => {
            let uid = db
                .ref()
                .child("price")
                .push().key;
            db.ref("price/" + uid)
                .set({
                    buy: buy,
                    sell: sell,
                    buyDifferent: buy - latestPrice.buy,
                    sellDifferent: sell - latestPrice.sell,
                    created_at: new Date().getTime()
                })
                .catch(err => {
                    console.log(err.message + "\n" + err.stack);
                });
        })
        .catch(err => {
            console.log(err.message + "\n" + err.stack);
        });
}

function shouldAddPrice(buy, sell) {
    return new Promise((resolve, reject) => {
        db.ref("price")
            .orderByChild("created_at")
            .limitToLast(1)
            .once("value")
            .then(snapshot => {
                let data = snapshot.val();
                let id = Object.keys(data)[0];
                let oldBuy = data[id].buy;
                let oldSell = data[id].sell;
                if (buy - oldBuy !== 0 || sell - oldSell !== 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => {
                reject(err.message + "\n" + err.stack);
            });
    });
}

function getLatestPrice() {
    return new Promise((resolve, reject) => {
        db.ref("price")
            .orderByChild("created_at")
            .limitToLast(1)
            .once("value")
            .then(snapshot => {
                snapshot.forEach(childSnapshot => {
                    resolve(childSnapshot.val());
                });
            })
            .catch(err => {
                reject(err.message + "\n" + err.stack);
            });
    });
}

function addLineUser(userId) {
    return new Promise((resolve, reject) => {
        let uid = db
            .ref()
            .child("user")
            .push().key;
        db.ref("user/" + uid)
            .set({
                id: userId
            })
            .catch(err => {
                reject(err.message + "\n" + err.stack);
            });
    });
}

function getAllUser() {
    return new Promise((resolve, reject) => {
        db.ref("user")
            .once("value")
            .then(snapshot => {
                resolve(snapshot.val());
            })
            .catch(err => {
                reject(err.message + "\n" + err.stack);
            });
    });
}

/* number: number of latest data (0 = all)*/
function getLatestPrices(number) {
    let priceArr = new Array(number);
    let idx = 0;
    if (number !== 0) {
        return new Promise((resolve, reject) => {
            db.ref("price")
                .orderByChild("created_at")
                .limitToLast(number)
                .once("value")
                .then(snapshot => {
                    snapshot.forEach(childSnapshot => {
                        priceArr[idx] = childSnapshot.val();
                        idx += 1;
                    });
                    if (idx === number) {
                        resolve(priceArr);
                    }
                })
                .catch(err => {
                    reject(err.message + "\n" + err.stack);
                });
        });
    } else {
        return new Promise((resolve, reject) => {
            db.ref("price")
                .orderByChild("created_at")
                .once("value")
                .then(snapshot => {
                    priceArr = new Array(snapshot.numChildren());
                    snapshot.forEach(childSnapshot => {
                        priceArr[idx] = childSnapshot.val();
                        idx += 1;
                    });
                    if (idx === snapshot.numChildren()) {
                        resolve(priceArr);
                    }
                })
                .catch(err => {
                    reject(err.message + "\n" + err.stack);
                });
        });
    }
}

function getPricesLastByDay(days) {
    let now = new Date();
    let end = now.getTime();
    now.setHours(0, 0, 0, 0);
    now.setDate(now.getDate() - days);
    let start = now.getTime();
    let idx = 0;
    return new Promise((resolve, reject) => {
        db.ref("price")
            .orderByChild("created_at")
            .startAt(start)
            .endAt(end)
            .once("value")
            .then(snapshot => {
                let priceArr = new Array(snapshot.numChildren());
                if (snapshot.numChildren() === 0) {
                    resolve(null);
                }
                snapshot.forEach(childSnapshot => {
                    priceArr[idx] = childSnapshot.val();
                    if (idx === snapshot.numChildren() - 1) {
                        resolve(priceArr.reverse());
                    }
                    idx++;
                });
            })
            .catch(err => {
                reject(err.message + "\n" + err.stack);
            });
    });
}

module.exports = {
    getInstance,
    addPrice,
    getLatestPrice,
    shouldAddPrice,
    addLineUser,
    getAllUser,
    getLatestPrices,
    getPricesLastByDay
};
