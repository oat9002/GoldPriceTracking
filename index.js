"use strict";
const track = require('./service/TrackingService');
const express = require('express');
const middleware = require('@line/bot-sdk').middleware;
const lineConfig = require('./config/lineConfig.json');
const lineService = require('./service/LineService');

const app = express();
const config = {
    channelAccessToken: lineConfig.channelAccessToken,
    channelSecret: lineConfig.channelSecret
}

app.use(middleware(config))

app.get('/', (req, res) => {
    res.send('Hello, welcome to GoldpriceTracking.');
})

app.post('/webhook', (req) => {
    req.body.events.forEach((event) => {
        switch(event.type) {
            case "follow": 
                if(event.source.type == 'user') {
                    lineService.addUser(event.source.userId);
                }
                break;
            case "message":
                lineService.replyMessage(event.replyToken);
                break;
        }
    }, this);
});

app.listen(3000, () => {
    console.log('listen to port 3000');
});

track.start();
