# Messaging Build Session

Introducing the "Messaging Build Session" repository, accompanying the dynamic and interactive session held during Signal London 2023! This repository serves as a comprehensive resource for developers seeking to enhance their messaging capabilities.

## Prerequisites

Before you can run this project, ensure that you have the following prerequisites:

- Node.js and npm installed on your machine.

- A Twilio account. If you don't have one, [sign up for free](https://www.twilio.com/try-twilio?utm_campaign=EVENT_SIGNAL_2023_OCT_13_SIGNAL_London_EMEA&utm_source=twilio&utm_medium=conference&utm_content=signallondon2023&utm_term=devevangel) at Twilio and obtain your account SID, API key, and API secret.

- Purchase a Phone Number in the Console

- Create a [messaging service](https://www.twilio.com/docs/messaging/services#create-a-messaging-service) and add the phone number to it

## Optional

- Create a [WhatsApp Sender](https://www.twilio.com/docs/whatsapp/self-sign-up) for your phone number

- [Add this sender](https://www.twilio.com/docs/messaging/services#using-whatsapp-with-messaging-services) to the messaging service as well

## Project Configuration

This project requires the usage of environment variables to configure certain services. To set up these variables, follow the steps below:

1. Copy the `sample.env` file and create a new file named `.env`.

2. Open the `.env` file and replace the placeholders with your actual [API keys](https://www.twilio.com/docs/glossary/what-is-an-api-key).

   ```
   TWILIO_ACCOUNT_SID="ACxxxxxx"
   TWILIO_API_KEY="xxxxxx"
   TWILIO_API_SECRET="xxxxxx"
   MESSAGING_SERVICE_SID="MGxxxxxx"
   ```

3. Save the changes to the `.env` file

## Usage

### Sending Messages with Shortened Links

This code enables you to send messages, requiring you to input the phone numbers for communication. Optionally, you can send WhatsApp messages if your messaging service is configured with a WhatsApp sender. For more advanced messaging capabilities, you can create a personalized content template using Twilio's content editor and implement it in this script. This script is your go-to tool for sending seamlessly integrated SMS or WhatsApp messages using Twilio's services. For more details, refer to the Twilio message resource and content editor documentation.

To run the code, use the command `node scripts/sendWithTwilio.js`.

### Looking Up SMS Pumping Risk Score

Use the Twilio Lookup API to retrieve information about a phone number. You need to provide the phone number you want to look up, and you have the option to request additional fields.

To run the code, use the command `node scripts/lookup.js`.

### Sending Messages with Shortened Links

This code demonstrates how to send messages with a shortened URL link. Start by entering the phone numbers for communication. Additionally, you must purchase a domain for shortening URLs and then connect this domain with your Message Service.

Next, upload the necessary credentials, including a certificate and private key. Finally, adjustthe Fallback and Callback URLs as necessary.

By completing these tasks, you can effectively utilize Twilio's messaging features for sending messages and tracking your marketing campaigns.

To run the code, use the command `node scripts/linkShortening.js`.

### Starting Server for Tracking Click Events

Start a server that will receive and track click events. You need to register the callback URL in the messaging service settings under "Link Shortening". This code uses Express.js to create the server and ngrok to expose the server to the internet. When a POST request is made to the server, it logs the track click event information and sends a JSON response. The code also logs the server port and ngrok URL for accessing the server. It provides documentation links for more information on tracking customer engagement with click events using Twilio.

To run the code, use the command `node scripts/linkShorteningTrackClicks.js`.