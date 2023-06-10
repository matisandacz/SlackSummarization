const express = require("express");
const app = express();
const slackRouter = require('./controllers/slackController')

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use('/api/slack', slackRouter)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});













