const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
	name: 'playerStart',
	source: 'player',
	once: false,
	execute(queue, track) {


		const embed = new EmbedBuilder()
		.setAuthor({
			name: `Started playing <${track.title}> <🎧>`,
			iconURL: track.thumbnail,
		})
		.setColor("#000000");

		const back = new ButtonBuilder()
			.setLabel('⏪')
			.setCustomId('back')
			.setStyle('Secondary');

		const skip = new ButtonBuilder()
			.setLabel('⏩')
			.setCustomId('skip')
			.setStyle('Secondary');

		const resumepause = new ButtonBuilder()
			.setLabel(':play_pause:')
			.setCustomId('resume&pause')
			.setStyle('Secondary');

		const loop = new ButtonBuilder()
			.setLabel('🔁')
			.setCustomId('loop')
			.setStyle('Secondary');

		const lyrics = new ButtonBuilder()
			.setLabel(':notepad_spiral:')
			.setCustomId("lyrics")
			.setStyle("Secondary");

		const row1 = new ActionRowBuilder().addComponents(
			back,
			loop,
			resumepause,
			skip,
			lyrics
		);

    	queue.metadata.channel.send({ embeds: [embed], components: [row1] });


		//console.log(`Started playing **${track.cleanTitle}**!`)
		//queue.metadata.channel.send(`Started playing **${track.cleanTitle}**!`);
	},
};