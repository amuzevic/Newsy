const mongoose = require("mongoose");
const {dbUsername, dbPassword} = require("../config");

mongoose
  .connect(
    `mongodb+srv://${dbUsername}:${dbPassword}@newsy-lku66.mongodb.net/test?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => console.error("Could not connect to MongoDB ", err));
