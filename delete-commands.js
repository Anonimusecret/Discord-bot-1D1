const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST().setToken(token);

// ...

// for guild-based commands
rest.delete(Routes.applicationGuildCommand(clientId, guildId, '1240399887758004276')) // commandId here
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);

// for global commands
/*
rest.delete(Routes.applicationCommand(clientId, 'commandId'))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error); */

	//Удалить все глобальные команды:

	// rest.put(Routes.applicationCommands(clientId), { body: [] })
	// .then(() => console.log('Successfully deleted all application commands.'))
	// .catch(console.error);

	//Удалить все серверные команды:
	// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	// .then(() => console.log('Successfully deleted all guild commands.'))
	// .catch(console.error);