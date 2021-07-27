const express = require("express"),
  app = express(),
  sendMessage = require("./twilio-api"),
  home = require("./routes/home"),
  bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: false }));

app.use("/", home);

app.listen(5000, () => {
  console.log("Server started.......");
});
