import axios from "axios";
import * as logger from "../util/logger";
import { LogLevel } from "../util/enums";
import qs from "qs";

const chatId = -1002316103286;

export async function notify(message: string): Promise<void> {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
        logger.log("Missing telegram bot token", LogLevel.error);
        return;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    await axios
        .post(
            url,
            qs.stringify({
                text: message,
                chat_id: chatId,
                parse_mode: "HTML",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        .catch((err: unknown) => {
            if (err instanceof Error) {
                logger.log("line notify failed", LogLevel.error, err);
            }
        });
}
