const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;
const uri =
  process.env.MONGOURL ||
  "mongodb+srv://samuelbahiru93:ppamdd93@cluster0.godmhy7.mongodb.net/db1?retryWrites=true&w=majority";
app.use(cors());

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("the database is connected");
  });

const exerciseRouter = require("./routes/exercise");
const userRouter = require("./routes/user");

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("the server is running on ", port);
});
