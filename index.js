const express = require("express");
const authors = require("./routes/authors");
const articles = require("./routes/articles");
const users = require("./routes/users");
const auth = require("./routes/auth");

require("./mongoose");

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/authors", authors);
app.use("/api/articles", articles);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
