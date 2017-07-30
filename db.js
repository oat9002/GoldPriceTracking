let firebase = require("firebase");
let app = firebase.initializeApp({
  apiKey: "AIzaSyDCD8IhA1OoJ4852sNuiLahW1l1EHnaiP8",
  authDomain: "goldpricetracking.firebaseapp.com",
  databaseURL: "https://goldpricetracking.firebaseio.com",
  projectId: "goldpricetracking",
  storageBucket: "goldpricetracking.appspot.com",
  messagingSenderId: "780822195460"
});

let db = app.database();

function addPriceData(buy, sell) {
  let uid = db.ref().child('price').push().key;
  db.ref('price/' + uid).set({
    buy: buy,
    sell: sell
  });
}

module.exports = {
  addPriceData
}
