const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ankieta",
    description: "Komenda tworzy ankietę z twoją treścią!",
    category: "<:practic:828556021751349289> Praktyczne",
    aliases: "",
    brakaliases: "(brak aliasów)",
    cooldown: 2,
    usage: "<treść>",
    przykladusage: "ankieta ModeBot jest najlepszy?",
    
     async run (msg, args, text, bot) {
      const { channel } = msg
      
        if (!msg.member.permissions.has(`MANAGE_CHANNELS`)) {
            const embed = new MessageEmbed()
            embed
                .setTitle(`<a:blad:872160063614255155> Błąd!`)
                .setColor(`RED`)
                .setDescription(`Nie posiadasz uprawnień!\nWymagane uprawnienia: **Zarządzanie kanałami**`)
                .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
            channel.send(embed);
        }
        else {
            if (!args[0]) {
                const embed = new MessageEmbed()
                    .setTitle(`<a:blad:872160063614255155> Błąd!`)
                    .setColor(0x0d7dee)
                    .setDescription(`Musisz coś napisać!`)
                    .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL())
            channel.send(embed);
            }
            else {
                msg.delete()
                let embed = new MessageEmbed()
                embed
                    .setTitle(`Ankieta!`)
                    .setColor(0x0d7dee)
                    .setDescription(args.splice(0).join(` `))
                    .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
            let msgEmbed = await channel.send(embed);
                    await msgEmbed.react(`:pluszielony:872186681061687306`)
                    await msgEmbed.react(`:slashzielony:872186721381519441`)
                    await msgEmbed.react(`:minuszielony:872186651303084032`)
                    
            }
        }
    }
}

