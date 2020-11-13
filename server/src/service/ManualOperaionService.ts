const { lineNotify } = require("./LineService");

async function notifyWarningMessage() {
    const warningMsg =
        "กรุ๊ปนี้ใช้เฉพาะเเจ้งเตือนราคาทองเท่านั้น กรุณาอย่าโพสต์ข้อความ รูปภาพ หรือวีดีโอที่ไม่เกี่ยวข้องในกรุ๊ปนี้ 🙂";
    lineNotify(process.env.NOTIFY_GOLD_PRICE_TRACKING, warningMsg);
}
