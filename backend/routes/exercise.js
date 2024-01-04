const router = require("express").Router();

const Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((data) => res.json(data))
    .catch((Err) => res.status(400).json("error" + Err));
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

router.route("/:id").get(async (req, res) => {
  try {
    await Exercise.findById(req.params.id).then((data) => res.json(data));
  } catch (err) {
    res.status(400).json("error", err);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    Exercise.findByIdAndDelete(req.params.delete).then(() =>
      res.json("succesfully deleted")
    );
  } catch (err) {
    res.status(400).json("error", err);
  }
});

router.route("/update/:id").post(async (req, res) => {
  try {
    Exercise.findById(req.params.id).then((item) => {
      item.username = req.body.username;
      item.description = req.body.description;
      item.duration = Number(req.body.duration);
      item.date = Date.parse(req.body.date);
      item
        .save()
        .then(() => res.json("update successfully!"))
        .catch((err) => res.status(400).json("err", err));
    });
  } catch (err) {}
});

module.exports = router;
