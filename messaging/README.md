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

   TODO add messaging service here
   Optional Have a WhatsApp Sender

3. Save the changes to the `.env` file

## Usage

### Look Up SMS Pumping Risk Score

1. Open the file and replace the number `"+44 0000 0000"` with the desired phone number you want to look up.
2. Run the code using the command `node scripts/lookup.js`. It will count the messages and calls from the specified phone number.
3. The result will be logged to the console.

For more details, refer to the Twilio Lookup API documentation at [Twilio Docs](https://www.twilio.com/docs/lookup/v2-api).
