// const axios = require("axios");
// let url = "http://202.191.56.159:2828/user/resetPassword/vutuandat811@gmail.com";
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

// let abcd = ["abc 123", "def 234", "mnp 1223", "lks 217", "xmj 122"];
// let urlCategory = "";
// let xx = [];

// abcd.map((item, index) => {
//   let childCategory = item.replace(/ /g, "+");
//   if (item) {
//     xx.push(item);
//   }
//   urlCategory += "&&" + childCategory;
// });
// console.log(xx);

// let date = new Date();
// date.setTime(date.getTime() + 86400*1000);
// console.log(date.toUTCString());

const axios = require("axios");
axios
  .post("http://202.191.56.159:2828/user/login", {
    email: "dat.luuthanh@gmail.com",
    password: "luuthanhdat"
  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err.message);
  });
