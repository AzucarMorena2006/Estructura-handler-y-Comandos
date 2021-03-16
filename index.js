const Discord = require('discord.js')
const client = new Discord.Client();
const fs = require('fs')
const { token,prefix } = require('./config.json')

client.on('ready', () => {
    console.log('Bot Listo!')
})

client.commands = new Discord.Collection();
const commandFile = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));
for (const file of commandFile){
    const command = require(`./comandos/${file}`);
    console.log(`Ya esta listo ${file}!`)
    client.commands.set(command.name, command)
}

client.on('message', async message => {
    if(!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
  if(cmd){
      cmd.run(client, message, args)
  }
})

client.login(token)