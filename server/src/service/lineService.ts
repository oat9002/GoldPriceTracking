import axios from "axios";
import qs from "qs";
import * as db from "../dal/db";
import dayjs from "../util/dayjs";
import { LogLevel } from "../util/enums";
import * as utils from "../util/utils";
import { isDevelopmentMode } from "../util/mode";
import { firestore } from "../dal/firebase";
import { DocumentData } from "firebase-admin/firestore";

const priceCollection = firestore.collection("price");
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
    "ธ.ค.",
];

let first = true;

export async function pushMessage() {
    priceCollection
        .orderBy("created_at", "desc")
        .limit(1)
        .onSnapshot(async (snapshot) => {
            if (first) {
                first = false;
                return;
            }

            try {
                const data = snapshot.docs[0].data();
                const messageNotify = generateMessage(data);

                await lineNotify(process.env.NOTIFY_GOLD_PRICE_TRACKING, messageNotify);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    utils.log("pushMessage failed", LogLevel.error, err);
                }
            }
        });
}

export function generateMessage(firebaseData: DocumentData): string {
    const date = dayjs.tz(firebaseData.created_at.toDate());
    let showMinute = "" + date.minute();
    if (date.minute() < 10) {
        showMinute = "0" + date.minute();
    }

    const dateMessage =
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
    const priceMessage =
        "ราคารับซื้อ: " +
        addCommaToNumber(firebaseData.buy) +
        " บาท\n" +
        "ราคาขาย: " +
        addCommaToNumber(firebaseData.sell) +
        " บาท";
    let priceDiffMessage = "เทียบราคาจากครั้งก่อน: ";
    if (firebaseData.buyDifferent > 0) {
        priceDiffMessage =
            priceDiffMessage + "+" + addCommaToNumber(firebaseData.buyDifferent) + " บาท";
    } else {
        priceDiffMessage = priceDiffMessage + addCommaToNumber(firebaseData.buyDifferent) + " บาท";
    }
    let message = dateMessage + "\n" + priceMessage + "\n" + priceDiffMessage;
    message += "\n" + "ดูประวัติ https://goldpricetracking.web.app/";

    return message;
}

export function addCommaToNumber(number: number): string {
    return Number(number).toLocaleString("th-TH");
}

export async function addUser(userId: string): Promise<void> {
    try {
        await db.addLineUser(userId);
    } catch (err: unknown) {
        if (err instanceof Error) {
            utils.log(`addUser failed for userId: ${userId}`, LogLevel.error, err);
        }
    }
}

export async function lineNotify(token: string | undefined, message: string): Promise<void> {
    if (!token || isDevelopmentMode()) {
        return;
    }

    await axios
        .post(
            "https://notify-api.line.me/api/notify",
            qs.stringify({
                message,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .catch((err: unknown) => {
            if (err instanceof Error) {
                utils.log("line notify failed", LogLevel.error, err);
            }
        });
}
