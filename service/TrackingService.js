'use strict';
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../dal/db.js');
const cron = require('node-cron');
const message = require('./MessageService');

function start() {
  let buyPrice = 0;
  let sellPrice = 0;

  cron.schedule('*/5 * * * *', () => {
    axios.get('http://www.goldtraders.or.th/default.aspx')
      .then(res => {
        return res.data;
      })
      .then(html => {
        let $ = cheerio.load(html);
        let bpTemp = $('#DetailPlace_uc_goldprices1_lblBLBuy').text();
        let spTemp = $('#DetailPlace_uc_goldprices1_lblBLSell').text();
        buyPrice = parseInt(bpTemp.substring(0, bpTemp.length - 3).replace(',', ''));
        sellPrice = parseInt(spTemp.substring(0, spTemp.length - 3).replace(',', ''))
        if(buyPrice != null && sellPrice != null) {
          db.shouldAddPrice(buyPrice, sellPrice).then(shouldAdd => {
            if(shouldAdd) {
               db.addPrice(buyPrice, sellPrice);
            }
          })
        }
        else {
          console.log('Something wrong in price');
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  message.pushMessage();
}

module.exports = {
  start
};
