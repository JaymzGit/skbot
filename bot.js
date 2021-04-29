const TelegramBot = require('node-telegram-bot-api')

const token = 'TOKEN'

const bot = new TelegramBot(token, { polling: true })

bot.on('message', (msg) => {
    let chat_id = msg.chat.id;
    let message_id = msg.message_id;
    if (msg.text.toLowerCase() == 'iphone' || msg.text.toLowerCase() == 'dilepaskan' || msg.text.toLowerCase() == '64gb') {
      bot.deleteMessage(chat_id, message_id);
    }
  })

app.get('/', (req, res) => res.send('Bot is running!'));
  
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
