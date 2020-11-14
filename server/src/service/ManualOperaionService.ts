import { lineNotify } from "./LineService";

async function notifyWarningMessage(): Promise<void> {
    const warningMsg =
        "กรุ๊ปนี้ใช้เฉพาะเเจ้งเตือนราคาทองเท่านั้น กรุณาอย่าโพสต์ข้อความ รูปภาพ หรือวีดีโอที่ไม่เกี่ยวข้องในกรุ๊ปนี้ 🙂";
    await lineNotify(process.env.NOTIFY_GOLD_PRICE_TRACKING, warningMsg);
}
