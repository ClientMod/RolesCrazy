const Discord = require(`discord.js`);
const db = require(`quick.db`);

const RolesCrazy = new Discord.Client();
const { TOKEN, VERSION } = require(`./util/botsettings.json`);

function game1(){

    var PREFIX = `*`;

    RolesCrazy.user.setGame(`need help? type ${PREFIX}help`);
    setTimeout(game2, 30000);
};

function game2(){
    RolesCrazy.user.setGame(`made by Tyler#1975`);
    setTimeout(game3, 30000);
};

function game3(){
    RolesCrazy.user.setGame(`on ${RolesCrazy.guilds.array().length} guilds with ${RolesCrazy.users.size} users`);
    setTimeout(game1, 30000);
};

RolesCrazy.on(`ready`, () => {

    var PREFIX = `k?`;
    var time = new Date();

    console.log(`[${time.getHours() + `:` + time.getMinutes() + `:` + time.getSeconds()}] Ready in ${RolesCrazy.guilds.array().length} Servers:\n${RolesCrazy.guilds.map(g=>g.name + ` (ID: ${g.id}) - Member Count: ${g.memberCount}`).join(`\n`)}`);
    RolesCrazy.user.setGame(`${PREFIX}help | v${VERSION}`)
    setTimeout(game1, 30000);
});

RolesCrazy.on(`message`, message => {

    db.fetchObject(`guildPrefix_${message.guild.name}`).then(i => {

    if(i.text){
        PREFIX = i.text;
    }else{
        PREFIX = `*`;
    }

    if(message.author.bot) return;
    if(message.channel.type == `dm`) return;
    if(message.content.indexOf(PREFIX) !== 0) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commands = require(`./commands/${command}.js`);
        commands.run(RolesCrazy, message, args);
    } catch (error) {
        console.log(error);
    }
  })
})

RolesCrazy.on(`guildCreate`, guild => {

    guild.owner.send(`I've been added to your discord, i just wanted to say thank you. here is some basic info on how to use the bot:\n**1)** The default prefix is \`\`${PREFIX}\`\`\n**2)** Commands don't work in Direct Messages\n**3)** Support server is: https://discord.gg/5YPBdM3`);
	var time = new Date();
    console.log(`[${time.getHours() + `:` + time.getMinutes() + `:` + time.getSeconds()}] I was added to ${guild.name} (ID: ${guild.id}) - Member Count: ${guild.memberCount}`);
    
    if (!guild.channels.find(`name`, `general`)) {
        RolesCrazy.channels.get(`400341578423599114`).send(`__**I Joined A New Guild!**__\n\n**Name**: ${guild.name}\n**Member Count**: ${guild.memberCount} Members\n**ID**: ${guild.id}\n\nI Didn't Find A General Channel\n\nI Am Now In **${RolesCrazy.guilds.size}** Guilds!`)
    }
    guild.channels.find(`name`, `general`).createInvite().then(invite => {
        RolesCrazy.channels.get(`400341578423599114`).send(`__**I Joined a new Guild!**__\n\n**Name**: ${guild.name}\n**Member Count**: ${guild.memberCount} Members\n**ID**: ${guild.id}\n\nI Found A General Channel:\n ${invite.url}\n\nI Am Now In **${RolesCrazy.guilds.size}** Guilds!`);
    })
});

RolesCrazy.on(`guildDelete`, guild => {
    
	var time = new Date();
	console.log(`[${time.getHours() + `:` + time.getMinutes() + `:` + time.getSeconds()}] I was removed from ${guild.name} (ID: ${guild.id}) - Member Count: ${guild.memberCount}`);
    
});

RolesCrazy.on(`guildMemberAdd`, member => {

    const role = member.guild.roles.find(`name`, `Member`);

    if(member.guild.id === "400335536797122581"){
        member.addRole(role.id);
    }

})

RolesCrazy.login(TOKEN);