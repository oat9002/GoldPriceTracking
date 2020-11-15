// import lineBotSdk from "@line/bot-sdk";
import cors from "cors";
import "dotenv/config";
import express from "express";
import * as db from "./dal/db";
import * as track from "./service/TrackingService";
import { STATUS_CODE } from "./util/enums";
const port = 4000;

const app = express();
// const config: Line.MiddlewareConfig = {
//     channelSecret: process?.env.OFFICIAL_ACCOUNT_CHANNEL_SECRET ?? "",
// };

app.use(cors());
// app.use(lineBotSdk.middleware(config));

app.get("/", (_, res) => {
    res.send("Hello, welcome to GoldpriceTracking.");
});

// app.post("/webhook", (req) => {
//     req.body.events.forEach(async (event) => {
//         switch (event.type) {
//             case "follow":
//                 if (event.source.type === "user") {
//                     await lineService.addUser(event.source.userId);
//                 }
//                 break;
//             case "message":
//                 await lineService.replyMessage(event.replyToken);
//                 break;
//         }
//     }, this);
// });

app.get("/prices", async (req, res) => {
    const numOfLatestPrice: number = parseInt(
        (req.query?.number as string) ?? "-1"
    );
    if (numOfLatestPrice < 0) {
        res.status(STATUS_CODE.BAD_REQUEST);
        res.send("number must be more than or equal to 0");
    }

    try {
        const data = await db.getLatestPrices(numOfLatestPrice);
        res.status(STATUS_CODE.OKAY);
        res.json(data);
    } catch (err) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR);
        res.json(err);
    }
});

app.get("/retrieveAndSavePrice", async (_, res) => {
    await track.retrieveAndSavePrice();
    res.status(STATUS_CODE.OKAY);
    res.send("Success");
});

app.get("/priceslastday", async (req, res) => {
    const days = parseInt((req.query?.days as string) ?? "-1");
    if (days < 0) {
        res.status(STATUS_CODE.BAD_REQUEST);
        res.send("days must be more than or equal to 0");
    } else {
        try {
            const data = await db.getPricesLastByDay(days);
            res.status(STATUS_CODE.OKAY);
            res.json(data);
        } catch (err) {
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR);
            res.json(err);
        }
    }
});

app.listen(port, () => {
    console.log("listen to port " + port);
});

track.start();
