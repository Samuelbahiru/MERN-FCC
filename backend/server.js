const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

// mongoose.connection("").then(() => {
//   console.log("the database is connected");
// });

app.listen(port, () => {
  console.log("the server is running on ", port);
});
