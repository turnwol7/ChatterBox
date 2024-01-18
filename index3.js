require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const { OpenAI } = require('openai');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  permissions: 67584,
});

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

client.on('ready', () => {
  console.log('The bot is online!');
});

client.on('messageCreate', async (message) => {
  try {
    if (message.author.bot) return;
    
    // Check if the message starts with "/"
    if (message.content.startsWith('/')) {
      // Extract the user input after "/"
      const userInput = message.content.slice(1).trim();

      // Check if there's actual input after "/"
      if (userInput) {
        // Create a conversation log with the system message and user input
        const conversationLog = [
          { role: 'system', content: 'You are a friendly chatbot.' },
          { role: 'user', content: userInput },
        ];

        // Get the ChatGPT response
        const result = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: conversationLog,
          max_tokens: 100,
        });

        // Check if the response has valid content
        if (result.choices && result.choices[0] && result.choices[0].message) {
          // Reply with the ChatGPT response
          message.reply(result.choices[0].message.content);
        } else {
          console.error('Unexpected or empty response from OpenAI API:', result);
          message.reply('Error: Unexpected or empty response from OpenAI API');
        }
      } else {
        // If no input after "/", provide a prompt to the user
        message.reply("Please provide a question after '/' to initiate the ChatGPT response.");
      }
    }
  } catch (error) {
    console.error(`ERR: ${error}`);
    message.reply('An error occurred while processing your request. Please try again later.');
  }
});

client.login(process.env.DISCORD_TOKEN);