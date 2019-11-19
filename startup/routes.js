const express = require("express");
const authors = require("../routes/authors");
const articles = require("../routes/articles");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use("/api/authors", authors);
  app.use("/api/articles", articles);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};