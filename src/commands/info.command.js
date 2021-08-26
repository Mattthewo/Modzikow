const { RichEmbed } = require("discord.js")
const {botName, botAuthor, botDescription, version} = require("../config/config");

module.exports = {
    name: "info",
    description: "Wyświetla informacje \no bocie i jego wersji \noraz twórcy!",
    aliases: ["data"],
    brakaliases: "",
    category: "<:Bot:828227204760469535> Bot",
    usage: "",
    cooldown: 5,
    przykladusage: "info",
    guildOnly: false,



    run(msg) {
        const {channel} = msg
        const embed = new RichEmbed()
        //Ustawienie tytułu embeda
        .setTitle(`${botName}`)
        //Ustawienia koloru embeda
        .setColor(0x0d7dee)
        //Ustawienia treści embedu
        .setDescription(`${botDescription}`)
        .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL)
        .addField('Autor', botAuthor, true)
        .addField('Wersja', version, true);
        channel.send(embed)
    }
}