import * as cheerio from "cheerio";
import cron from "node-cron";
import * as dbDecorator from "../dal/dbDecorator";
import { LogLevel } from "../util/enums";
import { isDevelopmentMode } from "../util/mode";
import * as logger from "../util/logger";
import * as message from "./messageService";

export async function retrieveAndSavePrice(): Promise<void> {
    let buyPrice = 0;
    let sellPrice = 0;

    try {
        const res = await fetch("https://classic.goldtraders.or.th");

        if (!res.ok) {
            logger.log("Cannot fetch gold price", LogLevel.error);
            return;
        }

        const html = await res.text();
        const $ = cheerio.load(html);
        const bpTemp = $("#DetailPlace_uc_goldprices1_lblBLBuy").text();
        const spTemp = $("#DetailPlace_uc_goldprices1_lblBLSell").text();

        if (
            bpTemp === "" ||
            spTemp === "" ||
            bpTemp === null ||
            spTemp === null ||
            bpTemp === undefined ||
            spTemp === undefined
        ) {
            logger.log("Cannot find gold price in the page", LogLevel.error);
            return;
        }

        buyPrice = parseInt(bpTemp.substring(0, bpTemp.length - 3).replace(",", ""));
        sellPrice = parseInt(spTemp.substring(0, spTemp.length - 3).replace(",", ""));
        if (buyPrice !== null && sellPrice !== null) {
            const shouldAdd = await dbDecorator.shouldAddPrice(buyPrice, sellPrice);

            if (shouldAdd) {
                await dbDecorator.addPrice(buyPrice, sellPrice);
            }
        } else {
            logger.log("Something wrong in price");
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.log("retrieveAndSavePrice failed", LogLevel.error, err);
        }
    }
}

export function start(): void {
    if (isDevelopmentMode()) {
        return;
    }

    cron.schedule("0 * * * *", async () => {
        await retrieveAndSavePrice();
    });

    message.pushMessage();
}
