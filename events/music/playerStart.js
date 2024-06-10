const { Events } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
	name: 'playerStart',
	once: false,
	execute(queue, track) {
		queue.metadata.channel.send(`Started playing **${track.cleanTitle}**!`);
	},
};