const track = require('./service/TrackingService');
const express = require('express');
const middleware = require('@line/bot-sdk').middleware;
const lineConfig = require('./config/lineConfig.json');

const app = express();
const config = {
    channelAccessToken: lineConfig.channelAccessToken,
    channelSecret: lineConfig.channelSecret
}

app.use(middleware(config))

app.get('/', () => {
    res.send('Hello, welcome to GoldpriceTracking.');
})

app.post('/webhook', (req, res) => {
    console.log(req.body.events)
});

app.listen(3000, () => {
    console.log('listen to port 3000');
});

track.start();
