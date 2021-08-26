const { Client, MessageEmbed, Util } = require('discord.js')

const rr = require('../../schemas/reaction-role')


const prefixSchema = require("../../schemas/prefixSchema");

module.exports = {
    name: "rradd",
    description: "Komenda pokazuje \naktualny ping bota.",
    category: "<:Bot:828227204760469535> Bot",
    aliases: "",
    brakaliases: "(brak aliasów)",
    cooldown: 2,
    usage: "",
    przykladusage: "ping",
    guildOnly: false,


    async run(msg, args, client) {

        const defaultPrefix = ",";
      const prefixData = await prefixSchema.findOne({ guildID: msg.guild.id });
      let prefix;
      if (!prefixData) {
        prefix = defaultPrefix;
      } else {
        prefix = prefixData.prefix;
      }

        if (!msg.member.permissions.has('MANAGE_ROLES')) {
            const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("<a:blad:872160063614255155> Błąd")
          .setDescription("Nie posiadasz uprawnień! \nWymagane uprawnienia: **Zarządzanie rolami**")
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
        return msg.channel.send(embed)
        }
    const role = msg.mentions.roles.first()

    let [, emoji] = args
    if(!emoji) {
            const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("<a:blad:872160063614255155> Błąd")
          .setDescription(`Nie podałeś wszystkich argumentów\n\nUżyj \`${prefix}rradd <@rola> <emoji>\``)
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
        return msg.channel.send(embed)
    }

    const parsedEmoji = Util.parseEmoji(emoji)

    rr.findOne({ Guild: msg.guild.id }, async(err, data) => {
        if(data) {
            data.Roles[parsedEmoji.name] = [
                role.id,
                {
                    id: parsedEmoji.id || parsedEmoji.name,
                    raw: emoji
                }
            ]

            await rr.findOneAndUpdate({ Guild: msg.guild.id }, data)
        } else {
            new rr({
                Guild: msg.guild.id,
                Message: 0,
                Roles: {
                    [parsedEmoji.name]: [
                        role.id,
                        {
                            id: parsedEmoji.id || parsedEmoji.name,
                            raw: emoji
                        }
                    ]
                }
            }).save()
        }
        const embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("<a:tak:872387728027836456> Sukces!")
          .setDescription(`Pomyślnie dodano rolę ${role} do ${emoji}\ni zapisano w panelu!`)
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
        return msg.channel.send(embed)
    })

    }
}
