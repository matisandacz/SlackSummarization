require('dotenv').config()

const SLACK_API_KEY = process.env.SLACK_API_KEY
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPEN_AI_MODEL = "gpt-3.5-turbo"

module.exports = {
  SLACK_API_KEY,
  OPENAI_API_KEY,
  OPEN_AI_MODEL
}