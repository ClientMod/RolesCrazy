exports.run = (RolesCrazy, message, args) => {

    if(!args[0]) return;
    
    if(!message.guild.member(message.author).hasPermission(`MANAGE_ROLES`)) return message.reply(`You do not have the required permission(s): **MANAGE_ROLES**!`);
    if(!message.guild.member(RolesCrazy.user).hasPermission(`MANAGE_ROLES`)) return message.reply(`I do not have the required permission(s): **MANAGE_ROLES** so i cannot create this role!`);

    if(args[0]){
        message.guild.roles.find(`name`, args[0]).delete();

        message.channel.send(`Successfully Deleted ${args[0]}`);
    }

}