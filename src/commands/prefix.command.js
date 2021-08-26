const { MessageEmbed } = require("discord.js")
const {botName, botAuthor, botDescription, version} = require("../config/config");
const prefixSchema = require("../../schemas/prefixSchema");
module.exports = {
    name: "prefix",
    description: "Zmienia prefix na taki\n jaki tylko chcesz",
    aliases: ["prfx"],
    brakaliases: "",
    args: true, 
    category: "<:config:872539808411582534> Konfiguracyjne",
    usage: "<set ! || reset>",
    cooldown: 5,
    przykladusage: "prefix ! || reset",
    guildOnly: false,
    async run(msg, args) {

      const defaultPrefix = ",";
      const prefixData = await prefixSchema.findOne({ guildID: msg.guild.id });
      let prefix;
      if (!prefixData) {
        prefix = defaultPrefix;
      } else {
        prefix = prefixData.prefix;
      }

        const { channel } = msg
 
       if(!msg.member.hasPermission('MANAGE_GUILD')) {
        const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("<a:blad:872160063614255155> Błąd")
          .setDescription("Nie posiadasz uprawnień! \nWymagane uprawnienia: **Zarządzanie serwerem**")
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
        return channel.send(embed)
       } else {
       const category = args[0];
           if (!category) {
        const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("<a:blad:872160063614255155> Błąd!")
          .setDescription(
            `Nie podałeś kategorii!\n\nUżyj \`${prefix}prefix <set | reset> <nowy prefix>\``
          )
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
               return channel.send(embed)
    }
           if (category === "set") {
      const newPrefix = args[1];
      if (!newPrefix) {
        const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("<a:blad:872160063614255155> Błąd!")
          .setDescription(
            `Nie podałeś nowego prefixu!\n\nUżyj \`${prefix}prefix <set | reset> <nowy prefix>\``
          )
          .setFooter(
            `${msg.author.tag}`,
            msg.author.displayAvatarURL({ dynamic: true }))
          
         return channel.send(embed);
        
      } else {
      await prefixSchema.findOneAndUpdate(
        {
          guildID: msg.guild.id,
        },
        {
          prefix: newPrefix,
        },
        {
          upsert: true,
        }
      );
      
       
        const embed1 = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("<a:tak:872387728027836456> Sukces!")
          .setDescription(`Pomyślnie ustawiono nowy prefix na \`${newPrefix}\``)
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
          return channel.send(embed1)


      }
       } else if (category === "reset") {
       const prefixData = await prefixSchema.findOne({
        guildID: msg.guild.id,
      });
      if (!prefixData) {
          const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("<a:blad:872160063614255155> Błąd!")
            .setDescription("Wcześniej jeszcze nie ustawiałeś prefixu!")
            .setFooter(
              `${msg.author.tag}`,
              msg.author.displayAvatarURL({ dynamic: true }))
              return channel.send(embed)

      }

      await prefixSchema.findOneAndDelete({ guildID: msg.guild.id });
       const embed1 = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("<a:tak:872387728027836456> Sukces!")
          .setDescription(
            "Pomyślnie zresetowano prefix bota. Teraz korzystasz z `,`"
          )
          .setFooter(
            `${msg.author.tag}`,
            msg.author.displayAvatarURL({ dynamic: true }))
            channel.send(embed1)
       } else {
       const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("<a:blad:872160063614255155> Błąd!")
            .setDescription(`Nie ma takiej kategorii!\n\nUżyj \`${prefix}prefix <set | reset> <nowy prefix>\``)
            .setFooter(
              `${msg.author.tag}`,
              msg.author.displayAvatarURL({ dynamic: true }))
              return channel.send(embed)

       }
    }
}
}
