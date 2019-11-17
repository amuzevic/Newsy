const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const authorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

const Author = mongoose.model("Author", authorSchema);

async function createAuthor() {
  const author = new Author({
    firstName: "Bobs",
    lastName: "Vegana"
  });

  const result = await author.save();
  console.log(result);
}

async function getAuthors() {
  const authors = await Author.find();
  console.log(authors);
  return authors;
}

function validate(author) {
  const schema = Joi.object({
    firstName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
    lastName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required()
  });
  return schema.validate({
    firstName: author.firstName,
    lastName: author.lastName
  });
}

exports.authorModel = Author;
