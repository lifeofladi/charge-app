require("dotenv").config();
const { TW_ACCT_SID, TW_AUTH_TOKEN } = process.env;
const client = require("twilio")(TW_ACCT_SID, TW_AUTH_TOKEN);

//send a message
async function sendMessage() {
  try {
    const response = await client.messages.create({
      body: "We did it Ladi!",
      from: "+19412691955",
      to: "+13463290310",
      statusCallback: "https://7bd6e79eba35.ngrok.io/status",
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendMessage;
