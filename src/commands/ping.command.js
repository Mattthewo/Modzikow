module.exports = {
    name: "ping",
    description: "Komenda pokazuje \naktualny ping bota.",
    category: "<:Bot:828227204760469535> Bot",
    aliases: "",
    brakaliases: "(brak aliasów)",
    cooldown: 5,
    usage: "",
    przykladusage: "ping",
    guildOnly: false,


    run(msg) {
    msg.reply("Pong!")
    }
}
