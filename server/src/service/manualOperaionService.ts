import { notify as lineNotify } from "./lineService";
import { notify as telegramNotify } from "./telegramService";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function notifyWarningMessage(): Promise<void> {
    const warningMsg =
        "กรุ๊ปนี้ใช้เฉพาะเเจ้งเตือนราคาทองเท่านั้น กรุณาอย่าโพสต์ข้อความ รูปภาพ หรือวีดีโอที่ไม่เกี่ยวข้องในกรุ๊ปนี้ 🙂";
    await Promise.all([lineNotify(warningMsg), telegramNotify(warningMsg)]);
}
