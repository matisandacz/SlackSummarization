const config = require("../utils/config");
const tiktoken = require("tiktoken-node");
const {
    Configuration,
    OpenAIApi,
    openai
} = require("openai");

const enc = tiktoken.encodingForModel(config.OPEN_AI_MODEL);
const openaiconfig = new Configuration({
    apiKey: config.OPENAI_API_KEY
});
const openaiClient = new OpenAIApi(openaiconfig);

const summarizeSlackConversation = async (slackConversation) => {
    slackConversationChunks = splitConversationIntoChunks(slackConversation);

    try {

        let conversationChunkSummaries = [];
        let conversationSummary;

        for (let i = 0; i < slackConversationChunks.length; i++) {

            let payload = {
                "systemMessage": "Your job is to summarize a conversation.",
                "prompt": slackConversationChunks[i]
            }

            conversationSummary = await callOpenAIApi(payload);

            conversationChunkSummaries.push(conversationSummary);
        }

        // Consolidate the Meeting Transcript Summaries
        if (slackConversationChunks.length > 1) {

            let payload = {
                "systemMessage": "Consolidate these conversation summaries:",
                "prompt": conversationChunkSummaries.join()
            }

            conversationSummary = await callOpenAIApi(payload);
        }

        return conversationSummary;
    } catch (err) {
        console.error("An error occurred while attempting to summarize the conversation");
        throw (err);
    }
};

const callOpenAIApi = async (payload) => {
    conversationChunkSummary = await openaiClient.createChatCompletion({
        model: config.OPEN_AI_MODEL,
        messages: [{
                role: "system",
                content: payload.systemMessage
            },
            {
                role: "user",
                content: payload.prompt
            },
        ],
    });

    return conversationChunkSummary.data.choices[0].message.content;
};

const splitConversationIntoChunks = (slackConversation) => {
    const slackConversationTokens = enc.encode(slackConversation);

    const tokenChunks = chunkTokens(slackConversationTokens);

    return decodeTokenChunks(tokenChunks);
};

/*
Breaks up a given array of tokens into smaller chunks.
*/
function chunkTokens(slackConversationTokens, chunkSize = 2000, overlapSize = 100) {
    const tokenChunks = [];

    for ( let i = 0; i < slackConversationTokens.length; i += chunkSize - overlapSize) {
        const subarray = slackConversationTokens.slice(i, i + chunkSize);
        tokenChunks.push(subarray);
    }

    return tokenChunks;
}

function decodeTokenChunks(tokenChunks) {
    const slackConversationChunks = [];

    for (let i = 0; i < tokenChunks.length; i++) {
        slackConversationChunks.push(enc.decode(tokenChunks[i]));
    }

    return slackConversationChunks;
}

module.exports = {
    summarizeSlackConversation,
};
