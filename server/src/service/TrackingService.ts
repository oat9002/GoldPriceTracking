import axios from "axios";
import cheerio from "cheerio";
import cron from "node-cron";
import * as dbDecorator from "../dal/dbDecorator";
import { LogLevel } from "../util/enums";
import { isDevelopmentMode } from "../util/mode";
import * as utils from "../util/utils";
import * as message from "./LineService";

export async function retrieveAndSavePrice(): Promise<void> {
    let buyPrice = 0;
    let sellPrice = 0;

    try {
        const res = await axios.get("https://www.goldtraders.or.th/default.aspx");
        const html = res.data;
        const $ = cheerio.load(html);
        const bpTemp = $("#DetailPlace_uc_goldprices1_lblBLBuy").text();
        const spTemp = $("#DetailPlace_uc_goldprices1_lblBLSell").text();
        buyPrice = parseInt(bpTemp.substring(0, bpTemp.length - 3).replace(",", ""));
        sellPrice = parseInt(spTemp.substring(0, spTemp.length - 3).replace(",", ""));
        if (buyPrice !== null && sellPrice !== null) {
            const shouldAdd = await dbDecorator.shouldAddPrice(buyPrice, sellPrice);

            if (shouldAdd) {
                await dbDecorator.addPrice(buyPrice, sellPrice);
            }
        } else {
            utils.log("Something wrong in price");
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            utils.log("retrieveAndSavePrice failed", LogLevel.error, err);
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
