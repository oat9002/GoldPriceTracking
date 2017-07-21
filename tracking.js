'use strict';
const axios = require('axios');
const cheerio = require('cheerio');

let buyPrice = 0;
let sellPrice = 0;

axios.get('http://www.goldtraders.or.th/')
  .then(res => {
    return res.data;
  })
  .then(html => {
    let $ = cheerio.load(html);
    let bpTemp = $('#DetailPlace_uc_goldprices1_lblBLBuy').text();
    let spTemp = $('#DetailPlace_uc_goldprices1_lblBLSell').text();
    buyPrice = parseInt(bpTemp.substring(0, bpTemp.length - 3).replace(',', ''));
    sellPrice = parseInt(spTemp.substring(0, spTemp.length - 3).replace(',', ''));
    console.log(buyPrice);
  })
  .catch(err => {
    console.log(err);
  })
