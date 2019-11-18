const mongoose = require("mongoose");
const Joi = require("@hapi/joi");


const authorSchema = new mongoose.Schema({
  firstName: {type: String, required: true, minlength: 2, maxlength: 255},
  lastName: {type: String, required: true, minlength: 2, maxlength: 255}
});

const Author = mongoose.model("Author", authorSchema);

function validate(author) {
  const schema = Joi.object({
    firstName: Joi.string()
      .alphanum()
      .min(2)
      .max(255)
      .required(),
    lastName: Joi.string()
      .alphanum()
      .min(2)
      .max(255)
      .required()
  });
  return schema.validate({
    firstName: author.firstName,
    lastName: author.lastName
  });
}

exports.Author = Author;
exports.validate = validate;
