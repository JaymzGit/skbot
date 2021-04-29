const TelegramBot = require('node-telegram-bot-api')

const token = 'TOKEN'

const bot = new TelegramBot(token, { polling: true })

bot.on('message', (msg) => {
    const chatId = msg.chat.id
    if (msg.text.toLowerCase() == 'iphone' || msg.text.toLowerCase() == 'dilepaskan' 
    || msg.text.toLowerCase() == '64gb' || msg.text.toLowerCase() == 'iphone') {
      bot.deleteMessage(chatId)
    }
  })


  const express = require('express');
  const app = express();
  const port = 3000;
  
  app.get('/', (req, res) => res.send('Hello World!'));
  
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
