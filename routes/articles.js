const express = require("express");
const router = express.Router();
const {Article, validate} = require("../models/article");
const isLoggedIn = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

//get all articles
router.get("/", isLoggedIn, async (req, res) => {
  res.send(await Article.find().populate("author"));
});

//get article with specific id
router.get("/:id", isLoggedIn, async (req, res) => {
  const article = await Article.findById(req.params.id).populate("author")
  if(!article) return res.status(404).send("An article with the given ID was not found");

  res.send(article);
});

//get all articles written by specific author
router.get("/author/:authorId", isLoggedIn, async (req, res) => {
  const articles = await Article.find({author: req.params.authorId});
  if(articles.length === 0) return res.status(404).send("No articles associated with provided author ID found");

  res.send(articles);
});

//submit new article
router.post("/", [isLoggedIn, isAdmin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

   const article = new Article({
    author: req.body.author,
    title: req.body.title,
    fullText: req.body.fullText,
    date: req.body.date
  });

  await article.save();
  res.send(`Article created successfully with id: ${article._id} `); 
});

//edit an article
router.put("/:id", [isLoggedIn, isAdmin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const success = await Article.findByIdAndUpdate(req.params.id, {
    fullText: req.body.fullText,
    title: req.body.title
  }, {new: true});

  if(!success) return res.status(404).send("An article with the given ID was not found");

  res.send("Article updated successfully");
});

//delete an article
router.delete("/:id", [isLoggedIn, isAdmin], async (req, res) => {
  
  const result = await Article.deleteOne({_id: req.params.id});
  if(result.deletedCount === 0) return res.status(404).send("An article with the given ID was not found");

  res.send("Article deleted successfully");
});

module.exports = router;