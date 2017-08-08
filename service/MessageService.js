const db = require('../dal/db');
const Client = require('@line/bot-sdk').Client;

const client = new Client({
  channelAccessToken: 'zfeTtx+CfkxcNrvRw0qg15hs80mf9ycnzw1PIA5LUawNHiXZyok3547oF+tev5bmo2uN6kqFOJC0xiJ8D5n7GgJ5c8j6KdRnIZIuonL8BdPez/EVowGF/p/6uk4Sunm54rOz+n08ase86tY5O96xWQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '585982911ee20d50d90de40024a45647'
});

const dayName = [ 'วันอาทิตย์ที่', 'วันจันทร์ที่', 'วันอังคารที่', 'วันพุทธที่', 'วันพฤหัสบดีที่', 'วันศุกร์ที่', 'วันเสาร์ที่'];
const monthName = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน", "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤษจิกายน","ธันวาคม"];

function pushMessage() {
  let dbInstance = db.getInstance();
  dbInstance.ref('price').orderByChild('created_at').limitToLast(1).on('child_added', snapshot => {
    let data = snapshot.val();
    let date = new Date(data.created_at);
    let dateMessage = dayName[date.getDay()] + ' ' + date.getDate() + ' ' + monthName[date.getMonth()] + ' ' + (date.getFullYear() + 543) + ' เวลา ' + date.getHours() + '.' + date.getMinutes() + ' น.\n';
    let priceMessage = 'ราคาซื้อ: ' + data.buy + ' บาท\n' + 'ราคาขาย: ' + data.sell + ' บาท';
    let priceDiffMessage = 'เทียบราคาจากครั้งก่อน ';
    if(data.buyDifferent > 0) {
      priceDiffMessage = priceDiffMessage + '+' + data.buyDifferent + ' บาท';
    }
    else {
      priceDiffMessage = priceDiffMessage + data.buyDifferent + ' บาท';
    }
    let message = dateMessage + '\n' + priceMessage + '\n' + priceDiffMessage;
    client.pushMessage('U192446f179afffe5d1cf02c27125081e', { type: 'text', text: message });
  });
}

module.exports = {
  pushMessage
}
