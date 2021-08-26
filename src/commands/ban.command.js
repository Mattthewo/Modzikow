const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ban",
    description: "Banuje użytkownika",
    aliases: ["zbanuj"],
    brakaliases: "",
    category: "<:admin:827951551938953246> Administratorskie",
    usage: "@user <powód> opcionalnie",
    cooldown: 5,
    przykladusage: "ban @editBOT Ip logger",
    guildOnly: true,
     async run (msg, args, text, bot) {

        
         const { channel } = msg
         
        if (!msg.member.permissions.has(`BAN_MEMBERS`)) {
            const embed = new MessageEmbed()
                .setTitle(`<a:blad:872160063614255155> Błąd!`)
                .setColor(`RED`)
                .setDescription(`Nie posiadasz uprawnień!\n Wymagane uprawnienia: **Banowanie członków**`)
                .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
            channel.send(embed);
        }
        else {
            const wzmianka1 = msg.mentions.members.first()
            const wzmianka2 = msg.mentions.users.first()
            let powod = args.splice(1).join(` `)
            if (!wzmianka1) {
                const embed = new MessageEmbed()
                    .setTitle(`<a:blad:872160063614255155> Błąd!`)
                    .setColor(`RED`)
                    .setDescription(` Musisz oznaczyć osobę!`)
                    .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
                channel.send(embed);
            }
            else {
                if (!powod) {
                    let powod = ("Brak powodu")
                    const embed2 = new MessageEmbed()
                        embed2
                            .setTitle(`Ban!`)
                            .setColor(0x0d7dee)
                            .setDescription(`Zostałeś/aś zbanowany!`)
                            .addField(`Administrator:`, `${msg.author} (${msg.author.tag})`)
                            .addField(`Użytkownik:`, `${wzmianka2} (${wzmianka2.tag})`)
                            .addField(`Powód:`, `${powod}`)
                            .addField(`Serwer:`, `${msg.guild.name}`)
                            .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
                        wzmianka2.send(embed2)
                   wzmianka1.ban({ days: 0, reason: `${powod} - Administrator: ${msg.author.tag}` }).then(() => {
                        const embed1 = new MessageEmbed()
                            .setTitle(`<a:tak:872387728027836456> Sukces!`)
                            .setColor(0x0d7dee)
                            .setDescription(`Pomyślnie zbanowano użytkownika!`)
                            .addField(`Administrator:`, `${msg.author} (${msg.author.tag})`)
                            .addField(`Użytkownik:`, `${wzmianka2} (${wzmianka2.tag})`)
                            .addField(`Powód:`, `${powod}`)
                            .addField(`Serwer:`, `${msg.guild.name}`)
                            .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
                        return channel.send(embed1);
                        
                    })
                }
                else {
                    const embed2 = new MessageEmbed()
                        embed2
                            .setTitle(`Ban!`)
                            .setColor(0x0d7dee)
                            .setDescription(`Zostałeś/aś zbanowany!`)
                            .addField(`Administrator:`, `${msg.author} (${msg.author.tag})`)
                            .addField(`Użytkownik:`, `${wzmianka2} (${wzmianka2.tag})`)
                            .addField(`Powód:`, `${powod}`)
                            .addField(`Serwer:`, `${msg.guild.name}`)
                            .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
                        wzmianka2.send(embed2)
                    wzmianka1.ban({ days: 0, reason: `${powod} - Administrator: ${msg.author.tag}` }).then(() => {
                        const embed1 = new MessageEmbed()
                            .setTitle(`<a:tak:872387728027836456> Sukces!`)
                            .setColor(0x0d7dee)
                            .setDescription(`Pomyślnie zbanowano użytkownika!`)
                            .addField(`Administrator:`, `${msg.author} (${msg.author.tag})`)
                            .addField(`Użytkownik:`, `${wzmianka2} (${wzmianka2.tag})`)
                            .addField(`Powód:`, `${powod}`)
                            .addField(`Serwer:`, `${msg.guild.name}`)
                            .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
                        return channel.send(embed1);
                        
                    })
                }
            }
        }
    }
}
