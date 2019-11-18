const express = require("express");
const router = express.Router();
const {Article, validate} = require("../models/article");
const isLoggedIn = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

router.get("/", async (req, res) => {
 res.send(await Article.find());
});

router.get("/:id", async (req, res) => {
  try {
    res.send(await Article.findById(req.params.id).populate("author"));
  } catch {
    res.status(404).send("An article with the given ID was not found");
  } 
});

router.get("/author/:authorId", async (req, res) => {
  try {
    res.send(await Article.find({author: req.params.authorId}));
  } catch {
    res.status(404).send("An article with the given ID was not found");
  } 
});

router.post("/", isLoggedIn, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

   const article = new Article({
    author: req.body.author,
    title: req.body.title,
    fullText: req.body.fullText,
    date: req.body.date
  });

  const result = await article.save();
  res.send(result); 
});

module.exports = router;