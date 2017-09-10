"use strict";
const db = require('../dal/db');
const Client = require('@line/bot-sdk').Client;
const moment = require("moment-timezone");
const lineConfig = require("../config/lineConfig.json");

const client = new Client({
  channelAccessToken: lineConfig.channelAccessToken,
  channelSecret: lineConfig.channelSecret
});

const monthName = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ษ.", "พ.ค.", "มิ.ย.", "ฟ.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

function pushMessage() {
  let dbInstance = db.getInstance();
  dbInstance.ref('price').orderByChild('created_at').limitToLast(1).on('child_added', snapshot => {
    let data = snapshot.val();
    generateMessage(data).then(message => {
      db.getAllUser().then(users => {
        if(users !== null) {
          Object.keys(users).forEach(key => {
            client.pushMessage(users[key].id, { type: 'text', text: message });
          });
        }
      }).catch(err => {
        console.log(err);
      })
      // client.pushMessage('U192446f179afffe5d1cf02c27125081e', { type: 'text', text: message }); // Test pushMessage
    });
  });
}

function replyMessage(replyToken) {
  db.getLatestPrice().then(data => {
    generateMessage(data).then(message => {
      client.replyMessage(replyToken, { type: 'text', text: 'เรารู้ว่าคุณอยากได้ข้อมูลล่าสุดใช่มั้ยหล่ะ\n' + message});
    });
  });
}

function generateMessage(firebaseData) {
  let date = moment(firebaseData.created_at).tz('Asia/Bangkok');
  let showMinute = '' + date.minute();
  if(date.minute() < 10) {
    showMinute = '0' + date.minute();
  }

  let dateMessage = 'วันที่ ' + date.date() + ' ' + monthName[date.month()] + ' ' + (date.year() + 543) + ' เวลา ' + date.hour() + ':' + showMinute + ' น.\n';
  let priceMessage = 'ราคารับซื้อ: ' + addCommaToNumber(firebaseData.buy) + ' บาท\n' + 'ราคาขาย: ' + addCommaToNumber(firebaseData.sell) + ' บาท';
  let priceDiffMessage = 'เทียบราคาจากครั้งก่อน: ';
  if(firebaseData.buyDifferent > 0) {
    priceDiffMessage = priceDiffMessage + '+' + addCommaToNumber(firebaseData.buyDifferent) + ' บาท';
  }
  else {
    priceDiffMessage = priceDiffMessage + addCommaToNumber(firebaseData.buyDifferent) + ' บาท';
  }
  let message = dateMessage + '\n' + priceMessage + '\n' + priceDiffMessage;
  return new Promise((resolve) => {
    resolve(message);
  }); 
}

function addCommaToNumber(number) {
  let numberStr = number.toString();
  let belowZero = false;
  if(number < 0) {
    numberStr = numberStr.replace('-', '');
    belowZero = true;
  }
  let numReturn = [];
  for(let i = numberStr.length;i >= 1;i--) {
    if(i % 3 === 0) {
      numReturn.push(numberStr[i - 1]);
      numReturn.push(',');
    }
    else {
      numReturn.push(numberStr[i - 1]);
    }
    if(i === 1) {
      if(belowZero) {
        numReturn.push('-');
      }     
      return numReturn.reverse().join('');
    }
  }
}

function addUser(userId) {
  db.addLineUser(userId).catch(err => console.log(err));
}

module.exports = {
  pushMessage,
  replyMessage,
  addUser
};
