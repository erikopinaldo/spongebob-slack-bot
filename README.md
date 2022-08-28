# Spongebob Meme Slack Bot
This is a bot that can be installed onto Slack workspaces. It is activated with a slash command in the message input field and your choice of input text. The bot then takes your input text (e.g. "This is some text") and sends out converted text (e.g. "tHiS iS SOMe TExT"). Here is some cultural/historical context for this meme: https://knowyourmeme.com/memes/mocking-spongebob

**Link to project:** https://spongebob-meme-slack-bot.netlify.app/

![alt tag](http://placecorgi.com/1200/650)

## How It's Made:

**Tech used:** JavaScript/Node

I started this project as a way to learn more about using Slack's APIs. As a result, the actual functionality of the bot is quite simple, with most of my effort being put into integrating the APIs. 

### Random capitalization logic

Let's start off with how an input string can be converted into the target output string with random capitalization, since this is pretty straightforward. The bot receives the input text after the Slack slash command is entered, maps through each character, and the same time generates a random number. Based on the number generated, we either return the character as it is, or we convert it to upper case. 

### Integrating with Slack APIs

1. Creating the Slack "app" entity and setting it up to use a slash command
    * Slack has a pretty simple process of creating an "app" entity on their platform, which can be done on https://api.slack.com/apps.
    * This app entity can be given certain features or scopes, with one of them being a slash command. I then used [Slack's documenation](https://api.slack.com/interactivity/slash-commands) as reference when implementing the slash command.
    * When a slash command is used in Slack, it sends a request to a request URL that you choose. This request's payload contains a bunch of information related to what was entered in Slack's message input field, as well as other contextual information such as user and team information. For my project, I needed to get the text that was entered along with the slash command (e.g. "This is some text").
    * The payload sent by a slash command also contains a `response_url`, which is a temporary webhook URL that can be used to generate message responses. You can send a POST request to this URL with the content of your desired message, which will then be posted as a Slack message in the conversation where the slash command was originally used. So in this case, I am sending my converted text (e.g. "tHiS iS SOMe TExT") along with my POST request.
2. Distributing the bot
    * By default, this app can be installed onto the workspace it is being developed on. However, it cannot be installed onto any other workspace. I needed to deploy its code and use Slack's oauth flow. This was definitely a learning experience for me and it took some time for me to understand it. I ended up using [this tutorial](https://tutorials.botsfloor.com/creating-a-slack-command-bot-from-scratch-with-node-js-distribute-it-25cf81f51040) that made things easier to understand. 
    * In short, this is what the oauth flow looks like:
      * We give users an install button on a front-facing website that is specific for the app, and has certain requested scopes associated with it. For my button, I included the `command` scope, and also the `team:read` scope. We will need the `team:read` scope later when redirecting users back to their workspace after a successful install.
      * The button is simply an anchor tag that sends user to https://slack.com/oauth/v2/authorize, with your app information included as parameters. This page then asks the userr if they want to allow the Slack app to access to their workspace.
      * Once the user accepts this prompt, our app's server receives a unique code. This code, along with our app's `client ID` and `client secret`, will need to be provided to Slack in order to complete the installation. 
      * We POST to https://slack.com/api/oauth.v2.access with the above information.
      * After successful authorization, we then make a second POST to https://slack.com/api/team.info to get the workspace URL for the user that installed the app. We finally redirect the user to `teamdomain.slack.com` so that they are not left hanging on the previous auth page.

## Lessons Learned:

No matter what your experience level, being an engineer means continuously learning. Every time you build something you always have those *whoa this is awesome* or *fuck yeah I did it!* moments. This is where you should share those moments! Recruiters and interviewers love to see that you're self-aware and passionate about growing.

## Examples:
Take a look at these couple examples that I have in my own portfolio:

**Palettable:** https://github.com/alecortega/palettable

**Twitter Battle:** https://github.com/alecortega/twitter-battle

**Patch Panel:** https://github.com/alecortega/patch-panel



