const { Events } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
	name: 'disconnect',
	source: 'player',
	once: false,
	execute(queue) {
		// Emitted when the bot leaves the voice channel
        queue.metadata.channel.send('Looks like my job here is done, leaving now!');
	},
};