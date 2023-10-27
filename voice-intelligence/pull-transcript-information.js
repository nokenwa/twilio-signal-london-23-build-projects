/**
 * To Do:
 * Run this code to gather the probability of your language operators being applied to your 
 * transcript and a transcript of the conversation in a new transcript.txt file.
 * 
 * Required: 
 *    - The transcript sid from running the create-transcript.js file (lines 17 and 30).
 * */ 

require("dotenv").config();
const fs = require('fs');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.intelligence.v2.transcripts('<your transcript SID>')
  .operatorResults
  .list({limit: 20})
  .then(operatorResults => operatorResults.forEach(operator => 
    console.log({
            operatorType: operator.operatorType,
            name: operator.name,
            probability: Object.keys(operator.labelProbabilities).length? operator.labelProbabilities: operator.matchProbability,
        })
    
    ));

let transcript = ""
client.intelligence.v2.transcripts('<your transcript SID>')
    .sentences
    .list({limit: 20})
    .then(sentences => sentences.forEach(s => {
      transcript += `${s.transcript}\n`
    }))
    .then(res => {
        fs.writeFile("transcript.txt", transcript, null, (err) => { 
            err? console.log(err) : console.log("File written successfully\n");
        })
    });