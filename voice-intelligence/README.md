<h1 align="center">Voice Intelligence Breakout 🧠</h1>

For this breakout you will create a transcript for a pre-recorded phone call, add meta data about the call, and view the level of confidence of your language operators applied to your conversation.

<br>

## Setup
If you don't have a pre-recorded converation, create one with a friend or the person sitting next to you. If you're calling a friend outside of the room, we recommend giving them a headsup that the line will be recorded 😉

### Create a Twilio Account
If you haven't done so already, [create a Twilio account](https://www.twilio.com/try-twilio) and navigate to the home page to find your Account Sid and Authorization Token.

Head to the `add-your-credentials.env` file in this repository and add your account sid and authorization token to the enviornment variables.

### Record a call
Follow this [blog](https://www.twilio.com/blog/make-receive-calls-twilio-number-using-studio) to buy a Twilio number and set up a call forwarding feature. This way your Twilio number will be the one contacting your partner. 

When setting up the "Connect Call To" widget, make sure call recording is toggled to the `ON` position.

Publish your flow, assign it to a Twilio number, and you're ready to make your call!

### Download your recording and upload to AWS S3 bucket
In the left panel of the console at the top, select `Monitor` then `Call Recordings`. Click on the recording that you'd like to download and download the MP3.

Once downloaded, head over to AWS, and [create a S3 bucket](https://s3.console.aws.amazon.com/s3/bucket/create) and add the recording as an object in the bucket.

In your S3 bucket, select the recording object, click on the action drop down menu and select `Share with presigned URL`. Enter your desired expiration time, submit, then a confirmation should appear and the URL automatically copied to your clipboard.

![Creating a presigned URL for an MP3 file hosted on ASW](https://image-for-london-signal-breakout-repo-4569.twil.io/Screen%20Shot%202023-10-26%20at%201.32.37%20PM.png)

<br>

## Create a Voice Intelligence service in the Twilio console
Head to the Twilio console and navigate to [Voice Intelligence/Services](https://console.twilio.com/us1/develop/voice-intelligence/services). Create a new Service and give it a unique name.
All selections when creating a service are optional.

After your service is created, select any prebuilt language operators provided by Twilio and create any language operators you'd like to include.

## Repository instructions
This is a Node.js project. Install the dependensies with this command in the root of the repository: 
```
npm i --save
```


### create-transcript.js

1. Head to the `create-transcript.js` file.
2. Add your media url to line 17.
3. Add your service sid from your newly created service to line 18.
4. Add the call participant information to the participants array between lines 23 and 40. Feel free to make up data if you'd like!
5. Run the file by pasting the following command in your terminal:
``` 
node create-transcript.js
```
6. Copy the transcript sid logged in the console for the `pull-transcript-information.js` file.

<br>

### pull-transcript-information.js
1. Head to the `pull-transcript-information.js` file.
2. Paste the transcript sid to lines 17 and 30.
3. Run the file by pasting the following command in your terminal: 
``` 
node pull-transcript-information.js
```
4. The output in your terminal will display the level of confidence for your applied language operators. A `transcript.txt` file will be created in the repository folder! 
