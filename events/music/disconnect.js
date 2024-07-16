const { Events } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
	name: 'disconnect',
	source: 'player',
	once: false,
	execute(queue) {
		// Emitted when the bot leaves the voice channel
        queue.metadata.channel.send('Looks like my job here is done, leaving now!');
		if (queue.metadata.lyricsThread) {
			queue.metadata.lyricsThread.delete();
			queue.setMetadata({
				channel: queue.metadata.channel
			});
		}
	},
};