const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const {secretKey} = require("../config");

const userSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 2, maxlength: 255},
  email: {type: String, required: true, minlength: 2, maxlength: 255, unique: true},
  password: {type: String, required: true, minlength: 8, maxlength: 1024},
  isAdmin: {type: Boolean}
});

userSchema.methods.generateAuthToken = function(){
  return jwt.sign({_id: this._id}, secretKey);
}

const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(2)
      .max(255)
      .required(),
    email: Joi.string()
      .email()
      .min(5)
      .max(255)
      .required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .required()
  });
  return schema.validate({
    name: user.name,
    email: user.email,
    password: user.password
  });
}

exports.User = User;
exports.validate = validate;
