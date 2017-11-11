"use strict";
const admin = require("firebase-admin");
const firebaseConfig = require("../config/firebaseConfig.json");
const serviceAccount = require("../config/goldpricetracking-firebase-adminsdk-718s5-85e720333f.json");

let app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
});

let db = app.database();

function getInstance() {
  return db;
}

function addPrice(buy, sell) {
  getLatestPrice().then(latestPrice => {
    let uid = db.ref().child('price').push().key;
    db.ref('price/' + uid).set({
      buy: buy,
      sell: sell,
      buyDifferent: buy - latestPrice.buy,
      sellDifferent: sell - latestPrice.sell,
      created_at: new Date().getTime()
    }).catch(err => {
      console.log(err.message + '\n' + err.stack);
    });
  }).catch(err => {
    console.log(err.stack);
  });
}

function shouldAddPrice(buy, sell) {
  return new Promise((resolve, reject) => {
    db.ref('price').orderByChild('created_at').limitToLast(1).once('value').then(snapshot => {
      let data = snapshot.val();
      let id = Object.keys(data)[0];
      let oldBuy = data[id].buy;
      let oldSell = data[id].sell;
      if (buy - oldBuy !== 0 || sell - oldSell !== 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).catch(err => {
      reject(err.stack);
    });
  });
}

function getLatestPrice() {
  return new Promise((resolve, reject) => {
    db.ref('price').orderByChild('created_at').limitToLast(1).once('value').then(snapshot => {
      snapshot.forEach(childSnapshot => {
        resolve(childSnapshot.val());
      });
    }).catch(err => {
      reject(err.stack);
    });
  });
}

function addLineUser(userId) {
  return new Promise((resolve, reject) => {
    let uid = db.ref().child('user').push().key;
    db.ref('user/' + uid).set({
      id: userId
    }).catch(err => {
      reject(err.stack);
    });
  });
}

function getAllUser() {
  return new Promise((resolve, reject) => {
    db.ref('user').once('value').then(snapshot => {
      resolve(snapshot.val());
    }).catch(err => {
      reject(err.stack);
    });
  });
}

/* number: number of latest data (0 = all)*/
function getLatestPrices(number) {
  let priceArr = new Array(number);
  let count = 0;
  if(number !== 0) {
    return new Promise((resolve, reject) => {
      db.ref('price').orderByChild('created_at').limitToLast(number).once('value').then(snapshot => {
        snapshot.forEach(childSnapshot => {
          priceArr[count] = childSnapshot.val();
          count += 1;
        });
        if(count === number) {
          resolve(priceArr)
        }
      }).catch(err => {
        reject(err.stack);
      });
    });
  }
  else {
    return new Promise((resolve, reject) => {
      db.ref('price').orderByChild('created_at').once('value').then(snapshot => {
        priceArr = new Array(snapshot.numChildren());
        snapshot.forEach(childSnapshot => {
          priceArr[count] = childSnapshot.val();
          count += 1;
        });
        if(count === snapshot.numChildren()) {
          resolve(priceArr)
        }
      }).catch(err => {
        reject(err.stack);
      });
    });
  }
}

module.exports = {
  getInstance,
  addPrice,
  getLatestPrice,
  shouldAddPrice,
  addLineUser,
  getAllUser,
  getLatestPrices
};
