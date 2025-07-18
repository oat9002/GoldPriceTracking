import * as logger from "../util/logger";
import { LogLevel } from "../util/enums";

export async function notify(message: string): Promise<void> {
    const chatId = process.env.TELEGRAM_BOT_CHAT_ID;
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
        logger.log("Missing telegram bot token", LogLevel.error);
        return;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            text: message,
            chat_id: chatId,
            parse_mode: "HTML",
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).catch((err: unknown) => {
        if (err instanceof Error) {
            logger.log("telegram notify failed", LogLevel.error, err);
        }
    });
}
