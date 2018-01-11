exports.run = (Kelly, message, args) => {

    const db = require(`quick.db`);

    db.fetchObject(`guildPrefix_${message.guild.name}`).then(i => {
		
		if(i.text){
            PREFIX = i.text;
        }else{
            PREFIX = `*`;
        }

    const Discord = require('discord.js');
    const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419, 0x8a2be2];

    if(!message.guild.member(Kelly.user).hasPermission(`MANAGE_MESSAGES`)) return message.reply(`I do not haver the required **Permission(s)**: **MANAGE_MESSAGES**!`);
    if(!message.guild.member(message.author).hasPermission(`MANAGE_MESSAGES`)) return message.reply(`I do not haver the required **Permission(s)**: **MANAGE_MESSAGES**!`);

    async function purge() {
        message.delete();

        if (isNaN(args[0])) {
            message.channel.send(`Please specify the amount of messages you would like to **PURGE**! - Usage: **${PREFIX}purge <Amount>**`);
            return;
        }

        const fetched = await message.channel.fetchMessages({limit: args[0]});
        const embed = new Discord.RichEmbed()
        .setColor(hexcols[~~(Math.random() * hexcols.length)])
        .setDescription(`:wastebasket: ${message.author.tag} purged ${fetched.size} messages`);
        message.channel.send({
            embed
        });

	var time = new Date();
	console.log(`[${time.getHours() + `:` + time.getMinutes() + `:` + time.getSeconds()}] ${message.author.username}#${message.author.discriminator} used the purge command in ${message.guild.name} (ID: ${message.guild.id}) - Member Count: ${message.guild.memberCount}`);

        message.channel.bulkDelete(fetched).catch(error => message.channel.send(`Error: ${error}`));

            }
        purge();
    })
};