const { Collection } = require("discord.js")
const { MessageEmbed } = require("discord.js")
const { readdirSync } = require("fs")
const prefixSchema = require("../../schemas/prefixSchema.js");
const random = require("random")
const fs = require("fs")
const jsonfile = require("jsonfile")
var stats = {}
if (fs.existsSync('stats.json')) {
  stats = jsonfile.readFileSync("stats.json")
}
const { prefix } = require(__dirname +"/../config/config.js");

const ascii = require("ascii-table");
const table = new ascii().setHeading("Komendy", "stan załadowania komendy")
module.exports = (client) => {
    //Kolekcja
    client.commands = new Collection()
    //kolekcja cooldown
    const cooldowns = new Collection
    const commandFiles = readdirSync(__dirname + "/../commands/").filter(file => file.endsWith(".command.js"))
    for (const file of commandFiles) {
        const command = require(__dirname + `/../commands/${file}`)
     if (command.name) {
       client.commands.set(command.name, command)
       table.addRow(file, "✅")
     } else {
        table.addRow(file, "❌  -> brakuje 'nazwy' !")
        continue
     }
    }
    //  fs.readdir(__dirname + "./events", (err, files) => {
    //    if (err) return console.log(err)
    //    files.forEach(file => {
    //      if (!file.endsWith(".js")) return
    //      const event = require(__dirname + `./events/${file}`)
    //      const eventName = file.split(".")[0]
    //      client.on(eventName, event.bind(null, client))
    //      delete require.cache[require.resolve(__dirname + `./events/${file}`)]
    //    })
    //  })
     //wyświetlanie tabeli ascii
    console.log(table.toString())
    client.on("message", async (msg) => {

      if (msg.author.bot || msg.channel.type === "dm") return
      
      const { channel } = msg
      
      const defaultPrefix = ",";
  const prefixData = await prefixSchema.findOne({ guildID: msg.guild.id });
  let prefix;
  if (!prefixData) {
    prefix = defaultPrefix;
  } else {
    prefix = prefixData.prefix;
  }
      const { author, guild } = msg
   
      
        //sprawdzanie czy użytkownik to nie bot i czy wiadomość jest napisana na guild
         if (author.bot) {
          return
         }
      
        //ignorowanie komend bez prefixu
        if (!msg.content.startsWith(prefix)) {
          return 
        };
        if (msg.content === prefix) {
          return
        }
        
      
        const userSchema = require('../../schemas/gbanSchema')
  
      
  
        const userID = msg.author.id
        const gbanResults = await userSchema.findOne({ userID })
        
        if (gbanResults) {
          const embed = new MessageEmbed()
                .setTitle(`<a:blad:872160063614255155> Błąd!`)
                .setColor(`RED`)
                .setDescription(`Jesteś **globalnie** zbanowany!\n\nPowód: \`${gbanResults.reason}\`\nData: \`${gbanResults.date}\`\nDeveloper: <@${gbanResults.moderatorID}>`)
                .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
            return channel.send(embed);
        }
    
      
        //Argumenty i zamiana na małe literki w komendzie 
        const args = msg.content
        .slice(prefix.length)
        .trim()
        .split(" ")
        const cmdName = args.shift().toLowerCase()
       const cmd = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName))
       //sprawdanie czy polecenie istnieje
       if (!cmd) {
        const embed = new MessageEmbed()
        .setTitle("Błąd")
        .setColor(0x0d7dee)
        .setDescription(`Taka komenda nie istnieje\n aby zobaczyć listę moich komend użyj \`${prefix}help\``)
        .setFooter(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
         return msg.channel.send(embed)
       } 
        
       //odpowiadanie jeśli komenda nie jest wysłana w guild lub ma guildOnly
       if (cmd.guildOnly && !guild) {
         return msg.reply(`${msg.author} Nie mogę wykonać tego polecenia wewnątrz Dm's!`)
       } 
      
       //odpowiadanie jeśli nie podałeś argumentów i pokazuje jak to zrobić (Działa na komendy które mają zmienną args)
      
       //sprawdanie czasu odnowienia komendy i tworzenie nowej kolekcji jeśli nie ma on przypisanego cooldownu
       if (!cooldowns.has(cmdName)) {
           cooldowns.set(cmdName, new Collection())
         }
         //tworzenie podstawowego cooldownu  
         const now = Date.now()
         const timestamps = (cooldowns.get(cmdName))
         const cooldownAmount = (cmd.cooldown || 0) * 1000
         //
       if (timestamps.has(author.id)) {
         const expirationTime = timestamps.get(author.id) + cooldownAmount
         //odpowiadanie jeśli cooldown nie jest równy 0  
         if (now < expirationTime) {
           const timeleft = (expirationTime - now) / 1000
           const embed1 = new MessageEmbed()
          .setColor(0x0d7dee)
          .setTitle("<:Cooldown:828247758405894145> Zwolnij!")
          .setDescription(
            `Zaczekaj ${timeleft.toFixed(1)} sekund/y przed ponownym użyciem komendy \`${cmdName}\`.`
          )
          .setFooter(
            `${msg.author.tag}`,
            msg.author.displayAvatarURL({ dynamic: true }))
           return channel.send(embed1)
          
         }
       }
       timestamps.set(author.id, now)
       setTimeout(() => {
       timestamps.delete(author.id)
       }, cooldownAmount)
       //odpowiadanie jeśli wystąpił błąd podczas wykonywania komendy
        try {
            cmd.run(msg, args, client)
          } catch(error) {
         console.log(error)
         msg.reply("Wystąpił błąd podczas próby wykonania tego polecenia")
        }
      
        //console.log(cmdName) Pomoc włączenie logów jeśli coś nie działa
     
    })
    
    
      
    
   
   }


      
      
  
