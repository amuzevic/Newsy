const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

function validateAuthor(author) {
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
  });
  return schema.validate({ name: author.name });
}

var authors = [
  { id: 1, name: "bobs" },
  { id: 2, name: "pinus" },
  { id: 3, name: "vegana" }
];

router.get("/", (req, res) => {
  res.send(authors);
});

router.get("/:id", (req, res) => {
  const author = authors.find(c => c.id === parseInt(req.params.id));
  if (!author)
    res.status(404).send("An author with the given ID was not found");
  res.send(author);
});

router.post("/", (req, res) => {
  const { error } = validateAuthor(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  const author = {
    id: authors.length + 1,
    name: req.body.name
  };
  authors.push(author);
  res.send(authors);
});

router.put("/:id", (req, res) => {
  const author = authors.find(c => c.id === parseInt(req.params.id));
  if (!author)
    return res.status(404).send("An author with the given ID was not found");

  const { error } = validateAuthor(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  author.name = req.body.name;

  res.send(author);
});

router.delete("/:id", (req, res) => {
  const author = authors.find(c => c.id === parseInt(req.params.id));
  if (!author)
    return res.status(404).send("An author with the given ID was not found");

  const index = authors.indexOf(author);
  authors.splice(index, 1);
  res.send(author);
});

module.exports = router;
