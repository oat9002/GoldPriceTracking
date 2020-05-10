"use strict";
require("dotenv").config();
const track = require("./service/TrackingService");
const express = require("express");
const middleware = require("@line/bot-sdk").middleware;
const lineService = require("./service/LineService");
const cors = require("cors");
const db = require("./dal/db");
const enums = require("./util/enums");
const port = 4000;

const app = express();
const config = {
    channelAccessToken: process.env.OFFICIAL_ACCOUNT_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.OFFICIAL_ACCOUNT_CHANNEL_SECRET,
};

app.use(cors());
app.use(middleware(config));

app.get("/", (req, res) => {
    res.send("Hello, welcome to GoldpriceTracking.");
});

app.post("/webhook", (req) => {
    req.body.events.forEach(async (event) => {
        switch (event.type) {
            case "follow":
                if (event.source.type === "user") {
                    await lineService.addUser(event.source.userId);
                }
                break;
            case "message":
                await lineService.replyMessage(event.replyToken);
                break;
        }
    }, this);
});

app.get("/prices", async (req, res) => {
    if (req.query.number < 0) {
        res.status(enums.STATUS_CODE.BAD_REQUEST);
        res.send("number must be more than or equal to 0");
    }

    try {
        const data = await db.getLatestPrices(parseInt(req.query.number));
        res.status = enums.STATUS_CODE.OKAY;
        res.json(data);
    } catch (err) {
        res.status(enums.STATUS_CODE.INTERNAL_SERVER_ERROR);
        res.json(err);
    }
});

app.get("/retrieveAndSavePrice", async (req, res) => {
    await track.retreiveAndSavePrice();
    res.status = enums.STATUS_CODE.OKAY;
    res.send("Success");
});

app.get("/priceslastday", async (req, res) => {
    if (req.query.days < 0) {
        res.status(enums.STATUS_CODE.BAD_REQUEST);
        res.send("days must be more than or equal to 0");
    } else {
        try {
            const data = await db.getPricesLastByDay(parseInt(req.query.days));
            res.status(enums.STATUS_CODE.OKAY);
            res.json(data);
        } catch (err) {
            res.status(enums.STATUS_CODE.INTERNAL_SERVER_ERROR);
            res.json(err);
        }
    }
});

app.listen(port, () => {
    console.log("listen to port " + port);
});

//track.start();
