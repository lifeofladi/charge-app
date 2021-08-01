// require("dotenv").config();
// const { TW_ACCT_SID, TW_AUTH_TOKEN } = process.env;
const MessagingResponse = require("twilio").twiml.MessagingResponse,
  twiml = new MessagingResponse();

class TwilioAPI {
  static sendSuccessMessage(customerObj) {
    twiml.message(
      {
        action: "https://89f18c1517b5.ngrok.io/status",
      },
      `Your payment was successful!\n \nThank you ${
        customerObj.nickname || customerObj.givenName
      }!\n \n-- DriveTime Services`,
    );
  }

  static toString() {
    return twiml.toString();
  }
}

module.exports = TwilioAPI;
