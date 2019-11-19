const express = require("express");
const app = express();
require("express-async-errors");
require("./mongoose");
require("./startup/routes")(app);



process.on("uncaughtException", (ex) => {
  console.log(ex);
  process.exit(1);
})

process.on("unhandledRejection", (ex) => {
  console.log(ex);
  process.exit(1);
})



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
