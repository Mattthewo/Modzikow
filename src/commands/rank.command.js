// const fs = require("fs")
// const jsonfile = require("jsonfile")
// const { RichEmbed } = require("discord.js")
// module.exports = {
//     name: "rank",
//     description: "Komenda pokazuje \naktualny ping bota.",
//     category: "<:Bot:828227204760469535> Bot",
//     aliases: "",
//     brakaliases: "(brak aliasów)",
//     usage: "<osoba> (opcjonalne)",
//     guildOnly: true,
//     cooldown: 5,
//     przykladusage: "rank @Mathew",
//    run(msg) {
//     const {channel} = msg
//     var stats = {}
//     if (fs.existsSync('stats.json')) {
//       stats = jsonfile.readFileSync("stats.json")
//       const guildStats = stats[msg.guild.id]
//       const userStats = guildStats[msg.author.id]
//       const xpToNextLevel = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100
//       if (userStats.xp === null) {
//       const embed = new RichEmbed()
//      .setTitle(`${msg.author.username}`)
//      .setColor(0x0d7dee)
//      .setDescription(`${msg.author.username} nie ma żadnego lvl aby zdobyć xp napisz coś na czacie!`)
//       channel.send(embed)
//       } else {
//       const embed = new RichEmbed()
//      .setTitle(`${msg.author.username}`)
//      .setColor(0x0d7dee)
//      .setDescription(`${msg.author.username} masz teraz ${userStats.level} lvl oraz ${userStats.xp} xp\nXp potrzebne do następnego lvl'a: ${xpToNextLevel}`)
//       channel.send(embed)
//     }
       
//    }
// }
// }
// //hasło do mongodb: **698UBajpB9YqOobo**
