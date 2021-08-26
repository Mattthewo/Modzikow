const { MessageEmbed } = require("discord.js")
const {botName, botAuthor, botDescription, version} = require("../config/config");
const captchaSchema = require("../../schemas/captchaSchema");
module.exports = {
    name: "captcha",
    description: "Włącza lub wyłącza funkcje captcha na danym serwerze",
    aliases: ["cpt"],
    brakaliases: "",
    args: true, 
    category: "<:config:872539808411582534> Konfiguracyjne",
    usage: "<on || off>",
    cooldown: 5,
    przykladusage: "captcha on || off",
    guildOnly: false,
    async run(msg, args) {

    //   const defaultPrefix = ",";
    //   const prefixData = await prefixSchema.findOne({ guildID: msg.guild.id });
    //   let prefix;
    //   if (!prefixData) {
    //     prefix = defaultPrefix;
    //   } else {
    //     prefix = prefixData.prefix;
    //   }

        const { channel } = msg
 
       if(!msg.member.hasPermission('MANAGE_GUILD')) {
        const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("<a:blad:872160063614255155> Błąd")
          .setDescription("Nie posiadasz uprawnień! \nWymagane uprawnienia: **Zarządzanie serwerem**")
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
        return channel.send(embed)
       } else {
       const status = args[0];
           if (!status) {
        const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("<a:blad:872160063614255155> Błąd!")
          .setDescription(
            `Nie podałeś kategorii!\n\nUżyj \`,captcha <on | off> \``
          )
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
               return channel.send(embed)
    }
           if (status === "on") {

            const captchaData = await captchaSchema.findOne({
              guildID: msg.guild.id,
            });
            if (captchaData) {
              const embed = new MessageEmbed()
              .setColor("RED")
              .setTitle("<a:blad:872160063614255155> Błąd!")
              .setDescription("Wcześniej już ustawiałeś captche!")
              .setFooter(
                `${msg.author.tag}`,
                msg.author.displayAvatarURL( { dynamic: true }))
                return channel.send(embed)
            } 


            
    //   const newPrefix = args[1];
    //   if (!newPrefix) {
    //     const embed = new RichEmbed()
    //       .setColor("RED")
    //       .setTitle("<a:blad:872160063614255155> Błąd!")
    //       .setDescription(
    //         `Nie podałeś nowego prefixu!\n\nUżyj \`${prefix}prefix <set | reset> <nowy prefix>\``
    //       )
    //       .setFooter(
    //         `${msg.author.tag}`,
    //         msg.author.displayAvatarURL)
          
    //      return channel.send(embed);
        
       //} else {
      await captchaSchema.findOneAndUpdate(
        {
          guildID: msg.guild.id,
        },
        {
          status: "on",
        },
        {
          upsert: true,
        }
      );
      
       
        const embed1 = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("<a:tak:872387728027836456> Sukces!")
          .setDescription(`Pomyślnie włączono captche na serwerze **${msg.guild.name}**`)
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
          return channel.send(embed1)


      
       } else if (status === "off") {
       const captchaData = await captchaSchema.findOne({
        guildID: msg.guild.id,
      });
      if (!captchaData) {
          const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("<a:blad:872160063614255155> Błąd!")
            .setDescription("Wcześniej jeszcze nie ustawiałeś captchy!")
            .setFooter(
              `${msg.author.tag}`,
              msg.author.displayAvatarURL( { dynamic: true }))
              return channel.send(embed)

      } 
      

      await captchaSchema.findOneAndDelete({ guildID: msg.guild.id });
       const embed1 = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("<a:tak:872387728027836456> Sukces!")
          .setDescription(
            `Pomyślnie wyłączono captche na serwerze **${msg.guild.name}**`
          )
          .setFooter(
            `${msg.author.tag}`,
            msg.author.displayAvatarURL( { dynamic: true }))
            channel.send(embed1)
       } else {
       const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("<a:blad:872160063614255155> Błąd!")
            .setDescription(`Nie ma takiej kategorii!\n\nUżyj \`,captcha <on | off> \``)
            .setFooter(
              `${msg.author.tag}`,
              msg.author.displayAvatarURL( { dynamic: true }))
              return channel.send(embed)

       }
    }
}
}

