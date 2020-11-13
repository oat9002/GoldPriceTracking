import axios = require("axios");
import cheerio = require("cheerio");
import db = require("../dal/db.js");
import cron = require("node-cron");
import message = require("./LineService");
import utils = require("../util/utils");

async function retrieveAndSavePrice() {
    let buyPrice = 0;
    let sellPrice = 0;

    try {
        const res = await axios.get(
            "https://www.goldtraders.or.th/default.aspx"
        );
        const html = res.data;
        const $ = cheerio.load(html);
        let bpTemp = $("#DetailPlace_uc_goldprices1_lblBLBuy").text();
        let spTemp = $("#DetailPlace_uc_goldprices1_lblBLSell").text();
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

function start() {
    cron.schedule("0 * * * *", async () => {
        await retrieveAndSavePrice();
    });
    message.pushMessage();
}

module.exports = {
    retreiveAndSavePrice: retrieveAndSavePrice,
    start,
};
