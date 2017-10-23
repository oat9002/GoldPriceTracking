"use strict";
const track = require('./service/TrackingService');
const express = require('express');
const middleware = require('@line/bot-sdk').middleware;
const lineConfig = require('./config/lineConfig.json');
const lineService = require('./service/LineService');
const cors = require('cors');
const db = require("./dal/db");
const port = 4000;

const app = express();
const config = {
    channelAccessToken: lineConfig.channelAccessToken,
    channelSecret: lineConfig.channelSecret
};

app.use(cors())
app.use(middleware(config));

app.get('/', (req, res) => {
    res.send('Hello, welcome to GoldpriceTracking.');
});

app.post('/webhook', (req) => {
    req.body.events.forEach((event) => {
        switch (event.type) {
            case "follow":
                if (event.source.type === 'user') {
                    lineService.addUser(event.source.userId);
                }
                break;
            case "message":
                lineService.replyMessage(event.replyToken);
                break;
        }
    }, this);
});

app.get('/prices', (req, res) => {
  db.getLatestPrices(parseInt(req.query.number)).then(data => {
    res.json(data);
  });
});

app.listen(port, () => {
    console.log('listen to port ' + port);
});

//track.start();
