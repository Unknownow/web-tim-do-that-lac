const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://mongodb:cuongbui@cuong-project-gs1zt.mongodb.net/tim-do-that-lac?retryWrites=true&w=majority",{
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
  