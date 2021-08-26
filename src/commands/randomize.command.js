const { prefix } = require("../config/config")

const { RichEmbed } = require("discord.js")

module.exports = {
    name: "rand",
    description: "Komenda wybiera losowy numer \nktóry sam podasz!",
    category: "<:joy:828502678090154004> 4fun",
    aliases: "",
    brakaliases: "(brak aliasów)",
    cooldown: 5,
    usage: "<maxliczba> <minnumber>",
    przykladusage: "rand 10 5",
    guildOnly: true,


    run(msg, args, Discord) {

        const {channel} = msg

        if (!args.length || !args[1]) {
            msg.channel.send(`Musisz wprowadzić najmniejszą i największą cyfrę spośród których bot wygeneruje twoją losową liczbę \`${prefix}rand 10 5\``)
        } else {
            let max = args[0]
            let min = args[1]

            let randNo = Math.round(Math.random() * max * min) 

            const embed = new RichEmbed()
            .setTitle("Twoja losowa liczba to: ")
            .setDescription(randNo)
            .setColor(0x0d7dee)
            .setFooter("Random Number Generator")
            .setTimestamp()
            .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL)

          channel.send(embed)
        }
    }
    
}
