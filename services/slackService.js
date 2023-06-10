const { WebClient, LogLevel } = require("@slack/web-api");
const config = require("../utils/config");
const fetch = require("node-fetch");

const slackClient = new WebClient(config.SLACK_API_KEY);


const getConversationFromSlackChannel = async (channelId) => {
  let conversationPage;
  let result;
  let conversation = '';

  try {

  	// The maximum number of items to return is 100 by default
    result = await slackClient.conversations.history({
      channel: channelId,
      include_all_metadata : true
    });

    if(!result.ok) {
    	throw(result.error)
    }

    conversation = processPage(result.messages) + conversation;

    while(result.has_more) {

    	nextCursor = result.response_metadata.next_cursor;

    	result = await slackClient.conversations.history({
	      channel: channelId,
	      include_all_metadata : true,
	      cursor: nextCursor
	    });

	    if(!result.ok) {
	    	throw(result.error)
	    }

        // Page is actually sorted in descending order, so we need to append to the front.
    	conversation = processPage(result.messages) + conversation;
    }

	return conversation;

  } catch (err) {
  	console.error("An error occurred while attempting to obtain the conversation");
    throw(err);
  }
}

const processPage = (conversationPage) => {

    // Page is actually sorted in descending order, so we need to append to the front.
	conversation = ''

    for (let i = 0; i < conversationPage.length; i++) {
    	currentMessage = conversationPage[i]
    	if(currentMessage.type == "message" && !currentMessage.hidden) {
    		conversation = "Message: " + currentMessage.text + " " + conversation
    	}
    }

    return conversation
}

const sendNotificationToSlack = async (response, response_url) => {
  const data = {
    text: response,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    await fetch(response_url, options);
  } catch (err) {
    console.error("An error occurred while attempting to send a notification to Slack");
    throw(err);
  }
}

module.exports = {
	getConversationFromSlackChannel,
	sendNotificationToSlack
}