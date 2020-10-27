//Import the mongoose module
let mongoose = require('mongoose');

//Set up default mongoose connection
let mongoDB = process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost:27017/reddit-local'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));