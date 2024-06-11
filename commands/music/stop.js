const { SlashCommandBuilder, ChannelType, EmbedBuilder  } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('stop')
        .setDescription('Остановить бота')
        ,

        async execute(interaction) {
            const player = useMainPlayer();
            const channel = interaction.member.voice.channel;

            await interaction.deferReply({ephemeral: true});

            try {

                const queue = useQueue(interaction.guild.id);
                

                if (!queue?.isPlaying()) return interaction.followUp({ content: `No music currently playing <${interaction.member}>... try again ? <❌>` });
                
                queue.delete();
                const embed = new EmbedBuilder()
                    .setColor('#2f3136')
                    .setAuthor({ name:`Music stopped into this server, see you next time <✅>` });

                return interaction.editReply({ embeds: [embed] });
                
            } catch (e) {
                // let's return error if something failed
                return interaction.followUp(`Something went wrong: ${e}`);
            }
        }
    };