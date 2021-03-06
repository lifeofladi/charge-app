require("dotenv").config();
const router = require("express").Router(),
  _ = require("lodash"),
  sq = require("../utils/square-client"),
  tw = require("../utils/twilio-client");

//Handling GET request on home route
router.get("/", (req, res) => {
  res.send("d/b/a DriveTime Services.");
});

//webhook route for message response
router.post("/sms", async (req, res) => {
  let { Body, From, MessageStatus } = req.body,
    cleanedBody = Body.toLowerCase().trim(),
    customer;
  try {
    console.log("Finding customer...");
    const result = await sq.findCustomer(From);
    //Only respond to registered numbers
    if (!_.isEmpty(result) && cleanedBody === "charge") {
      customer = result.customers[0];
      //process order payment
      console.log("Processing payment...");
      const { payment } = await sq.processPayment(customer.id);
      if (payment.status === "COMPLETED") {
        //send success message
        console.log("Sending response... ");
        tw.sendSuccessMessage(customer);
      }
    }

    //http response to twilio phone client
    res.writeHead(200, { "Content-Type": "text/xml" });

    /*
    * end http response with text-response
    converted into a string
    */
    res.end(tw.toString());
  } catch (error) {
    console.log(error);
  }
});

//webhook route for message status
router.post("/status", (req, res) => {
  const { MessageStatus } = req.body;
  if (MessageStatus === "delivered") console.log("text-delivered...");
  res.sendStatus(200);
});

module.exports = router;
