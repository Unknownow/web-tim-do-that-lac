// var jwtDecode = require("jwt-decode");
// var token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQyYzhhOWY0MWI4MjhjM2MyNTc5NzYiLCJpYXQiOjE1NzQzNTE1NzB9.BgULCdL7VBUVW_7pPuGf7BJpyE74Vw7VLBMA8EKWLeg";
// var decoded = jwtDecode(token);
// var date = new Date(decoded.iat);
// console.log(date);

// var abc = "12321321321";
// var abc1 = abc.slice(0 , abc.length - 4);
// console.log(abc1);

var value = "123456789";
for (let index = 0; index < value.length; index++) {
  if (index % 2 === 1) {
    let x = Math.random()
      .toString(36)
      .substring(4, 5);
    value = value.slice(0, index) + x + value.slice(index);
  }
}
console.log(value);
for (let index = 0; index < value.length; index++) {
  if (index % 2 === 1 && value.length % 2 === 1) {
    part1 = value.substring(0, index);
    part2 = value.substring(index + 1, value.length);
    value = part1 + part2;
  }
  if (index % 2 === 0 && value.length % 2 === 0) {
    part1 = value.substring(0, index);
    part2 = value.substring(index + 1, value.length);
    value = part1 + part2;
  }
}
console.log(value);
