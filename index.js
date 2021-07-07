//Import required modules
require('dotenv').config();
const fs =  require('fs');
const readline = require('readline');
const TelegramBot = require('node-telegram-bot-api')

//Insert token here
const token = '1774639882:AAGj5SDRK_GNG2gCym3YSSpGV7Z_9ib3yVM';
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
            bot.sendMessage(chat_id,'Successfully added word ' + newword + ' to blacklist.');
		}else{
            bot.deleteMessage(chat_id, message_id);
			bot.sendMessage(message.chat.id, "You do not have permission to do that!");
		}
	});
});


bot.on('message', (msg) => {
  //Loads blacklist.txt words into arr
  let arr = readf();
  let chat_id = msg.chat.id;
  let message_id = msg.message_id;
  let arrayLength = arr.length;

	let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

  for (let i = 0; i < arrayLength; i++) {
	//Scan for blacklisted words in messages
    if (msg.text.toLowerCase().includes(arr[i])) {
        const alert = "[" + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + "] Message with '" + arr[i] + "' was removed.";
				console.log(alert);
				const deletedmessage = "[" + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + "]  \n" + msg.text;
        bot.deleteMessage(chat_id, message_id);
 				fs.appendFile('logs.txt', '\r\n'+deletedmessage+'\n', function (err) {
                if (err) throw err;
              });
        break;
    }
  }
}
)

//Return html respond
app.get('/', (req, res) => res.send('sk bot is online'));
  
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}\n`));
