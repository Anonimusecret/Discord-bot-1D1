const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { useMainPlayer, useQueue, QueueRepeatMode } = require('discord-player');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('next')
        .setDescription('Пропустить зацикленный трек')
        ,

        async execute(interaction) {
            const player = useMainPlayer();
            const channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply('You are not connected to a voice channel!'); // make sure we have a voice channel

            await interaction.deferReply({ephemeral: true});

            try {

                const queue = useQueue(interaction.guild.id);

                if (!queue?.isPlaying()) return interaction.followUp({ content: `No music currently playing <${interaction.member}>... try again ? <❌>` });

                queue.setRepeatMode(QueueRepeatMode.OFF)
                queue.node.skip();

                player.events.once('playerSkip', (queue) => {
                    queue.setRepeatMode(QueueRepeatMode.TRACK)
                    return interaction.followUp({ content: 'Skipped!', ephemeral: true});
                });

            } catch (e) {
                return interaction.followUp(`Something went wrong: ${e}`);
            }
        }
    };