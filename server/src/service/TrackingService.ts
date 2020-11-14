import axios from "axios";
import cheerio from "cheerio";
import cron from "node-cron";
import * as db from "../dal/db.js";
import * as utils from "../util/utils";
import * as message from "./LineService";

export async function retrieveAndSavePrice(): Promise<void> {
    let buyPrice = 0;
    let sellPrice = 0;

    try {
        const res = await axios.get(
            "https://www.goldtraders.or.th/default.aspx"
        );
        const html = res.data;
        const $ = cheerio.load(html);
        const bpTemp = $("#DetailPlace_uc_goldprices1_lblBLBuy").text();
        const spTemp = $("#DetailPlace_uc_goldprices1_lblBLSell").text();
        buyPrice = parseInt(
            bpTemp.substring(0, bpTemp.length - 3).replace(",", "")
        );
        sellPrice = parseInt(
            spTemp.substring(0, spTemp.length - 3).replace(",", "")
        );
        if (buyPrice !== null && sellPrice !== null) {
            const shouldAdd = await db.shouldAddPrice(buyPrice, sellPrice);

            if (shouldAdd) {
                await db.addPrice(buyPrice, sellPrice);
            }
        } else {
            utils.log("Something wrong in price");
        }
    } catch (err) {
        utils.log("retrieveAndSavePrice failed", err);
    }
}

export function start(): void {
    cron.schedule("0 * * * *", async () => {
        await retrieveAndSavePrice();
    });
    message.pushMessage();
}
