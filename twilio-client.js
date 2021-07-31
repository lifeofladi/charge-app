// require("dotenv").config();
// const { TW_ACCT_SID, TW_AUTH_TOKEN } = process.env;
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const twiml = new MessagingResponse();

class TwilioAPI {
  static sendSuccessMessage(customerObj) {
    twiml.message(
      {
        action: "https://45a7dc134cb2.ngrok.io/status",
      },
      `Thank you ${customerObj.nickname}!\n \nYour payment was successful.\n \nA receipt has been sent to your email.\n \n-- DriveTime Services`,
    );
  }

  static toString() {
    return twiml.toString();
  }
}

module.exports = TwilioAPI;
