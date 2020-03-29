"use strict";
const db = require("../dal/db");
const Client = require("@line/bot-sdk").Client;
const moment = require("moment-timezone");
const axios = require("axios");
const qs = require("qs");

const client = new Client({
    channelAccessToken: process.env.OFFICIAL_ACCOUNT_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.OFFICIAL_ACCOUNT_CHANNEL_SECRET
});

const monthName = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ษ.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค."
];
let first = true;

async function pushMessage() {
    let dbInstance = db.getInstance();
    dbInstance
        .ref("price")
        .orderByChild("created_at")
        .limitToLast(1)
        .on("child_added", async snapshot => {
            if (!first) {
                try {
                    const data = snapshot.val();
                    const message = await generateMessage(data);
                    const users = await db.getAllUser();

                    if (users !== null) {
                        Object.keys(users).forEach(key => {
                            client.pushMessage(users[key].id, {
                                type: "text",
                                text: message
                            });
                        });
                    }

                    await lineNotify(
                        process.env.NOTIFY_GOLD_PRICE_TRACKING,
                        message
                    );
                    // client.pushMessage('U192446f179afffe5d1cf02c27125081e', { type: 'text', text: message }); // Test pushMessage
                } catch (err) {
                    console.log(err.stack);
                }
            } else {
                first = false;
            }
        });
}

function replyMessage(replyToken) {
    db.getLatestPrice().then(data => {
        generateMessage(data).then(message => {
            client.replyMessage(replyToken, {
                type: "text",
                text: message
            });
        });
    });
}

function generateMessage(firebaseData) {
    let date = moment(firebaseData.created_at).tz("Asia/Bangkok");
    let showMinute = "" + date.minute();
    if (date.minute() < 10) {
        showMinute = "0" + date.minute();
    }

    let dateMessage =
        "วันที่ " +
        date.date() +
        " " +
        monthName[date.month()] +
        " " +
        (date.year() + 543) +
        " เวลา " +
        date.hour() +
        ":" +
        showMinute +
        " น.\n";
    let priceMessage =
        "ราคารับซื้อ: " +
        addCommaToNumber(firebaseData.buy) +
        " บาท\n" +
        "ราคาขาย: " +
        addCommaToNumber(firebaseData.sell) +
        " บาท";
    let priceDiffMessage = "เทียบราคาจากครั้งก่อน: ";
    if (firebaseData.buyDifferent > 0) {
        priceDiffMessage =
            priceDiffMessage +
            "+" +
            addCommaToNumber(firebaseData.buyDifferent) +
            " บาท";
    } else {
        priceDiffMessage =
            priceDiffMessage +
            addCommaToNumber(firebaseData.buyDifferent) +
            " บาท";
    }
    let message = dateMessage + "\n" + priceMessage + "\n" + priceDiffMessage;
    message += "\n" + "ดูประวัติ https://goo.gl/wX58dQ";
    return new Promise(resolve => {
        resolve(message);
    });
}

function addCommaToNumber(number) {
    let numberStr = number + "";
    let belowZero = false;
    let haveDecimal = false;
    let decimalStr = "";
    if (number < 0) {
        numberStr = numberStr.replace("-", "");
        belowZero = true;
    }
    if (numberStr.includes(".")) {
        [numberStr, decimalStr] = numberStr.split(".");
        haveDecimal = true;
    }
    let numReturn = [];
    for (let i = 1; i <= numberStr.length; i++) {
        if (i === numberStr.length) {
            numReturn.push(numberStr[numberStr.length - i]);
            if (belowZero) {
                numReturn.push("-");
            }
            if (haveDecimal) {
                return numReturn.reverse().join("") + "." + decimalStr;
            }
            return numReturn.reverse().join("");
        }
        if (i % 3 === 0) {
            numReturn.push(numberStr[numberStr.length - i]);
            numReturn.push(",");
        } else {
            numReturn.push(numberStr[numberStr.length - i]);
        }
    }
}

function addUser(userId) {
    db.addLineUser(userId).catch(err => console.log(err));
}

async function lineNotify(token, message) {
    if (!token) {
        return;
    }

    await axios
        .post(
            "https://notify-api.line.me/api/notify",
            qs.stringify({
                message
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .catch(err => console.log(err.message));
}

module.exports = {
    pushMessage,
    replyMessage,
    addUser
};
