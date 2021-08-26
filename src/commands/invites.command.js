const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "invites",
    description: "Komenda pokazuje \nile dana osoba \nma zaproszeń na serwer.",
    category: "<:practic:828556021751349289> Praktyczne",
    aliases: ["inv"],
    brakaliases: "",
    cooldown: 5,
    usage: "<@osoba>",
    guildOnly: true,
    przykladusage: "invites @Mathew",

    async run(msg, args) {
     let user = msg.mentions.users.first() || msg.author
     let invites = await msg.guild.fetchInvites()
     let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id)

     if(userInv.size <= 0) {
        const embed = new MessageEmbed()
        .setTitle("<a:blad:872160063614255155> Błąd!")
        .setDescription(`**${user.username}** nie utworzył jeszcze żadnego zaproszenia\nna tym serwerze lub jego zaproszenie wygasło/y!`)
       //  .addField("Invite Codes", invCodes)
        .setColor(0x0d7dee)
        .setTimestamp()
        .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
        return msg.channel.send(embed)
     }
     
     let invCodes = userInv.map(x => x.code).join("\n") //.length = 1
     let i = 0
     userInv.forEach(inv => i += inv.uses)


     const embed = new MessageEmbed()
     .setTitle(`Zaproszenia osoby ${user.username}`)
     .setDescription(`Ilość osób które weszły\nz zaproszeń **${user.tag}**\n${i}`)
    //  .addField("Invite Codes", invCodes)
     .setColor(0x0d7dee)
     .setTimestamp()
     .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
     msg.channel.send(embed)

    }
}
