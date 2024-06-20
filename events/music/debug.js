const { Events } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
	name: 'debug',
	source: 'player',
	once: false,
	async execute(queue, message) {
        // Emitted when the player queue sends debug info
        // Useful for seeing what state the current queue is at
		console.log(`Player debug event: ${message}`);
	},
};