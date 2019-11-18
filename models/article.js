const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const articleSchema = new mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref:"Author", required: true},
  title: {type: String, required: true, minlength: 1, maxlength: 255},
  fullText: {type: String, required: true, minlength: 1},
  date: {type: Date, default: Date.now}
});

const Article = mongoose.model("Article", articleSchema);

function validate(article) {
  const schema = Joi.object({
    title: Joi.string()
      .min(1)
      .max(255)
      .required(),
    fullText: Joi.string()
      .min(1)
      .required()
  });
  return schema.validate({
    title: article.title,
    fullText: article.fullText
  });
}

exports.Article = Article;
exports.validate = validate;