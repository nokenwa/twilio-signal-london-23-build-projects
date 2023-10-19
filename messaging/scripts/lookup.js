/************************************* 
Run this code to count all messages 
and calls from a given number

Required: Add the number you want to look up
Optional: Switch the other packages / fields
Docs: https://www.twilio.com/docs/lookup/v2-api
*************************************/
require("dotenv").config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;

const client = require('twilio')(apiKey, apiSecret, { accountSid });

console.log(
    `Initialized client with account sid ${process.env.TWILIO_ACCOUNT_SID}`
);

(async () => {
    const phone_number = await client.lookups.v2
        .phoneNumbers("+44 0000 0000") // TODO Change number here
        .fetch({ fields: "sms_pumping_risk" }); // Optional: Request more fields
    console.log(phone_number.smsPumpingRisk);
})();
