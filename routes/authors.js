const express = require("express");
const router = express.Router();
const {Author, validate} = require("../models/author");
const isLoggedIn = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

//get all authors
router.get("/", isLoggedIn, async (req, res) => {
 res.send(await Author.find());
});

//get specific author by id
router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    res.send(await Author.findById(req.params.id));
  } catch {
    res.status(404).send("An author with the given ID was not found");
  } 
});

//create new author
router.post("/",[isLoggedIn, isAdmin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

   const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  await author.save();
  res.send(`New author saved successfully with id: ${author._id}`); 
});

//edit an author's details
router.put("/:id",[isLoggedIn, isAdmin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await Author.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName
    }, {new: true});
  } catch {
    return res.status(404).send("An author with the given ID was not found");
  } 
  res.send("Author updated successfully");
});

//delete an author
router.delete("/:id", [isLoggedIn, isAdmin], async (req, res) => {
  try {
     await Author.deleteOne({_id: req.params.id});
  } catch {
    return res.status(404).send("An author with the given ID was not found");
  }
  res.send("Author deleted successfully");
});

module.exports = router;
