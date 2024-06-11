const { SlashCommandBuilder, ChannelType, EmbedBuilder  } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('back')
        .setDescription('Включить предыдущий трек')
        ,

        async execute(interaction) {
            const player = useMainPlayer();
            const channel = interaction.member.voice.channel;

            await interaction.deferReply({ephemeral: true});

            try {

                const queue = useQueue(interaction.guild.id);
                

                if (!queue?.isPlaying()) return interaction.followUp({ content: `No music currently playing <${interaction.member}>... try again ? <❌>` });
                
                if (!queue.history.previousTrack) return inter.editReply({ content: `There was no music played before <${interaction.member}>... try again ? <❌>`});
                
                await queue.history.back();


                const backEmbed  = new EmbedBuilder()
                    .setColor('#2f3136')
                    .setAuthor({ name:`Playing the previous track <✅>` });

                return interaction.editReply({ embeds: [backEmbed ] });
                
            } catch (e) {
                // let's return error if something failed
                return interaction.followUp(`Something went wrong: ${e}`);
            }
        }
    };