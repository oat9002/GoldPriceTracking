import axios from "axios";
import qs from "qs";
import * as db from "../dal/db";
import { LogLevel } from "../util/enums";
import * as logger from "../util/logger";

export async function addUser(userId: string): Promise<void> {
    try {
        await db.addLineUser(userId);
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.log(`addUser failed for userId: ${userId}`, LogLevel.error, err);
        }
    }
}

export async function notify(message: string): Promise<void> {
    const token = process.env.LINE_NOTIFY_TOKEN;

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
