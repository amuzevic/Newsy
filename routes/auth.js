const express = require("express");
const router = express.Router();
const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");

//log in by sending email and password and receive a JWT
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send("Invalid email or password");
  
  res.send(user.generateAuthToken());
    
});

function validate(req) {
  const schema = Joi.object({
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
    email: req.email,
    password: req.password
  });
}

module.exports = router;