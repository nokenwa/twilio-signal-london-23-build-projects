require("dotenv").config();
/**
 * To Do:
 * Run this code to create a new transcript with a previously recorded conversation
 * 
 * Required: 
 *    - A web link to a recorded conversation (PCM-encoded WAV, MP3, FLAC)
 *    - A Voice Intelligence service with language operators addded
 * */ 

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


/* Enter aws Media Url and Voice Intelligence service Sid */
const awsMediaUrl = "";
const serviceSid = "";
/***********************************************************/


/************** Enter Participant Information **************/
const participants = [
  {
     "user_id" : "id1", // Do not change
     "channel_participant": 1, // Do not change
     "media_participant_id": "",
     "email": "",
     "full_name": "",
     "role": "Agent"  // Do not change
  },
  {
     "user_id" : "id2", // Do not change
     "channel_participant": 2, // Do not change
     "media_participant_id": "",
     "email": "",
     "full_name": "",
     "role": "Customer"  // Do not change
  }
];
/***********************************************************/

const channel = {
  "media_properties": {
    "source_sid": null,
    "media_url": awsMediaUrl
  },
  participants
};

client.intelligence.v2.transcripts
  .create({
    serviceSid,
    channel
  })
  .then(transcript => console.log(transcript.sid));




