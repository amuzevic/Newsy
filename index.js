const express = require("express");

const app = express();
const authors = require("./routes/authors");

app.use(express.json());
app.use("/api/authors", authors);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
