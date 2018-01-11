exports.run = (RolesCrazy, message, args) => {

    const Discord = require(`discord.js`);
    const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419, 0x8a2be2];
    const db = require(`quick.db`);

    db.fetchObject(`guildPrefix_${message.guild.name}`).then(i => { 

        if(i.text){
            PREFIX = i.text;
        }else{
            PREFIX = `*`;
        }

        const embed = new Discord.RichEmbed()
        .setColor(hexcols[~~(Math.random() * hexcols.length)])
        .addField(`General Commands`, `${PREFIX}create <Role Name> - Creates a role with the provided name\n${PREFIX}setcolor <Role Name> <Color (eg: 0x00ffff or #00ffff)> - Set the provided names color to the provided color\n${PREFIX}help - displays this message`)
        .addField(`Moderation Commands`, `${PREFIX}setprefix <Prefix> - sets the prefix to the provided prefix`)
        .addField(`Owner Only`, `*reload <Command> - Reloads specified command`)
        message.channel.send({embed});
    })
}