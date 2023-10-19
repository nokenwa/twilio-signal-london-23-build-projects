/************************************* 
Run this code to send a message

Required: 
- Add the numbers which will communicate
- Buy a domain to shorten links
- Link the Message Service with the domain
- Upload the certificate and private key
- Configuring Fallback and Callback URLs

Docs: 
 - https://www.twilio.com/docs/messaging/features/link-shortening/onboarding-guide
 - https://www.twilio.com/blog/how-to-schedule-and-track-marketing-campaigns
*************************************/
require("dotenv").config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;

const client = require('twilio')(apiKey, apiSecret, { accountSid });

console.log(
  `Initialized client with account sid ${process.env.TWILIO_ACCOUNT_SID}`
);

// Send a message with a shortened link
client.messages
  .create({
    shortenUrls: true,
    body: "Check out this awesome link https://www.twilio.com/try-twilio?utm_campaign=EVENT_SIGNAL_2023_OCT_13_SIGNAL_London_EMEA&utm_source=twilio&utm_medium=conference&utm_content=signallondon2023&utm_term=devevangel",
    to: "+44 0000 0000", // TODO Add your number here
    from: process.env.MESSAGING_SERVICE_SID,
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.error(error));
