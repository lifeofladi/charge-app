const express = require("express"),
  app = express(),
  home = require("./routes/home");

app.use(express.urlencoded({ extended: false }));

app.use("/", home);

app.listen(5500, () => {
  console.log("Server started.......");
});
