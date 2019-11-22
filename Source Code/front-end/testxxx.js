var jwtDecode = require("jwt-decode");
var token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQyYzhhOWY0MWI4MjhjM2MyNTc5NzYiLCJpYXQiOjE1NzQzNTE1NzB9.BgULCdL7VBUVW_7pPuGf7BJpyE74Vw7VLBMA8EKWLeg";
var decoded = jwtDecode(token);
var date = new Date(decoded.iat);
console.log(date);
