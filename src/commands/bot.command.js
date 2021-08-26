const Discord = require('discord.js');

 //const { Client, RichEmbed, Channel } = require('discord.js');

// module.exports = {
//     name: "ping",
//     description: "Komenda pokazuje \naktualny ping bota.",
//     category: "<:Bot:828227204760469535> Bot",
//     aliases: "",
//     brakaliases: "(brak aliasów)",
//     cooldown: 2,
//     usage: "",
//     przykladusage: "ping",
//     guildOnly: false,


//     async run(msg, args, client) {
//         const jooj = "Pinging..."
//     msg.channel.send(jooj).then(m => {
//         m.delete(jooj)
//         let ping = m.createdTimestamp - msg.createdTimestamp
//         //let choices = ["Is this really my ping", "Is it okay! I cant look", "I hope it isnt bad"]
//         //let response = choices[Math.floor(Math.random() * choices.length)]

//         const embedo = new Discord.RichEmbed()
//         .setTitle("Sukces")
//         .setDescription(`Pong! 🏓 ${ping}ms`)
//         .setColor(0x0d7dee)

//         m.channel.send(embedo)
//     })
//     }
// }


module.exports = {
    name: "bot",
    description: "Komenda pokazuje \ninformacje o bocie.",
         category: "<:Bot:828227204760469535> Bot",
         aliases: ["botinfo"],
         brakaliases: "",
         cooldown: 3,
         usage: "",
         przykladusage: "bot",
         guildOnly: false,

    async run(msg, args, client) {

        //const client = new Discord.Client();
         

        const statEmbed = new Discord.MessageEmbed()
            .setTitle(`**<a:tak:872387728027836456> Informacje o ${client.user.username}!**`)
            .setColor(0x0d7dee)
            .addField("<:serwery:873226269154738267> ・ **Serwery**", `\`${client.guilds.cache.size}/100\``, true)
            .addField("**<:osoba:873238045112016906> ・ Użytkownicy**", `\`${client.users.cache.size}\``, true)
            .addField("**<:kanaly:873238849998962758> ・ Kanały**", `\`${client.channels.cache.size}\``, true)
            .addField("**<:ram:873198052368859136> ・ Zużycie ramu**", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``, true)
            .addField("<:ping:873200867401162812> ・ Ping", `\`${Date.now() -
                msg.createdTimestamp}ms\``,true)

            
        msg.channel.send(statEmbed);


        // msg.channel.send(`Ping: ${Date.now() -
        //     msg.createdTimestamp}ms`)
    }
}
