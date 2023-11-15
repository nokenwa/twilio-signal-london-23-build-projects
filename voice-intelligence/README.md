<h1 align="center">Voice Intelligence Breakout 🧠</h1>

For this breakout you will create a transcript for a pre-recorded phone call, add meta data about the call, and view the level of confidence of your language operators applied to your conversation.

<br>

## Twilio Console Setup
If you don't have a pre-recorded converation, create one with a friend or the person sitting next to you. If you're calling a friend outside of the room, we recommend giving them a headsup that the line will be recorded 😉

### Create a Twilio Account
If you haven't done so already, [create a Twilio account](https://www.twilio.com/try-twilio) and navigate to the voice Intelligence page
### Record a call
Follow this [blog](https://www.twilio.com/blog/make-receive-calls-twilio-number-using-studio) to buy a Twilio number and set up a call forwarding feature. This way your Twilio number will be the one contacting your partner. 

When setting up the "Connect Call To" widget, make sure call recording is toggled to the `ON` position.

Publish your flow, assign it to a Twilio number, and you're ready to make your call!

![Twilio Studio](https://twilio-cms-prod.s3.amazonaws.com/images/Call-Widget-Studio.width-1600.png)

## Create a Voice Intelligence service in the Twilio console
Head to the Twilio console and navigate to [Voice Intelligence/Services](https://console.twilio.com/us1/develop/voice-intelligence/services). Create a new Service and give it a unique name.
All selections when creating a service are optional.

After your service is created, select any prebuilt language operators provided by Twilio and create any language operators you'd like to include.

*Make sure you setup your service to transcribe all recorded calls*

## Make a phone call and test your operator

Make a phone call and say a few words. It does help to think about a use case to help you pick your operators. Then find your transcript in the Voice Intelligence Console

## Stretch Goal

Setup a webhook or Twilio Function to handle the information from the transcript once you're finished



## Using the JavaScript API
This is a Node.js project. Feel free to follow the [docs](https://www.twilio.com/docs/voice/intelligence/key-concepts) to use your preferred programming language

Install the dependensies with this command in the root of the repository: 
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
