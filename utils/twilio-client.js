// require("dotenv").config();
// const { TW_ACCT_SID, TW_AUTH_TOKEN } = process.env;
const MessagingResponse = require("twilio").twiml.MessagingResponse,
  twiml = new MessagingResponse();
statusURL = "https://31ca4f48fd8c.ngrok.io/status";

class TwilioAPI {
  static sendSuccessMessage(customerObj) {
    twiml.message(
      {
        action: statusURL,
      },
      `Your payment was successful!\n \nThank you ${
        customerObj.nickname || customerObj.givenName
      }!\n \n-- DriveTime Services`,
    );
  }

  static sendBalanceMessage(customerObj, amount) {
    twiml.message(
      {
        action: statusURL,
      },
      `${
        customerObj.nickname || customerObj.givenName
      },\n \nYour balance is: ${amount}.\n \n-- DriveTime Services`,
    );
  }

  static toString() {
    return twiml.toString();
  }
}

module.exports = TwilioAPI;
