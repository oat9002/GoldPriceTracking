import axios from "axios";
import * as logger from "../util/logger";
import { LogLevel } from "../util/enums";

export async function notify(message: string): Promise<void> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
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
                logger.log("line notify failed", LogLevel.error, err);
            }
        });
}
