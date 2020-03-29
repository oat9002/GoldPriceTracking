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
    channelSecret: process.env.OFFICIAL_ACCOUNT_CHANNEL_SECRET
};

app.use(cors());
app.use(middleware(config));

app.get("/", (req, res) => {
    res.send("Hello, welcome to GoldpriceTracking.");
});

app.post("/webhook", req => {
    req.body.events.forEach(event => {
        switch (event.type) {
            case "follow":
                if (event.source.type === "user") {
                    lineService.addUser(event.source.userId);
                }
                break;
            case "message":
                lineService.replyMessage(event.replyToken);
                break;
        }
    }, this);
});

app.get("/prices", (req, res) => {
    if (req.query.number < 0) {
        res.status(enums.STATUS_CODE.BAD_REQUEST);
        res.send("number must be more than or equal to 0");
    }
    db.getLatestPrices(parseInt(req.query.number)).then(data => {
        res.status = enums.STATUS_CODE.OKAY;
        res.json(data);
    });
});

app.get("/retrieveAndSavePrice", (req, res) => {
    track.retreiveAndSavePrice();
    res.status = enums.STATUS_CODE.OKAY;
    res.send("Success");
});

app.get("/priceslastday", (req, res) => {
    if (req.query.days < 0) {
        res.status(enums.STATUS_CODE.BAD_REQUEST);
        res.send("days must be more than or equal to 0");
    } else {
        db.getPricesLastByDay(parseInt(req.query.days))
            .then(data => {
                res.status(enums.STATUS_CODE.OKAY);
                res.json(data);
            })
            .catch(err => {
                res.status(enums.STATUS_CODE.INTERNAL_SERVER_ERROR);
                res.json(err);
            });
    }
});

app.listen(port, () => {
    console.log("listen to port " + port);
});

track.start();
