const { Client, MessageEmbed, Util } = require('discord.js')

const rr = require('../../schemas/reaction-role')


module.exports = {
    name: "rrclear",
    description: "Komenda czyści \npanel reaction roli.",
    category: "<:Bot:828227204760469535> Bot",
    aliases: "",
    brakaliases: "(brak aliasów)",
    cooldown: 2,
    usage: "",
    przykladusage: "ping",
    guildOnly: false,


    async run(msg, args, client) {

        if (!msg.member.permissions.has('MANAGE_ROLES')) {
            const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("<a:blad:872160063614255155> Błąd")
          .setDescription("Nie posiadasz uprawnień! \nWymagane uprawnienia: **Zarządzanie rolami**")
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
        return msg.channel.send(embed)
        }
   //const role = msg.mentions.roles.first()

   // let [, emoji] = args
    // if(!emoji) return msg.channel.send("Please specify a emoji")

    //const parsedEmoji = Util.parseEmoji(emoji)

    rr.findOne({ Guild: msg.guild.id }, async(err, data) => {
        if(data) {

            await rr.findOneAndDelete({ Guild: msg.guild.id }, data)
            const embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("<a:tak:872387728027836456> Sukces!")
          .setDescription(`Pomyślnie wyczyszczono panel!`)
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
        return msg.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("<a:blad:872160063614255155> Błąd")
          .setDescription(`Na tym serwerze jeszcze nie ma panelu!`)
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
        return msg.channel.send(embed)
        }
        
    })

    }
}
