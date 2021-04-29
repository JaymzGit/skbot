const TelegramBot = require('node-telegram-bot-api')

const token = '1774639882:AAGj5SDRK_GNG2gCym3YSSpGV7Z_9ib3yVM'

const bot = new TelegramBot(token, { polling: true })

bot.on('message', (msg) => {
    const chatId = msg.chat.id
    if (msg.text.toLowerCase() == 'iphone' || msg.text.toLowerCase() == 'dilepaskan' 
    || msg.text.toLowerCase() == '64gb' || msg.text.toLowerCase() == 'iphone') {
      bot.deleteMessage(chatId)
    }
  })
