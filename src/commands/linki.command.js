const { MessageEmbed } = require("discord.js")
const { RichEmbed } = require("discord.js")


module.exports = {
    name: "linki",
    description: "Komenda pokazuje \nwszystkie linki związane z botem.",
    category: "<:Bot:828227204760469535> Bot",
    aliases: "",
    brakaliases: "(brak aliasów)",
    cooldown: 5,
    usage: "",
    przykladusage: "linki",
    guildOnly: false,


    run(msg) {
    const embed = new MessageEmbed()
    .setTitle("<a:tak:872387728027836456> Linki & Zaproszenia")
    .setDescription("<:tu:873253522060230716> Dodaj bota: [**(Tutaj)**](https://discord.com/oauth2/authorize?client_id=837679122800050217&permissions=8&scope=bot)\n<:tu:873253522060230716> Dołącz do Serwera Support: [**(Tutaj)**](https://discord.gg/HpnrjUCrpd)")
    .setColor(0x0d7dee)
    .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
    
    msg.channel.send(embed)
    }
}


//[(link)](https://discord.gg/HpnrjUCrpd)
