const router = require("express").Router();

const Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find().then((data) =>
    res.json(data).catch((Err) => res.status(400).json("error" + Err))
  );
});

router.route("/add").post(async (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  try {
    const newExercise = new Exercise({
      username,
      description,
      duration,
      date,
    });
    await newExercise.save().then(() => res.json("exercise created!"));
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
