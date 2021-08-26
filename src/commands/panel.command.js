const { Client, MessageEmbed, Util } = require('discord.js')

const rr = require('../../schemas/reaction-role')


module.exports = {
    name: "rrpanel",
    description: "Komenda pokazuje \naktualny ping bota.",
    category: "<:Bot:828227204760469535> Bot",
    aliases: "",
    brakaliases: "(brak aliasów)",
    cooldown: 2,
    usage: "",
    przykladusage: "ping",
    guildOnly: false,


    async run(msg, args, client) {

        if (!msg.member.permissions.has('MANAGE_ROLES')) {
            const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("<a:blad:872160063614255155> Błąd")
          .setDescription("Nie posiadasz uprawnień! \nWymagane uprawnienia: **Zarządzanie rolami**")
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
        return msg.channel.send(embed)
        }

        const channel = msg.mentions.channels.first() || msg.channel;

        rr.findOne({ Guild: msg.guild.id }, async(err, data) => {
            if(!data) {
                const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("<a:blad:872160063614255155> Błąd")
          .setDescription("Na tym serwerze nie utworzono jeszcze panelu!")
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
        return msg.channel.send(embed)
            }
            const mapped = Object.keys(data.Roles)
            .map((value, index) => {
                const role = msg.guild.roles.cache.get(data.Roles[value][0])
                return `**Reakcja:** ${data.Roles[value][1].raw}\n» Rola: ${role}`
            }).join("\n\n")

            channel.send(new MessageEmbed().setDescription(mapped).setColor(0x0d7dee)).then((msg) => {
               data.Message = msg.id
               data.save()

               const reactions = Object.values(data.Roles).map((val) => val[1].id)
               reactions.map((emoji) => msg.react(emoji))
            })
        })
    }
}
