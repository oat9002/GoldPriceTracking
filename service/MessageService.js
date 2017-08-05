const db = require('../dal/db');
const Client = require('@line/bot-sdk').Client;

const client = new Client({
  channelAccessToken: 'zfeTtx+CfkxcNrvRw0qg15hs80mf9ycnzw1PIA5LUawNHiXZyok3547oF+tev5bmo2uN6kqFOJC0xiJ8D5n7GgJ5c8j6KdRnIZIuonL8BdPez/EVowGF/p/6uk4Sunm54rOz+n08ase86tY5O96xWQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '585982911ee20d50d90de40024a45647'
});

function pushMessage() {
  let dbInstance = db.getInstance();
  dbInstance.ref('price').limitToLast(1).on('child_added', snapshot => {
    let message = 'ราคาซื้อ: ' + snapshot.buy + ' บาท\n' + 'ราคาขาย: ' + snapshot.sell + ' บาท';
    client.pushMessage('U192446f179afffe5d1cf02c27125081e', { type: 'text', text: message });
  });
}

module.exports = {
  pushMessage
}
