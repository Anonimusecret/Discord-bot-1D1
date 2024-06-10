const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const { Player } = require('discord-player');

const { Client, Collection, Events, GatewayIntentBits, AttachmentBuilder } = require('discord.js'); // Подключаем библиотеку discord.js

const client = new Discord.Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessageReactions, //reacts
		GatewayIntentBits.GuildModeration, //audit
		GatewayIntentBits.GuildMembers, //muz
		GatewayIntentBits.GuildVoiceStates, //muz
        GatewayIntentBits.MessageContent //muz
	]
})

client.commands = new Collection();
client.cooldowns = new Collection();

const fs = require('node:fs');
const path = require('node:path');
//const comms = require("./comms.js"); // Подключаем файл с командами для бота
//const fs = require('fs'); // Подключаем родной модуль файловой системы node.js  

let config = require('./config.json'); // Подключаем файл с параметрами и информацией
let token = config.token; // «Вытаскиваем» из него токен
let prefix = config.prefix; // «Вытаскиваем» из него префикс

const player = new Player(client);
player.extractors.loadDefault();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsFolderPath = path.join(__dirname, 'events'); //пути ивентов
const eventFolders = fs.readdirSync(eventsFolderPath);

for (const folder of eventFolders) {
	const eventsPath = path.join(eventsFolderPath, folder);
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
	for (const file of eventFiles) { //выполнение ивентов
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}

client.login(token); // Авторизация бота