const { Events } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
	name: 'error',
	source: 'player',
	once: false,
	execute(queue, error) {
        // Emitted when the player queue encounters error
        console.log(`General player error event: ${error.message}`);
        console.log(error);
	},
};