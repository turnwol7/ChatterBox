
require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  permissions: 67584,
});

//check if the bot is online
client.on('ready', () => {
  console.log('The bot is online!');
});

//connection to openai api
const OpenAI  = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

//check for when a message on discord is sent
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
 // if (message.channel.id !== process.env.CHANNEL_ID) return;
  if (message.content.startsWith('!')) return;

  //conversation log
  let conversationLog = [
    { role: 'system', content: 'You are a friendly chatbot.' },
  ];

  //get previous messages
  try {
    await message.channel.sendTyping();
    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages.reverse();
    
    //get previous messages
    prevMessages.forEach((msg) => {
      if (msg.content.startsWith('!')) return;
      if (msg.author.id !== client.user.id && message.author.bot) return;
      if (msg.author.id == client.user.id) {
        conversationLog.push({
          role: 'assistant',
          content: msg.content,
          name: msg.author.username
            .replace(/\s+/g, '_')
            .replace(/[^\w\s]/gi, ''),
        });
      }

      //user message
      if (msg.author.id == message.author.id) {
        conversationLog.push({
          role: 'user',
          content: msg.content,
          name: message.author.username
            .replace(/\s+/g, '_')
            .replace(/[^\w\s]/gi, ''),
        });
      }
    });

    //chat completion response
    const result = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
        max_tokens: 100, // limit token usage
      })
      .catch((error) => {
        console.log(`OPENAI ERR: ${error}`);
      });
    
    //log the response
    console.log(result.choices[0].message.content);
    //use discord to reply to the message input 
    message.reply(result.choices[0].message);
    console.log(result)
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
});

//login to discord
client.login(process.env.DISCORD_TOKEN);