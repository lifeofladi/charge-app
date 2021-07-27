const express = require("express"),
  router = express.Router(),
  sendMessage = require("../twilio-api"),
  MessagingResponse = require("twilio").twiml.MessagingResponse;

//Handling GET request on home route
router.get("/", (req, res) => {
  sendMessage();
  res.send("We in this bitch again!!!!");
});

//webhook route for message response
router.post("/sms", (req, res) => {
  console.log("received a text message...");
  // console.log(req.body.Body);
  const twiml = new MessagingResponse();
  //create text-response
  twiml.message(`Thanks ${req.body.Body}! We will get back to you shortly!`);

  //http response to twilio phone client
  res.writeHead(200, { "Content-Type": "text/xml" });

  /*
  * end http response with text-response
  converted into a string
  */
  res.end(twiml.toString());
});

module.exports = router;
