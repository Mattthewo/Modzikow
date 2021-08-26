const { MessageEmbed } = require("discord.js")

const Discord = require("discord.js")

const {botName, botAuthor, botDescription, version} = require("../config/config");

module.exports = {
    name: "avatar",
    description: "Wyświetla informacje \no bocie i jego wersji \noraz twórcy!",
    aliases: ["av"],
    brakaliases: "",
    category: "<:Bot:828227204760469535> Bot",
    usage: "",
    cooldown: 5,
    przykladusage: "info",
    guildOnly: false,



    async run(msg) {

        let member = msg.mentions.users.first() || msg.author

       const embed = new MessageEmbed()
       .setTitle(`Awatar użytkownika ${member.tag}`)
       .setImage(member.displayAvatarURL( { dynamic: true }))
       .setColor(0x0d7dee)
       msg.channel.send(embed)
    }
}


//const userTarget = msg.mentions.users.first()
