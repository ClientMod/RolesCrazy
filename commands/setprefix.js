const db = require(`quick.db`);
var time = new Date();
const botsettings = require(`../util/botsettings.json`);

exports.run = (RolesCrazy, message, args) => {

    if(message.guild.member(message.author).hasPermission(`ADMINISTRATOR`) || message.author.id === `383961325132316682`){

    db.fetchObject(`guildPrefix_${message.guild.name}`).then(i => {

        if(i.text){
            PREFIX = i.text;
        }else{
            PREFIX = `*`;
        }

    if(!args.join(` `)) return message.reply(`Enter a prefix!. Usage: ${PREFIX}setprefix <prefix`);

    db.updateText(`guildPrefix_${message.guild.name}`, args.join().trim()).then(i => {

        console.log(`[${time.getHours() + `:` + time.getMinutes() + `:` + time.getSeconds()}] ${message.author.username}#${message.author.discriminator} changed the prefix to ${i.text} in ${message.guild.name} (ID: ${message.guild.id}) - Member Count: ${message.guild.memberCount}`);
        message.channel.send(`Successfully changed prefix to **${i.text}**!`);
            })
        })
    }else{
        return message.reply(`You do not have the required permission(s): **ADMINISTRATOR**`);
    }
}