const { Events } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
	name: 'emptyQueue',
	source: 'player',
	once: false,
	execute(queue) {
		// Emitted when the player queue has finished
        queue.metadata.channel.send('Queue finished!');
	},
};