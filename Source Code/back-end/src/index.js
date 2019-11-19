require("./database/connect");
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

// main routes here:
app.use("/", require("./routes/category.route"));
app.use("/", require("./routes/user.route"));

// error handler middleware:
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Listening on port 3000!");
})