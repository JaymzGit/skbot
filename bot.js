const TelegramBot = require('node-telegram-bot-api')

const token = 'TOKEN'

const bot = new TelegramBot(token, { polling: true })

const express = require('express');
const app = express();
const port = 3000;

bot.on('message', (msg) => {
    let chat_id = msg.chat.id;
    let message_id = msg.message_id;
    if (msg.text.toLowerCase().includes('dilepaskan') || msg.text.toLowerCase().includes('ansuran') || 
    msg.text.toLowerCase().includes('myset') ||msg.text.toLowerCase().includes('64gb')) {
      bot.deleteMessage(chat_id, message_id);
    }
  })

app.get('/', (req, res) => res.send('Bot is running!'));
  
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
