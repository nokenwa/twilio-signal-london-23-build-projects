/************************************* 
Run this code to send a message

Required: Add the numbers which will communicate
Optional: 
 - Send WhatsApp messages if the messaging service contains a WhatsApp sender
 - Create a template in the content editor and use it here
 
 Docs: 
 - https://www.twilio.com/docs/sms/api/message-resource
 - https://www.twilio.com/docs/content/create-templates-with-the-content-editor
*************************************/
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;

const client = require("twilio")(apiKey, apiSecret, { accountSid });

console.log(
  `Initialized client with account sid ${process.env.TWILIO_ACCOUNT_SID}`,
);

client.messages
  .create({
    body: `Ahoy World!`,
    to: "whatsapp:+44 0000 0000", // TODO Add your number here
    from: process.env.MESSAGING_SERVICE_SID,
    // contentSid: 'HXxxxxxxxxx', // TODO Add your content sid here
    // contentVariables: `{"0":"Alice","1":"Vanilla","2":"www.twilio.com/try-twilio"}`, // optional: add your content variables here
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.error(error));
