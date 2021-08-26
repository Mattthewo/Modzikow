const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "embed",
    description: "Tworzy embed taki jaki zechcesz",
    aliases: ["embed-create"],
    brakaliases: "",
    category: "<:practic:828556021751349289> Praktyczne",
    usage: "",
    cooldown: 5,
    przykladusage: "embed #ll #FFFFFF|Witam|Pozdrawiam",
    guildOnly: true,



    async run(msg, args, Discord, client) {
        const embedChannel = msg.mentions.channels.first()

        if(!embedChannel) {
     msg.channel.send("Nie oznaczyłeś kanału embeda!")
      return
        }

        const content = args.slice(1).join(' ')

        //funkcje embeda 
        let embedColor = content.split('|')[0]
        if(!embedColor) {
            msg.channel.send("Nie podałeś koloru embeda!")
            return
        }

        let embedTitle = content.split('|')[1]
        if(!embedTitle) {
            msg.channel.send("Nie podałeś tytułu embeda!")
            return
        }

     let embedDescription = content.split('|')[2]
     if(!embedDescription) {
         msg.channel.send("Nie podałeś treści embeda!")
        return

     }
    //finalne tworzenie embeda
     let embed = new MessageEmbed()
     .setColor(embedColor)
     .setTitle(embedTitle)
     .setDescription(embedDescription)
     .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))

     embedChannel.send(embed)

    }
}
