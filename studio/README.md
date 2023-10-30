# Twilio Studio Build Session

Hello, welcome to the Twilio Studio Build Session at SIGNAL London 2023.

If you follow this at SIGNAL or in your own time afterwards, you'll learn:
 - What Studio is, what it's for, what a Flow is,
 - How to extend the functionality of Studio with your own code, using Twilio Functions or any other hosting,
 - How to test, deploy, debug and monitor with Studio.

As a neat side-effect you'll learn about the WhatsApp sandbox too.

You'll need a [Twilio account](https://twilio.com/try-twilio) and we'll take it from there.

## Studio

> Twilio Studio is a visual low-code/no-code tool that enables anyone to design, deploy, and scale customer communications.

(from the [Studio User Guide](https://www.twilio.com/docs/studio/user-guide)).

The [Studio Glossary](https://www.twilio.com/docs/studio/user-guide/get-started#glossary) is very helpful in making sure we know what we're talking about when we're talking about Studio.

If you're already comfortable writing code, you might be wondering what extra Studio can give you. Here's a few reasons why I reach for Studio, from a developer perspective:
 - I don't have to even _think_ about hosting or scaling
 - Studio handles concurrent executions safely, even during changes to the flow,
 - There's built-in widgets for lots of Twilio APIs
 - I can always call out to code for complex tasks from a Studio Flow
 - Studio handles multi-step voice and messaging flows natively. No need to build a state machine from scratch.
 - Enough helpful debugging and logging that I don't miss my dev tools.

 ## Let's get it started

### Phase 1 :: Ahoy World!

Goal: Have a Studio Flow respond to a WhatsApp message with "Ahoy!" (we're starting small but mighty)

[Create a new Studio Flow](https://www.twilio.com/docs/studio/user-guide/get-started#create-a-flow), choosing "Start from scratch" when prompted.

You're now looking at a blank Studio canvas. Check out the list of available Widgets on the right - you're looking for "Send Message". Create a new Send Message widget in your flow by dragging it into the canvas. Feel free to give it a better name than `send_message_1`, but note that there are some restrictions on what characters can go in a widget name. Imagine them to be like variable names and you won't go wrong, we'll see why that is later. Put "Ahoy!" (or anything else) in the Message Body field on the right and Save the widget config.

All flow executions start in the red Trigger widget at the top. Drag the connector for "Incoming Message" to the dot in the top corner of your Send Message widget.

It looks like you're done with the flow, but there's one more step - the big red Publish button at the top of the canvas. When you publish changes to a flow, new executions are sent to the new version without disrupting people who were halfway through the old flow. Graceful upgrades, no problem. Publish now.

> Note: You can [test a draft flow](https://www.twilio.com/docs/studio/user-guide#testing-draft-flows) without publishing. Feel free to experiment.

#### Side Quest: The Twilio Sandbox for WhatsApp

To connect the flow to WhatsApp for testing, we'll use the [WhatsApp Sandbox](https://www.twilio.com/docs/whatsapp/sandbox). Follow the instructions there as far as sending the `join <your-sandbox-keyord>` section, then jump down to the [Reply to Incoming Messages](https://www.twilio.com/docs/whatsapp/sandbox#reply-to-incoming-messages-with-the-twilio-sandbox) section. That shows how to use a custom URL as a webhook for incoming messages. You can find the webhook URL of your flow if you click on the Trigger widget.

Side-quest complete - you can send a Hello to the WhatsApp Sandbox number and get back a cheerful Ahoy!

todo: image.

### Phase 2 :: Personalisation

Goal: The more you know about your customer and their needs, the better experience you'll be able to give them. Let's add a personal touch to the flow.

Every widget in an an execution carries data which can be queried by widgets later in the flow. We'll see lots of examples later, but for now consider the Trigger widget - it holds data about the incoming message including the body, the senders number and so on.

We'll take the sender's number, look it up in our "customer database" and get back some data about them to make the conversation personal and helpful.

Add a Make HTTP Request widget between the Trigger and Send Message. In the config for the HTTP widget, use [this URL](https://studio-signal-london-2023-6260.twil.io/phase_2) (you can load it in your browser too). Add an HTTP parameter, the `Key` needs to be `From` and in the `Value` field type `{{`. You'll see a drop down of every bit of data that this widget can read from the current execution. There's a lot there, and the one you're looking for is `trigger.message.From`.  Save the parameter, _and_ the widget config.

To personalise the Send Message widget, change the text from `Ahoy!` to `Ahoy {{widgets.http_1.parsed.name}}!`. You'll get completion up to `parsed`.

> Note: The "customer database" we're using is a [Twilio Function](https://www.twilio.com/docs/serverless/functions-assets/functions). So why don't we use the "Run Function" widget? Good question - it's because the function is not yours (it's mine). If you want to customise it you are welcome to, the code is [here (TODO!)]() and you're very welcome to use it.
>
> It would be very preferable to use Run Function here if we had more time, because my function is publicly available to anyone with an internet connection but Studio will sign requests so you can use [Protected visibility](https://www.twilio.com/docs/serverless/functions-assets/visibility#protected) to keep your customer data secure.

Save everything and publish again, then say Hello to your new personalised flow.

#### Optional Side Quest: Multi-language support

You now know enough to make a multilingual WhatsApp bot. If you deploy your own copy of the function, you could include in the response localised messages used by all subsequent widgets. A couple of hints if you want to try this:
 - You can call the [Lookup API](https://www.twilio.com/docs/lookup) from the function to tell what country a phone number is from.
 - You can store each language's messages as [Function Assets](https://www.twilio.com/docs/serverless/functions-assets/assets), keeping your translation workflow outside of the code.

Learn how Twilio delivery partner [Zing](https://zing.dev/) scaled this approach to over 1 million WhatsApp messages a day in [this interview from SIGNAL 2022](https://twitch.tv/videos/1642341073).

### Phase 3 :: Back-and-Forth messaging, with branches

Goal: Explore studio and make your flow bigger and better

Now that you're familiar with the layout of the Studio canvas and the save/publish loop I'll drop the super-detailed instructions.

You might have noticed that as well as the customer's name, the function returns details of any open orders they have with partycookies.store. In particular `orders.open_order_count` is always present in the response, and if that's greater than zero you will also get a summary in `orders.open_orders_summary`.

Change the flow so that if they have an open order you ask them if that's what they're messaging about. Some ideas to help:
 - The [Split Based On...](https://www.twilio.com/docs/studio/widget-library/split-based-on) widget can put branches in your flow.
 - The [Send & Wait For Reply](https://www.twilio.com/docs/studio/widget-library/send-wait-reply) widget does exactly what it sounds like. Use this to ask if they're messaging about their open order or not (and "Split Based On" the reply).
 - As a valued partycookies.store customer, would you prefer to read "Are you messaging about your open order?" or "Are you messaging about the ten peanut butter cookies you ordered last Thursday?"
 - Calling out to an LLM like ChatGPT is a really powerful way to categorize and summarize a message's intent.

You can take this as far as you like during today's build session, we're here to help if you need it. But there is one more topic I want to cover:

### Phase 4 :: Debugging and Logging

No runtime platform sparks joy unless it includes a way to help pinpoint errors and monitor usage. Studio has great solutions for both.

#### Debugging Your Flow

Over to the left of the Studio canvas is a menu which offers an enticing "Logs" option. In here you can find details of each execution of your flow. Click through on any of the executions to see a huge amount of detail about each of the Steps in the flow, and the Flow Data tab shows exactly what data each widget producted (privacy-minded folks [read this](https://www.twilio.com/docs/studio/user-guide#data-retention-in-studio)).

This is invaluable if your flow doesn't work like you think it should while you're testing it. You can trace through every step and see where it didn't match your expectation.

> Hint: large flows can generate a _lot_ of Flow Data. Use the [Set Variables Widget](https://www.twilio.com/docs/studio/widget-library/set-variables) to group important data and give meaningful names.

#### Logging and Monitoring

You might well be interested in keeping track of how often your flow is used, which paths are commonly taken, whether people drop off mid-conversation and if so, where?

Studio certainly has a [REST API](https://www.twilio.com/docs/studio/rest-api/v2), but this is best used for things like deploying a new flow - you can import and export flows as JSON and keep them in source control for example. It's definitely *not* recommended to poll this API for usage statistics, nor is it a great idea to use the HTTP Request widget to push this kind of data out. We have a much better solution: [Event Streams](https://www.twilio.com/docs/events).

You can use Event Streams to listen for executions at the flow and widget level.

To test this out today, we can use a Webhook Event Sink. For extra credit, look through the [Segment Build Session notes](https://github.com/nokenwa/twilio-signal-london-23-build-projects/tree/main/segment#segment-build-session) and you can use that as a Sink instead.

You'll need a URL to use as your Event Sink. For testing I like to use [webhook.site](https://webhook.site) - grab a webhook URL from there and head to the [Event Streams Manager](https://console.twilio.com/us1/develop/event-streams/sinks) in your Twilio console.

First create the Webhook Sink to point at your webhook.site URL, then create a Subscription which uses that sink for all the Studio event types. Once you've saved all that you can test your flow again and watch the details roll in. You can find notes about data retention of Event Streams [here](https://www.twilio.com/docs/events#logging-and-retention). Don't use webhook.site once you're in production, please.

## What now?

This session has barely scratched the surface of what Studio can do - here's some interesting things we didn't touch on:

 - Using Studio to handle Voice calls
 - [Subflows](https://www.twilio.com/docs/studio/subflows)
 - Sending an execution to Flex, for when you've detected that the caller needs human assistance
 - Connecting to a [Google Dialogflow CX Agent](https://cloud.google.com/dialogflow/cx/docs/concept/agent) using the [Connect Virtual Agent](https://www.twilio.com/docs/studio/widget-library/connect-virtual-agent) widget.
 - TODO: more extensions

Thanks for coming - I can't wait to see what you build with Studio!
