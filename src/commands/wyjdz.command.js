module.exports = {
    name: "leave",
    description: "Komenda wychodzi botem \nz oznaczonego serwera.",
    category: "<:Bot:828227204760469535> Bot",
    aliases: "",
    brakaliases: "(brak aliasów)",
    cooldown: 5,
    usage: "",
    przykladusage: "leave",
    guildOnly: false,


    async run(msg, args, client) {
        if (!["786146744622776360", "548536308079788033"].includes(msg.author.id)) return
        

        const serverId = args[0]
        if(!serverId) {
            msg.channel.send("Nie podałeś ID serwera!")
            return
        }

        const serverTarget = client.guilds.cache.get(serverId)
        if(!serverTarget) {
            msg.channel.send("Podałeś nieprawidłowe ID")
            return
        }

        serverTarget.leave()
        console.log(`${msg.author.tag} użył komendy leave na serwerze: ${serverTarget.name}`)
        msg.channel.send(`Pomyślnie wyszedłem z serwera ${serverTarget.name}`)
    }
}
