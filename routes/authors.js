const express = require("express");
const router = express.Router();
const {Author, validate} = require("../models/author");

router.get("/", async (req, res) => {
 res.send(await Author.find());
});

router.get("/:id", async (req, res) => {
  try {
    res.send(await Author.findById(req.params.id));
  } catch {
    res.status(404).send("An author with the given ID was not found");
  } 
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

   const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  await author.save();
  res.send("New author saved successfully"); 
});


router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    var author = await Author.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName
    }, {new: true});
  } catch {
    return res.status(404).send("An author with the given ID was not found");
  } 
  res.send("Author updated successfully");
});

router.delete("/:id", async (req, res) => {
  try {
     await Author.deleteOne({_id: req.params.id});
  } catch {
    return res.status(404).send("An author with the given ID was not found");
  }
  res.send("Author deleted successfully");
 

});

module.exports = router;
