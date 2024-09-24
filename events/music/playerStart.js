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
			.setLabel('⏯️')
			.setCustomId('resume&pause')
			.setStyle('Secondary');

		const loop = new ButtonBuilder()
			.setLabel('🔂')
			.setCustomId('loop')
			.setStyle('Secondary');

		const songInfo = new ButtonBuilder()
			.setLabel('📓')
			.setCustomId("songInfo")
			.setStyle("Secondary");
		
		const stop = new ButtonBuilder()
			.setLabel('⏹')
			.setCustomId("stopMusic")
			.setStyle("Danger");

		const next = new ButtonBuilder()
			.setLabel('⏩')
			.setCustomId("nextTrack")
			.setStyle("Success");

		const repeatQueue = new ButtonBuilder()
			.setLabel('🔁')
			.setCustomId("repeatQueue")
			.setStyle("Secondary");

		const row1 = new ActionRowBuilder().addComponents(
			loop,
			back,
			resumepause,
			skip,
		);
		const row2 = new ActionRowBuilder().addComponents(
			repeatQueue,
			stop,
			next,
			songInfo,
		);

    	queue.metadata.channel.send({ embeds: [embed], components: [row1, row2] });


		console.log(`Started playing **${track.cleanTitle}**!`)
		//queue.metadata.channel.send(`Started playing **${track.cleanTitle}**!`);
	},
};