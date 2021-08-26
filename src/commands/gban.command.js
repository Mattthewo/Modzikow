const { MessageEmbed } = require("discord.js")
const gban = require('../../schemas/gbanSchema')
module.exports = {
name: "gban",
  description: "Ban na używanie bota (Komenda tylko dla\ndeveloperów bota)",
  usage: "@user <powód>",
//////////////
        category: "<:dev:872526712766873660> Developerskie",
    guildOnly: false, 
    cooldown: 5,
    przykladusage: "gban <@816624614762610708> Niszczenie bota",
    //synonim komendy
    aliases: ["global-ban"],
    brakaliases: "",
  async run (msg, args, text, bot, client) {
         const { channel } = msg
         if (!["786146744622776360", "548536308079788033"].includes(msg.author.id)) {

        const embed = new MessageEmbed()
          .setTitle(`<a:blad:872160063614255155> Błąd!`)
          .setColor(`RED`)
          .setDescription('Nie masz uprawnień do gbanowania')
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
         return channel.send(embed);
        }

        const userTarget = msg.mentions.users.first()
        if(!userTarget) {
          const embed = new MessageEmbed()
          .setTitle(`<a:blad:872160063614255155> Błąd!`)
          .setColor(`RED`)
          .setDescription('Podałeś nieprawidłowego użytkownika')
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
         return channel.send(embed);
        
        }

        const reason = args.slice(1).join(' ');
        if(!reason) {

          const embed = new MessageEmbed()
          .setTitle(`<a:blad:872160063614255155> Błąd!`)
          .setColor(`RED`)
          .setDescription('Nie podałeś powodu')
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
         return channel.send(embed);
        }

        const date = Date.now()

         //console.log(date)

        new Date(date)
    
        const moderatorID = msg.author.id

        if (!["786146744622776360", "548536308079788033"].includes(msg.author.id)) {

        const embed = new MessageEmbed()
          .setTitle(`<a:blad:872160063614255155> Błąd!`)
          .setColor(`RED`)
          .setDescription('Nie masz uprawnień do gbanowania')
          .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL( { dynamic: true }))
         return channel.send(embed);
        }

        const loloData = await gban.findOne({
          userID: userTarget.id,
        // moderatorID: moderatorID,
      //   reason: reason,
      //   date: new Date(date)
        });
        if (loloData) {
            const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("<a:blad:872160063614255155> Błąd!")
          .setDescription("Ten użytkownik ma już gbana w bazie danych!")
          .setFooter(
            `${msg.author.tag}`,
            msg.author.displayAvatarURL( { dynamic: true }))
            return channel.send(embed)
        }

        gban.create({ 
          userID: userTarget.id,
          moderatorID: moderatorID,
          reason: reason,
          date: new Date(date)
         }).then(profile => profile.save)
         const embed1 = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("<a:tak:872387728027836456> Udało się!")
          .setDescription(
            `Udało się nadać gbana osobie ${userTarget}`
          )
          .setFooter(
            `${msg.author.tag}`,
            msg.author.displayAvatarURL( { dynamic: true }))
            channel.send(embed1)

         
         }

     
}
