/************************************* 
Run this code to start and expose the server 
that will receive the track click events

Required: 
- Register the callback URL in the messaging service settings under "Link Shortening"

Docs: 
 - https://www.twilio.com/docs/messaging/features/link-shortening#track-customer-engagement-with-click-events
*************************************/
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ngrok = require("ngrok");

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  console.log("Incoming track click event");
  const data = req.body;

  console.log({
    userId: data.to,
    event: "Click Tracked",
    properties: {
      clickTime: data.clicked_at,
      clickType: data.event_type,
      link: data.link,
      messageSid: data.sms_sid,
      phone: data.to,
      userAgent: data.user_agent,
    },
  });

  res.json({});
});

(async function () {
  const PORT = 4000;
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
  const url = await ngrok.connect(PORT);
  console.log(`Port ${PORT} exposed on ${url}`);
})();
