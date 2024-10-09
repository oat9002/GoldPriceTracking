import { DocumentData } from "firebase-admin/firestore";
import dayjs from "./dayjs";

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
