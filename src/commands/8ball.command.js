const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "8ball",
    description: "8ball odpowie \nna każde twoje\npytanie!",
    aliases: "",
    brakaliases: "(brak aliasów)",
    guildOnly: true,
    category: "<:joy:828502678090154004> 4fun",
    usage: "<pytanie>",
    przykladusage: "8ball Czy bot \nModeBot jest \nnajlepszy ?",
     run(msg, args) {
        const { channel } = msg

        const answers = [
            'Zdecydowanie **tak**',
            'Zdecydowanie **nie**',
            '**Nie**, ale nie jestem pewny',
            '**Tak**, ale nie mogę tego obiecać',
            'Nie da się na to pytanie odpowiedzieć',
            'Znam odpowiedź, ale nie mogę jej zdradzić.',
            'To pytanie nigdy nie zostanie rozwiązane.',
            'A daj mi spokój!'
        ];
        

        const generator_liczb = answers[Math.floor(Math.random() * answers.length)];

        const pytanie = args.join(' ');

        const embed = new MessageEmbed()
        .setColor(0x0d7dee)
        .setAuthor("🎱 8ball")
        .setDescription(`**Pytanie:** **${pytanie}**\n`
            + ` \n`
            + ` **Odpowiedź:** \n${generator_liczb} \n`
        )
        .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
        channel.send(embed);

        
    }
}
