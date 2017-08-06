const firebase = require("firebase");
const async = require("async");

let app = firebase.initializeApp({
  apiKey: "AIzaSyDCD8IhA1OoJ4852sNuiLahW1l1EHnaiP8",
  authDomain: "goldpricetracking.firebaseapp.com",
  databaseURL: "https://goldpricetracking.firebaseio.com",
  projectId: "goldpricetracking",
  storageBucket: "goldpricetracking.appspot.com",
  messagingSenderId: "780822195460"
});

let db = app.database();

function getInstance() {
  return db;
}

function addPrice(buy, sell) {
  if(shouldAddPrice(buy, sell)) {
    getLatestPrice().then(latestPrice => {
      let uid = db.ref().child('price').push().key;
      db.ref('price/' + uid).set({
        buy: buy,
        sell: sell,
        buyDifferent: buy - latestPrice.buy,
        sellDifferent: sell - latestPrice.sell,
        created_at: new Date().getTime()
      }).catch(err => {
        reject(err);
      });
    })
  }
  else {
    console.log("It is not necessary to add the same value with previos one.");
  }
}

function shouldAddPrice(buy, sell) {
  return new Promise((resolve, reject) => {
    db.ref('price').orderByChild('created_at').limitToLast(1).once('value').then(snapshot => {
      let data = snapshot.val();
      let id = Object.keys(data)[0];
      let oldBuy = data[id].buy;
      let oldSell = data[id].sell;
      if(buy - oldBuy != 0 || sell - oldSell != 0) {
        resolve(true);
      }
      else {
        resolve(false);
      }
    }).catch(err => {
      reject(err);
    })
  });
}

function getLatestPrice() {
  return new Promise((resolve, reject) => {
    db.ref('price').orderByChild('created_at').limitToLast(1).once('value').then(snapshot => {
      resolve(snapshot.val());
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = {
  getInstance,
  addPrice,
  getLatestPrice,
  shouldAddPrice
}
