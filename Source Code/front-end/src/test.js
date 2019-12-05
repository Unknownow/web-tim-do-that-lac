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
axios.get("https://vms.bkav.com:9443/vms/api/monitors?mode=special", {
            headers: {
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJab25lTWluZGVyIiwiaWF0IjoxNTc1NTA5NzMyLCJleHAiOjE1NzU1MTMzMzIsInVzZXIiOiJhZG1pbiIsInR5cGUiOiJhY2Nlc3MifQ.19fxTUJrH_M2-dbmA2bl__WFsuBAcGMlCAmYrarD_Y8"
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err.message);
        })
