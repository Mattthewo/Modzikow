const Discord = require('discord.js');


const bot = new Discord.Client();

module.exports = {
    name: "ping",
    description: "Komenda pokazuje \naktualny ping bota.",
    category: "<:Bot:828227204760469535> Bot",
    aliases: "",
    brakaliases: "(brak aliasów)",
    cooldown: 2,
    usage: "",
    przykladusage: "ping",
    guildOnly: false,


    async run(msg, args, client) {
    
        //let choices = ["Is this really my ping", "Is it okay! I cant look", "I hope it isnt bad"]
        //let response = choices[Math.floor(Math.random() * choices.length)]

        const embedo = new Discord.MessageEmbed()
        .setTitle("Sukces")
        .setDescription(`Pong! 🏓 ${Date.now() -
            msg.createdTimestamp}ms`)
        .setColor(0x0d7dee)

        msg.channel.send(embedo)
    
    }
}
