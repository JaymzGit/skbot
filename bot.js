//Import required modules
require('dotenv').config();
const fs =  require('fs');
const readline = require('readline');
const TelegramBot = require('node-telegram-bot-api')

//Insert token here
const token = 'TOKEN';
//Connect to Telegram servers(add proxy if you are in restricted countries like russia or iran or use System-wide proxy/VPN)
const bot = new TelegramBot(token, {polling: true});

//Connect bot with web
const express = require('express');
const app = express();
const port = 3000;

//Read blacklist.txt
function readf(){
    var array = fs.readFileSync('blacklist.txt', 'utf8').toString().replace(/\r\n/g,'\n').split('\n');
    return array;
}

//Responds to command "/add <word>"
bot.onText(/\/add (.+)/, (msg, match) => {
    let chat_id = msg.chat.id;
    let message_id = msg.message_id;
    //Checks and see if the message sender had adminstarator permissions in the group
    bot.getChatMember(msg.chat.id, msg.from.id).then(function(data) {
		if ((data.status == "creator") || (data.status == "administrator")){
            const newword = match[1];
            
	    //Append word to last line of the the file
            fs.appendFile('blacklist.txt', '\r\n'+newword, function (err) {
                if (err) throw err;
              });
            //Reads the Blacklist into arr again
            let arr = readf();
            //Remove the command and send a varification message
            bot.deleteMessage(chat_id, message_id);
            bot.sendMessage(chat_id,'added');
		}else{
            bot.deleteMessage(chat_id, message_id);
			bot.sendMessage(message.chat.id, "You are not Admin");
		}
	});
});


bot.on('message', (msg) => {
  //Loads blacklist.txt words into arr
  let arr = readf();
  let chat_id = msg.chat.id;
  let message_id = msg.message_id;
  let arrayLength = arr.length;
  for (let i = 0; i < arrayLength; i++) {
	//Scan for blacklisted words in messages
    if (msg.text.toLowerCase().includes(arr[i])) {
        console.log(arr[i]);
        bot.deleteMessage(chat_id, message_id);
        break;
    }
  }
}
)

//Return html respond
app.get('/', (req, res) => res.send('sk bot is online'));
  
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
