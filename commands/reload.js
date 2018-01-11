var reload = (message, cmd) => {
    delete require.cache[require.resolve('../commands/' + cmd)];
    try {
      let cmdFile = require('../commands/' + cmd);
    } catch (err) {
      message.channel.send(`Problem loading ${cmd}: ${err}`).then(
        response => (error => console.log(error.stack))
      ).catch(error => console.log(error.stack));
    }
    message.channel.send(`${cmd} was successfully reloaded!`).then( 
      response => (error => console.log(error.stack))
    ).catch(error => console.log(error.stack));
  }
  exports.reload = reload;

exports.run = (Kelly, message, args) => {

    if(message.author.id === `383961325132316682`){

    let cmd = args.join(' ');
    reload(message, cmd);
    }else{
	var time = new Date();
	console.log(`[${time.getHours() + `:` + time.getMinutes() + `:` + time.getSeconds()}] ${message.author.username}#${message.author.discriminator} tried using the reload command in ${message.guild.name} (ID: ${message.guild.id}) - Member Count: ${message.guild.memberCount}`);
        message.channel.send(`Only Tyler#1975 can use this`)
    }
}