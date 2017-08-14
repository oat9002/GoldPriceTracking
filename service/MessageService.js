"use strict";
const db = require('../dal/db');
const Client = require('@line/bot-sdk').Client;
const moment = require("moment-timezone");

const client = new Client({
  channelAccessToken: 'zfeTtx+CfkxcNrvRw0qg15hs80mf9ycnzw1PIA5LUawNHiXZyok3547oF+tev5bmo2uN6kqFOJC0xiJ8D5n7GgJ5c8j6KdRnIZIuonL8BdPez/EVowGF/p/6uk4Sunm54rOz+n08ase86tY5O96xWQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '585982911ee20d50d90de40024a45647'
});

const monthName = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ษ.", "พ.ค.", "มิ.ย.", "ฟ.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

function pushMessage() {
  let dbInstance = db.getInstance();
  dbInstance.ref('price').orderByChild('created_at').limitToLast(1).on('child_added', snapshot => {
    let data = snapshot.val();
    let date = moment(data.created_at).tz('Asia/Bangkok');
    let dateMessage = 'วันที่ ' + date.date() + ' ' + monthName[date.month()] + ' ' + (date.year() + 543) + ' เวลา ' + date.hour() + ':' + date.minute() + ' น.\n';
    let priceMessage = 'ราคาซื้อ: ' + data.buy + ' บาท\n' + 'ราคาขาย: ' + data.sell + ' บาท';
    let priceDiffMessage = 'เทียบราคาจากครั้งก่อน: ';
    if(data.buyDifferent > 0) {
      priceDiffMessage = priceDiffMessage + '+' + data.buyDifferent + ' บาท';
    }
    else {
      priceDiffMessage = priceDiffMessage + data.buyDifferent + ' บาท';
    }
    let message = dateMessage + '\n' + priceMessage + '\n' + priceDiffMessage;
    client.pushMessage('1527430011', { type: 'text', text: message });
    //client.pushMessage('U192446f179afffe5d1cf02c27125081e', { type: 'text', text: message }); Test pushMessage
  });
}

module.exports = {
  pushMessage
};
