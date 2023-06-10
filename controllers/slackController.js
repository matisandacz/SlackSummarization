const slackRouter = require("express").Router();
const {
  getConversationFromSlackChannel,
  sendNotificationToSlack,
} = require("../services/slackService.js");
const { summarizeSlackConversation } = require("../services/openAIService.js");

slackRouter.post("/summarize", (request, response) => {
  getConversationSummary({
    slackResponseUrl: request.body.response_url,
    channelId: request.body.channel_id,
  });

  response.json("Request received. Conversation summary in progress.");
});

const getConversationSummary = async (payload) => {
  try {
    const slackConversation = await getConversationFromSlackChannel(
      payload.channelId
    );

    const slackConversationSummary = await summarizeSlackConversation(
      slackConversation
    );

    await sendNotificationToSlack(
      slackConversationSummary,
      payload.slackResponseUrl
    );
  } catch (err) {
    await sendNotificationToSlack(
      "An error occurred while attempting to generate the conversation summary",
      payload.slackResponseUrl
    );
  }
};


module.exports = slackRouter;


