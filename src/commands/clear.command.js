const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "clear",
    description: "Usuwa wiadomości \nna kanale.",
    args: true, 
    //,clear <liczba>
    usage: "<ilość wiadomości \n(2-100)>",
    category: "<:admin:827951551938953246> Administratorskie",
    guildOnly: true, 
    cooldown: 5,
    przykladusage: "clear 3",
    //synonim komendy
    aliases: ["usun"],
    brakaliases: "",

 run(msg, args) {
     const { channel } = msg
     const amount = parseInt(args[0])
     
     if (!msg.member.permissions.has(`MANAGE_MESSAGES`)) {
            const embed = new MessageEmbed()
            embed
                .setTitle(`<a:blad:872160063614255155> Błąd!`)
                .setColor(`RED`)
                .setDescription(`Nie posiadasz uprawnień!\nWymagane uprawnienia: **Zarządzanie wiadomościami**`)
                .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL)
           return channel.send(embed);
        } else {

     if (!Number.isInteger(amount)) {
        return channel.send("Musisz określić liczbę wiadomości do usunięcia!")
     }

     if (amount < 2 || amount > 100) {
     return channel.send("Ilość wiadomości do wyczyszczenia musi być większa niż 1 i mniejsza niż 100!")
     }
      channel.bulkDelete(amount)
    
      const embed = new MessageEmbed()
     .setTitle("<a:tak:872387728027836456> Wyczyszczono")
     .setColor(0x0d7dee)
     .setDescription(`**Administrator:**\n${msg.author}\n**Ilość wiadomości:**\n${amount}`)
     .setTimestamp()
            .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
      channel.send(embed).then(embed => {
      embed.delete({ timeout: 5000 })
      }
     )
      }
      }
}
    
