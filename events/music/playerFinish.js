const { Events } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
	name: 'playerFinish',
	source: 'player',
	once: false,
	execute(queue) {
		if (queue.metadata.lyricsThread) {
			queue.metadata.lyricsThread.delete();
			queue.setMetadata({
				channel: queue.metadata.channel
			});
		}
	},
};