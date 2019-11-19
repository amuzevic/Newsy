const express = require("express");
const router = express.Router();
const {User, validate} = require("../models/user");
const bcrypt = require("bcrypt");
const isLoggedIn = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

//get all users
router.get("/", [isLoggedIn, isAdmin], async (req, res) => {
 res.send(await User.find());
});

//get specific user by id
router.get("/:id", [isLoggedIn, isAdmin], async (req, res) => {
  try {
    res.send(await User.findById(req.params.id));
  } catch {
    res.status(404).send("A user with the given ID was not found");
  } 
});

//enables unregistered users to create their own account, returns a JWT for the new user
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
    isAdmin: false
  });
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send("User account created successfully");
    
});

//edit a user's details
router.put("/:id",[isLoggedIn, isAdmin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    isAdmin: req.body.isAdmin
    }, {new: true});
  } catch {
    return res.status(404).send("An user with the given ID was not found");
  } 
  res.send("User updated successfully");
});

//delete a user
router.delete("/:id", [isLoggedIn, isAdmin], async (req, res) => {
  try {
     await User.deleteOne({_id: req.params.id});
  } catch {
    return res.status(404).send("A user with the given ID was not found");
  }
  res.send("User deleted successfully");
});



module.exports = router;