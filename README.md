##ChatterBox

need these dependencies
node
dotenv
discord.js
openai

npm init -y  
npm install dotenv discord.js openai.  

First you need an OPENAI API key. Go to your OPENAI account and get your API key and place it in your .env file.  

![keys](pics/Screen Shot 2024-02-05 at 11.10.30 AM.png)

The part of this project that is not code involves building the bot setup on discord.  

Go to Discord.com/developers/applications and set your bot permissions.  

Then use their Auth2 tab to take your client ID and input it into the end of this string.  

https://discord.com/oauth2/authorize?scope=bot&permissions=8&client_id=YOURCLIENTID_HERE  

![add bot](pics/Screen Shot 2024-02-04 at 11.21.56 AM.png)

Once you see a popup with you logged in. You can see your servers that you want to add the bot to.  

Put your Discord bot token into your .env file. You should have your own API keys.  

then run 'node bot.js' in the directory to get the bot online.  

![add bot](pics/Screen Shot 2024-02-05 at 11.11.58 AM.png)

Then go in discord and you will see the bot online.  

![online](pics/Screen Shot 2024-02-05 at 11.31.31 AM.png)

type '/' then your question to talk to bot. ex "/what is the weather today bro?"

You should see 'typing' and then like magic the bot will respond.

Congratz you just made your first bot!

You can contact me justinb.developer@gmail.com if you need help.

Justin Bishop
