import { firestore } from "../dal/firebase";
import { LogLevel } from "../util/enums";
import { notify as telegramNotify } from "./telegramService";
import { notify as lineNotify } from "./lineService";
import * as logger from "../util/logger";
import { DocumentData } from "firebase-admin/firestore";
import dayjs from "../util/dayjs";

let first = true;

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
                const message = generateMessage(data);

                await notify(message);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    logger.log("pushMessage failed", LogLevel.error, err);
                }
            }
        });
}

export async function notify(message: string): Promise<void> {
    await Promise.all([telegramNotify(message), lineNotify(modifyLineMessage(message))]);
}

function modifyLineMessage(message: string): string {
    return (
        message +
        "\n" +
        "line notify จะยุติให้บริการวันที่ 31 มี.ค 2568" +
        "\n\n" +
        "ย้ายไปใช้ telegram แทนตามลิ้งค์นี้ https://t.me/+1rF1OQnzLV84ODRl"
    );
}

function generateMessage(firebaseData: DocumentData): string {
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

function addCommaToNumber(number: number): string {
    return Number(number).toLocaleString("th-TH");
}
