// const axios = require("axios");
// let url = "http://localhost:8002/user/resetPassword/vutuandat811@gmail.com";
// axios
//   .post(url, {})
//   .then(response => {
//     console.log(response);
//   })
//   .catch(err => {
//     console.log(err.message);
//   });

// fetch(url, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   }
// })
//   .then(response => response.json())
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// var today = new Date();
// var date =
//   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
// var time =
//   today.getHours() + ":" + today.getMinutes();
// var dateTime = date + "T" + time;
// console.log(dateTime);

let abcd = ["abc 123", "def 234", "mnp 1223", "lks 217", "xmj 122"];
let urlCategory = "";
let xx = [];

abcd.map((item, index) => {
  let childCategory = item.replace(/ /g, "+");
  if (item) {
    xx.push(item);
  }
  urlCategory += "&&" + childCategory;
});
console.log(xx);
