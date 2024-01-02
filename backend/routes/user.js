const router = require("express").Router();

let User = require("../models/user.model");

router.route("/").get(async (req, res) => {
  try {
    await User.find().then((users) => res.json(users));
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "error",
      error: err,
    });
  }
});

router.route("/add").post(async (req, res) => {
  try {
    const username = req.body.username;
    const newUser = await new User({ username });
    await newUser.save().then(() => res.json("user added!"));
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
