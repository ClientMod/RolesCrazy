exports.run = (RolesCrazy, message, args) => {

    const Discord = require(`discord.js`);
    const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419, 0x8a2be2];
    const guild = message.guild;
    const rolename = args.join(` `);
    const db = require(`quick.db`);

    db.fetchObject(`guildPrefix_${message.guild.name}`).then(i => { 

        if(i.text){
            PREFIX = i.text;
        }else{
            PREFIX = `*`;
        }

        if(!args[0]){
        const embed = new Discord.RichEmbed()
        .setAuthor(`create`, message.author.displayAvatarURL)
        .setDescription(`Command: create\nUsage: ${PREFIX}create <Role Name>\nDescription: Creates a role with the name you want\nType: Moderation`)
        .setColor(hexcols[~~(Math.random() * hexcols.length)]);
        return message.channel.send({embed})
        }

    if(!message.guild.member(message.author).hasPermission(`MANAGE_ROLES`)) return message.reply(`You do not have the required permission(s): **MANAGE_ROLES**!`);
    if(!message.guild.member(RolesCrazy.user).hasPermission(`MANAGE_ROLES`)) return message.reply(`I do not have the required permission(s): **MANAGE_ROLES** so i cannot create this role!`);

        guild.createRole({
            name: rolename,
        }).then(function(){
            message.channel.send(`Created Role: ${rolename}`);
        })
    })
}