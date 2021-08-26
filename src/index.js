const { Client, MessageEmbed, Channel } = require('discord.js');
const chalk = require("chalk");
const WOKCommands = require("wokcommands")
const random = require("random")
const fs = require("fs")

const jsonfile = require("jsonfile")
const mongoose = require("mongoose")
const {token, version, user, botName, prefix} = require("./config/config.js");
const commandHandler = require("./handlers/command.handler")
const { columnDependencies } = require('mathjs');
const client = new Client({partials: ['MESSAGE',  'CHANNEL,', 'REACTION' ] });
const fetch = require('node-fetch')

const captchaSchema = require("./../schemas/captchaSchema");

const prefixSchema = require("./../schemas/prefixSchema.js");

const rr = require("./../schemas/reaction-role");


var stats = {}
if (fs.existsSync('stats.json')) {
  stats = jsonfile.readFileSync("stats.json")
}

//Zainicjuj obsługę poleceń
commandHandler(client)
//logi w konsoli
client.on('ready', async () => {
  console.log(chalk.green(`Witaj ${user}`))
  console.log(chalk.yellowBright('Zaczynasz zabawę Mode Botem botem rekreacyjnym spółki {Nazwa}'))
  console.log(chalk.green(`Zalogowano jako ${client.user.tag} aktualny prefix to ${prefix}`))
  console.log(chalk.blue(`Nazwa Bota: ModeBot`))
  console.log(chalk.blue(`Wersja Bota: 1.2.0`))
  console.log(chalk.blue('Nazwa serwera: {Nazwa}'))
  
  mongoose.connect('mongodb+srv://matthew:mH8m4WQDjQzzNJ5@modebotcluster.whvnl.mongodb.net/Noisy?retryWrites=true&w=majority',
                   { useNewUrlParser: true },
                   { useUnifiedTopology: true })            
  .then(() => {
  console.log('Połączono z Mongo')
  })
.catch((err) => {
console.log(err)
})  




   client.user.setActivity("🔗 @ModeBot | 2.0", {
   type: "PLAYING",
   //url: "https://www.twitch.tv/mode_bot_pl"
   })
})
  
client.on('message', async (msg) => {

  if (msg.author.bot || msg.channel.type === "dm") return

  const defaultPrefix = ",";
  const prefixData = await prefixSchema.findOne({ guildID: msg.guild.id });
  let prefix;
  if (!prefixData) {
    prefix = defaultPrefix;
  } else {
    prefix = prefixData.prefix;
  }

  if (msg.content == `${prefix}serwery`) {

    if (["786146744622776360", "548536308079788033"].includes(msg.author.id)) {

    client.guilds.cache.forEach((guild) => {
      const { channel } = msg
      // .setAuthor("Serwery:", client.user.displayAvatarURL)
      // .addField("Nazwa", guild.name)
      // .addField("Id", guild.id)
      // .addField("Ilość osób", guild.memberCount)
      // .setColor(0x0d7dee);
      channel.send(`**Nazwa:** ${guild.name} **Id:** ${guild.id} **Ilość osób:** ${guild.memberCount} **Właściciel ID:** ${guild.owner.id}`);
  // channel.send(`Id ${guild.id}`);
  // channel.send(`Ilość osób ${guild.memberCount}`);

  

    // console.log(guild.name)
    // console.log(guild.id)
    // console.log(guild.memberCount)

    })
    } else {
      return
    }
      
    
}


  
if (msg.content == `<@${client.user.id}>`) {
  const embed = new MessageEmbed()
  
       .setAuthor("Ktoś mnie oznaczył?", client.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`Mój prefix na tym serwerze: **${prefix}**\n Mój globalny prefix: **,**\nWszystkie komendy znajdziesz pod komendą: **${prefix}help**`)
       .setColor(0x0d7dee);
  msg.channel.send(embed);
}
  



  if (msg.content == `<@!${client.user.id}>`) {
    const embed = new MessageEmbed()
        .setAuthor("Ktoś mnie oznaczył?", client.user.displayAvatarURL({ dynamic: true }))
         .setDescription(`Mój prefix na tym serwerze: **${prefix}**\n Mój globalny prefix: **,**\nWszystkie komendy znajdziesz pod komendą: **${prefix}help**`)
         .setColor(0x0d7dee);
    msg.channel.send(embed);
}

  //gban checker
  const userSchema = require('./../schemas/gbanSchema')
  
  const userID = msg.author.id
  const gbanResults = await userSchema.findOne({ userID })
  
  if (gbanResults) {
//  msg.channel.send(`Jesteś globalnie zbanowany!\n\nPowód: ${gbanResults.reason}\nData: ${gbanResults.date}\nModerator: ${gbanResults.moderatorID}`)
 return
  }
  
  if(msg.author.bot) return
  if (!msg.guild) return
  
  
//   if (msg.guild.id in stats === false) {
//     stats[msg.guild.id] = {}
//     }
//     const guildStats = stats[msg.guild.id]
//  if (msg.author.id in guildStats === false) {
//    guildStats[msg.author.id] = {
//    xp: 0,
//    level: 0,
//    last_msg: 0
//   }
//  }
//  const userStats = guildStats[msg.author.id]
//  if (Date.now() - userStats.last_msg > 30000) {
//  const userStats = guildStats[msg.author.id]
//  userStats.xp += random.int(15, 25)
//  userStats.last_msg = Date.now()
//  const xpToNextLevel = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100
//  if (userStats.xp >= xpToNextLevel) {
//    userStats.level++
//    userStats.xp = userStats.xp - xpToNextLevel
//    msg.channel.send(' Gratulacje ' + msg.author.toString() + " właśnie awansowałeś(-aś) do poziomu " + userStats.level + '!')
//  }
//  jsonfile.writeFileSync("stats.json", stats)
//  console.log(msg.author.tag + ' ma teraz ' + userStats.xp)
//  console.log(xpToNextLevel + " Xp potrzebne do następnego lvl'a ")
//  }
      
})



