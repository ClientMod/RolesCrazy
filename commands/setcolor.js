exports.run = (RolesCrazy, message, args) => {

    let color = args.slice(1).join(` `);
    if(!message.guild.member(message.author).hasPermission(`MANAGE_ROLES`)) return message.reply(`You do not have the required permission(s): **MANAGE_ROLES**!`);
    if(!message.guild.member(RolesCrazy.user).hasPermission(`MANAGE_ROLES`)) return message.reply(`I do not have the required permission(s): **MANAGE_ROLES** so i cannot create this role!`);

    if(color.startsWith(`0x` || `#`)){
        message.guild.roles.find(`name`, args[0]).setColor(color);
        message.channel.send(`Changed ${args[0]}'s color to ${color}`);
    }else{
        return message.reply(`Please provide a color EG: 0x00ffff or #00ffff`);
    }
}