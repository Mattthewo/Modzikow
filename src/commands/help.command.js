const { prefix } = require("../config/config")

const { MessageEmbed } = require("discord.js")
const {botName, botAuthor, botDescription, version, helpinfo} = require("../config/config");

const { readdirSync } = require("fs");


const prefixSchema = require("../../schemas/prefixSchema");

module.exports = {
    
    name: "help",
    description: "Lista wszystkich komend które ma bot lub informacje na temat danej komendy",
    aliases: ["pomoc"],
    brakaliases: "",
    category: "<:info:872502267947913287> Informacyjne",
    usage: "[nazwa komendy]",
    cooldown: 5,
    przykladusage: "help embed",
    //args: true,
   guildOnly: true,
  
   async run(msg, args) {
       
       const defaultPrefix = ",";
  const prefixData = await prefixSchema.findOne({ guildID: msg.guild.id });
  let prefix;
  if (!prefixData) {
    prefix = defaultPrefix;
  } else {
    prefix = prefixData.prefix;
  }
       
    const {
      client: { commands },
    } = msg
    const {channel} = msg

    //================================
    
    //Jeśli nie wprowadzono argumentów
    
    //================================
    if (!args.length) {

        
        //tworzenie listy wszystkich komend 
        const embed = new MessageEmbed()
        //Ustawienie tytułu embeda
        .setTitle(`Pomoc ${botName}`)
        //Ustawienia koloru embeda
        .setColor(0x0d7dee)
        .setDescription("Cześć, jestem **wielofunkcyjnym** botem posiadającym rzeczy typu **licznik zaproszeń** oraz **zmienny prefix** Obecnie posiadam **14** poleceń!, możesz rownież **napisać do Administracji bota dołączając do naszego servera developerskiego** **[(link)](https://discord.gg/HpnrjUCrpd)**.")
        .addField('Developerskie', `\`gban\` \`gunban\``)
        .addField('Administracyjne', `\`clear\` \`ban\``)
        .addField('Bot', `\`ping\``)
        .addField('4fun', `\`8ball\``)
        .addField('Informacyjne', `\`help\``)
        .addField('Reaction Roles', `\`rradd\` \`rrclear\` \`rrpanel\``)
        .addField('Praktyczne', `\`serverinfo\` \`ankieta\` \`invites\` \`avatar\` \`embed\``)
        //.addField('Xp', `\`rank\``)
        .addField('Konfiguracyjne', `\`prefix\` \`captcha\``)
        .addField('Co zrobić aby uzyskać info o danej komendzie', `Możesz wysłać \`${prefix}help [nazwa komendy]\` aby uzyskać informacje o konkretnym poleceniu!`)
        .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
        return channel.send(embed)
        .then(() => {
         if (msg.channel.type === "embed") return
        })
        .catch(err => {
        console.error(`Nie można wysłać pomocniczego Dm to ${msg.author.tag}.\n',err`)
        msg.reply("Wygląda na to, że nie mogę z tobą rozmawiać! Czy masz wyłączone DMS?")
        })
    } else {
    
    
    //================================
    //
    //Jeśli wprowadzono argumenty
    //
    //================================
    const name = args[0].toLowerCase()
    const command = 
    commands.get(name) ||
    commands.find((c) => c.aliases && c.aliases.includes(name))
    const data = []

    if (!command) {
       const embed = new MessageEmbed()
        .setTitle('<a:blad:872160063614255155> Błąd!')
        .setColor("RED")
        .setDescription('Taka komenda nie istnieje')
        .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
        return channel.send(embed)
        
        //return msg.reply
    }
    const embed = new MessageEmbed()
    .setTitle('Informacje o CMD')
    .setColor(0x0d7dee)
    .setDescription(`Aktualnie przeglądasz informacje o cmd: \`${command.name}\``)
    .addField('<:usage:828234345600385045> Użycie:', `**${prefix}${command.name} ${command.usage}**`, true)
    .addField('<:Category:828256433136861234> Kategoria:', `**${command.category}** `, true)
    .addField('<:Aliases:828253287072661514> Aliasy:', ` **${command.aliases}${command.brakaliases}**`, true)
    .addField('<:Example:828257699082797076> Przykład użycia:', `**${prefix}${command.przykladusage}**`, true)
    // if (command.description) 
    .addField('<:File:828237846338338846> Opis:', ` **${command.description}**`, true)
    .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
    // if (command.usage) 
    //  if (command.category) 
     

     .addField('<:Cooldown:828247758405894145> Cooldown:', `**${command.cooldown || 3} sekund(y)**`, true)
     return channel.send(embed)
     }
   }
  }
