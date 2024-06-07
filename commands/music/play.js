const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    
        .setName('play')
        .setDescription('Играть музыку')
        .addStringOption(option =>
            option.setName('link')
            .setDescription('Ссылка на трек')
            .setRequired(true)
        )
        ,

        async execute(interaction) {
            const player = useMainPlayer();
            const channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply('You are not connected to a voice channel!'); // make sure we have a voice channel
            const query = interaction.options.getString('link', true); // we need input/query to play

            // let's defer the interaction as things can take time to process
            await interaction.deferReply();

            try {
                const { track } = await player.play(channel, query, {
                    nodeOptions: {
                        // nodeOptions are the options for guild node (aka your queue in simple word)
                        metadata: interaction // we can access this metadata object using queue.metadata later on
                    }
                });

                return interaction.followUp(`**${track.cleanTitle}** enqueued!`);
            } catch (e) {
                // let's return error if something failed
                return interaction.followUp(`Something went wrong: ${e}`);
            }
        }
    };