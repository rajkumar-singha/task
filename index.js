const express = require("express");
const app = express();
const mongoose = require("mongoose");
const allApis = require('./router/index')


mongoose
    .connect("mongodb://localhost:27017/testing")
    .then(() => console.log("db connection successfully"))
    .catch((err) => console.log(err))

app.use(express.json());
app.use("/api", allApis);

//! Print Bad Request
app.use((req, res, next) => {
  res.status(404).send({
    error: "Bad Request",
  });
});

app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});

app.listen(4040, () => {
  console.log("server is running on post no 4040");
});