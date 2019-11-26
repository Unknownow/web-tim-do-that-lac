const mongoose = require("mongoose");
const config = require("../config");
mongoose.connect(config.dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error.');
    console.error(err);
    process.exit();
});

mongoose.connection.once('open', () => {
    console.log('MongoDB connect successfully');
});