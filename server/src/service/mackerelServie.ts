import dayjs from "dayjs";
import cron from "node-cron";
import { LogLevel } from "../util/enums";
import { log } from "../util/logger";

const baseUrl = "https://api.mackerelio.com";
const apiKey = process.env.MACKEREL_API_KEY ?? "";

export async function doHealthCheck(): Promise<void> {
    const url = `${baseUrl}/api/v0/services/goldprice-tracking-service/tsdb`;
    const data = [
        {
            name: "healthcheck",
            time: dayjs().unix(),
            value: 1,
        },
    ];
    const headers = {
        headers: {
            "X-Api-Key": apiKey,
            "Content-Type": "application/json",
        },
    };

    await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        ...headers,
    }).catch((err: unknown) => {
        if (err instanceof Error) {
            log("Cannot call to mackerel", LogLevel.error, err);
        }
    });
}

export async function intervalDoHealthCheck() {
    cron.schedule("0 */1 * * *", async () => {
        await doHealthCheck();
    });
}
