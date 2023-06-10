# SlackSummarization

# Slack Channel Summarizer

This repository contains an implementation that allows users to obtain a summary of an entire Slack channel conversation by using the `/summarize` slash command. The implementation leverages OpenAI's API for text summarization and supports conversations of arbitrary length.

## How it Works

When a user types the `/summarize` slash command in a Slack channel, the implementation retrieves the conversation history of that channel. It then sends the conversation text to OpenAI's API for summarization. The API processes the text and generates a concise summary of the conversation.

## Prerequisites

Before using this implementation, ensure that you have the following prerequisites:

1. **Slack API Token**: You need a Slack API token with the necessary permissions to read conversation history and post messages in the desired channels. Obtain the token from the Slack API website.

2. **OpenAI API Key**: You must have an OpenAI API key to make requests to the text summarization API. Get your API key by signing up for an account on the OpenAI website.

3. **Configure OpenAI Slash command**: You need to configure the slash command /summarize/ in your OpenAI app with the required permissions, and obtain a public HTTPS URL, for example with ngrok.


## Setup

Follow these steps to set up and run the Slack Channel Summarizer:

1. Clone this GitHub repository to your local machine.

2. Install the required dependencies by running the following command:
   ```
   npm install
   ```

3. Set the following environment variables in a .env file:

   - `SLACK_API_TOKEN`: Set this variable to your Slack API token.
   - `OPENAI_API_KEY`: Set this variable to your OpenAI API key.

4. Start the application by running the following command:
   ```
   npm run dev
   ```

## Usage

To obtain a summary of a Slack channel conversation, follow these steps:

1. Join the desired Slack channel where you want to summarize the conversation.

2. In the channel, type the `/summarize` slash command.

3. Wait for a moment while the application retrieves and processes the conversation history.

4. The application will post a message in the channel containing a summary of the conversation.

## Limitations

Please note the following limitations of the current implementation:

- The summarization quality depends on the accuracy and limitations of OpenAI's text summarization model.
- Very large conversations may take longer to process, depending on the length of the conversation and the available resources.
- The implementation may have rate limits imposed by the Slack API and OpenAI API. Ensure that you are aware of these limits to prevent any disruptions.

## Contributing

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, please submit a pull request or open an issue on the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).