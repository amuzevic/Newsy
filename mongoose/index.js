const mongoose = require("mongoose");

//database username: admin, password: 8nSCisp1v6Ge9FmO
mongoose
  .connect(
    "mongodb+srv://admin:8nSCisp1v6Ge9FmO@newsy-lku66.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("THIS WORKED, also pinus");
  })
  .catch(err => console.error("Could not connect to MongoDB", err));
