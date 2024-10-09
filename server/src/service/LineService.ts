import axios from "axios";
import qs from "qs";
import * as db from "../dal/db";
import { LogLevel } from "../util/enums";
import * as utils from "../util/logger";
import { isDevelopmentMode } from "../util/mode";
import { firestore } from "../dal/firebase";
import { generateMessage } from "../util/messageUtil";

const priceCollection = firestore.collection("price");

let first = true;

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
                const messageNotify = generateMessage(data);

                await lineNotify(process.env.NOTIFY_GOLD_PRICE_TRACKING, messageNotify);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    utils.log("pushMessage failed", LogLevel.error, err);
                }
            }
        });
}

export async function addUser(userId: string): Promise<void> {
    try {
        await db.addLineUser(userId);
    } catch (err: unknown) {
        if (err instanceof Error) {
            utils.log(`addUser failed for userId: ${userId}`, LogLevel.error, err);
        }
    }
}

export async function lineNotify(token: string | undefined, message: string): Promise<void> {
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
        .catch((err: unknown) => {
            if (err instanceof Error) {
                utils.log("line notify failed", LogLevel.error, err);
            }
        });
}
