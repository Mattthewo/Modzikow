const { RichEmbed } = require('discord.js')


module.exports = {
	name: 'genbotinvite',
	aliases: [],
	category: 'bot',
  
	description: 'Generuje Zaproszenie Bota.',
	usage: '<clientid>',

   async run (client, msg, args) {

	   const id = args[0]
	   
	   const { channel } = msg

    const embed = new RichEmbed()
        .setTitle('Sukces')
         .setColor('GREEN')           
        .setDescription(`Pomyślnie Wygerenowano Zaproszenie: [kliknij!](https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=8&scope=bot)`)
    channel.send(embed)
}
}
