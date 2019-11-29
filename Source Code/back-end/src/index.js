require("./database/connect");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const app = express();
const config = require("./config");
const passport = require("./middlewares/passportAuth");

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

// main routes here:
app.use("/categoryManagement", require("./routes/category.route"));
app.use("/post", require("./routes/post.route"));
app.use("/user", require("./routes/user.route"));
app.use("/reply", require("./routes/reply.route"));

// error handler middleware:
app.use(errorHandler);

app.listen(config.port, () => {
    console.log("Listening on port " + config.port);
})