client.on('guildMemberAdd', async (member) => {

 
   
      
  //sprawdzanie czy użytkownik to nie bot i czy wiadomość jest napisana na guild
   
  const captchaData = await captchaSchema.findOne({
    guildID: member.guild.id,
    status: "on"
  });
  if (!captchaData) {
      // const embed = new RichEmbed()
      //   .setColor("RED")
      //   .setTitle("<a:blad:872160063614255155> Błąd!")
      //   .setDescription("Wcześniej jeszcze nie ustawiałeś captchy!")
      //   .setFooter(
      //     `${msg.author.tag}`,
      //     msg.author.displayAvatarURL)
      //     return channel.send(embed)
    return 
  }

  //if(db.has(`captcha-${member.guild.id}`)=== false) return;
  const url = 'https://api.no-api-key.com/api/v2/captcha';
      try {
          fetch(url)
              .then(res => res.json())
              .then(async json => {
                  console.log(json)
                  const msg = await member.send(
                      new MessageEmbed()
                          .setTitle('Wykonaj captche aby się zweryfikować!')
                          .setDescription("Uwaga jeśli źle odpowiesz na captche zostaniesz wyrzucony z serwera!")
                          .setImage(json.captcha)
                          .setColor(0x0d7dee)
                  )
                  try {
                      const filter = (m) => {
                          if(m.author.bot) return;
                          if(m.author.id === member.id && m.content === json.captcha_text) {
                            const embedo = new MessageEmbed()
                            .setTitle("<a:tak:872387728027836456> Sukces!")
                            .setColor("GREEN")
                            .setDescription("Gratulacje odpowiedziałeś poprawnie na captche!")
                            // .setFooter(`${member.author.tag}`, member.author.displayAvatarURL)
                            return msg.channel.send(embedo)
                          } //return true;
                          else {
                            const embodo = new MessageEmbed()
                            .setTitle("<a:blad:872160063614255155> Błąd!")
                            .setColor("RED")
                            .setDescription(`Źle odpowiedziałeś na captche!\nZostałeś wyrzucony z serwera **${member.guild.name}** za złe wykonanie captchy!`)
                              msg.channel.send(embodo)
                              return member.kick()   
                          } 
                      };
                      const response = await msg.channel.awaitMessages(filter, {
                          max : 1,
                          time : 20000,
                          errors : ['time']
                      })
                      // if(response) {
                      //     msg.channel.send('Gratulacje odpowiedziałeś poprawnie na captche!')
                      // }
                  } catch (error) {

                    const embodor = new MessageEmbed()
                            .setTitle("<a:blad:872160063614255155> Błąd!")
                            .setColor("RED")
                            .setDescription(`Zostałeś wyrzucony z serwera **${member.guild.name}** za nie wykonanie captchy!`)
                              msg.channel.send(embodor)
                              member.kick() 
                  }
              })
      } catch (error) {
          console.log(error)
      }
})

client.on('messageReactionAdd', async (reaction, user) => {

          const { message } = reaction
          

          if (reaction.message.partial) await reaction.message.fetch();
          if (reaction.partial) await reaction.fetch();
          if (user.bot) return;
          
          rr.findOne({ Message: reaction.message.id}, async(err, data) => {
            if(!data) return 
            if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return

            const [ roleid ] = data.Roles[reaction.emoji.name]
            reaction.message.guild.members.cache.get(user.id).roles.add(roleid)
            const embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("<a:tak:872387728027836456> Sukces!")
          .setDescription(`Pomyślnie otrzymałeś rolę na serwerze **${message.guild.name}!**`)
          .setFooter(`${user.tag}`, user.displayAvatarURL({ dynamic: true }))

          user.send(embed)
          })
      })

      client.on('messageReactionRemove', async (reaction, user) => {

        const { message } = reaction
        

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        
        rr.findOne({ Message: reaction.message.id}, async(err, data) => {
          if(!data) return 
          if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return

          const [ roleid ] = data.Roles[reaction.emoji.name]
          reaction.message.guild.members.cache.get(user.id).roles.remove(roleid)

          const embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("<a:tak:872387728027836456> Sukces!")
          .setDescription(`Pomyślnie usunąłeś rolę na serwerze **${message.guild.name}!**`)
          .setFooter(`${user.tag}`, user.displayAvatarURL({ dynamic: true }))

          user.send(embed)
        })
    })

// Connect with Discord
client.login(token)
// Error handler - omit crashed
client.on("debug", () => {})
client.on("warn", () => {})
client.on("error", () => {})
