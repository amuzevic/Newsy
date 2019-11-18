const express = require("express");
const router = express.Router();
const {User, validate} = require("../models/user");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
 
  if(await User.findOne({email: req.body.email})){
    return res.status(400).send("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
    isAdmin: req.body.isAdmin
  });
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send("New user saved successfully");
    
});

module.exports = router;