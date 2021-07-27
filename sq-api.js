require("dotenv").config();
const home = require("./routes/home");
const express = require("express");
const app = express();

const { PORT, SQ_ENVIRONMENT, SQ_APPLICATION_ID, SQ_APPLICATION_SECRET } =
  process.env;

app.use("/", home);

const port = PORT || 3050;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
