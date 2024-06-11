const { Events } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
	name: 'playerError',
	once: false,
	execute(queue, error) {
        // Emitted when the audio player errors while streaming audio track
        console.log(`Player error event: ${error.message}`);
        console.log(error);
	},
};