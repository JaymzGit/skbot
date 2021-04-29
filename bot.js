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
