import axios from "axios";
import qs from "qs";
import * as db from "../dal/db";
import dayjs from "../util/dayjs";
import * as utils from "../util/utils";
import { isDevelopmentMode } from "./../util/mode";

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
    const dbInstance = db.getInstance();
    dbInstance
        .ref("price")
        .orderByChild("created_at")
        .limitToLast(1)
        .on("child_added", async (snapshot) => {
            if (!first) {
                try {
                    const data = snapshot.val();
                    const messageNotify = generateMessage(data);

                    await lineNotify(
                        process.env.NOTIFY_GOLD_PRICE_TRACKING,
                        messageNotify
                    );
                } catch (err) {
                    console.log(err.stack);
                }
            } else {
                first = false;
            }
        });
}

export function generateMessage(firebaseData: any): string {
    const date = dayjs(firebaseData.created_at);
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
    message += "\n" + "ดูประวัติ https://goldpricetracking.web.app/";

    return message;
}

export function addCommaToNumber(number: number): string {
    return Number(number).toLocaleString("th-TH");
}

export async function addUser(userId: string): Promise<void> {
    try {
        await db.addLineUser(userId);
    } catch (err) {
        utils.log(`addUser failed for userId: ${userId}`, err);
    }
}

export async function lineNotify(
    token: string | undefined,
    message: string
): Promise<void> {
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
        .catch((err) => utils.log("line notify failed", err));
}
