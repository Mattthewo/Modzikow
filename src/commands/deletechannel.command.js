const {  MessageEmbed } = require("discord.js")

module.exports = {
    name: "delchannel",
    description: "Komenda usuwa kanał \nna którym została wpisana.",
    category: "<:admin:827951551938953246> Administratorskie",
    aliases: ["delch"],
    brakaliases: "",
    cooldown: 5,
    usage: "",
    przykladusage: "delchannel",
    guildOnly: false,


    run(msg) {

        if(!msg.member.hasPermission('MANAGE_CHANNELS')) {
            const embed = new MessageEmbed()
              .setColor("RED")
              .setTitle("<a:blad:872160063614255155> Błąd")
              .setDescription("Nie posiadasz uprawnień! \nWymagane uprawnienia: **Zarządzanie kanałami**")
              .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
            return msg.channel.send(embed)
           } else {
            msg.channel.delete()
           }
    
    }
}
