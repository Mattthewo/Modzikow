const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "serverinfo",
    description: "Informacje o twoim serwerze!",
    category: "<:practic:828556021751349289> Praktyczne",
    aliases: "",
    brakaliases: "(brak aliasów)",
    cooldown: 2,
    usage: "",
    przykladusage: "serverinfo",
   
    async run (msg, args, text, bot) {
    const { channel } = msg

    const serverIcon = msg.guild.iconURL
    
        const embed = new MessageEmbed()
            .setTitle(`Informacje o serverze`)
            .setColor(0x0d7dee)
            .setThumbnail(msg.guild.iconURL({ dynamic: true }))
            .addField(`Nazwa serwera `, `${msg.guild.name}`)
            .addField(`Liczba osób na serwerze`, `${msg.guild.memberCount}`)
            .addField(`Liczba osób online`, msg.guild.members.cache.filter(member => member.presence.status !== "offline").size)
            .addField(`Liczba kanałów`, `${msg.guild.channels.cache.size}`)
            .addField(`Właściciel serwera`, `${msg.guild.owner}`)
            .addField(`Lokalizacja serwera`, `${msg.guild.region}`)
            
           .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
        channel.send(embed)
    }
}

// message.guild.emojis.cache.size
