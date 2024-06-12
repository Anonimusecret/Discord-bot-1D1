const { Events } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
	name: 'playerSkip',
	source: 'player',
	once: false,
	execute(queue, track) {
		// Emitted when the audio player fails to load the stream for a song
        queue.metadata.channel.send(`Skipping **${track.title}**!`);
	},
};