const { SlashCommandBuilder, ChannelType, EmbedBuilder  } = require('discord.js');
const { useMainPlayer, useQueue, QueueRepeatMode } = require('discord-player');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('loop')
        .setDescription('Зациклить трек')
        ,

        async execute(interaction) {
            const player = useMainPlayer();
            const channel = interaction.member.voice.channel;

            await interaction.deferReply({ephemeral: true});

            try {

                const queue = useQueue(interaction.guild.id);
                

                if (!queue?.isPlaying()) return interaction.followUp({ content: `No music currently playing <${interaction.member}>... try again ? <❌>` });
                
                if (queue.repeatMode === QueueRepeatMode.OFF){
                    const success = queue.setRepeatMode(QueueRepeatMode.TRACK);
                    
                    if (!success){
                        return interaction.followUp({ content: 'Looped!', ephemeral: true});
                    }else{
                        return interaction.followUp({ content: 'Unexpected error occured while enabling loop. Try again. Try again', ephemeral: true});
                    }
                } else {
                    const success = queue.setRepeatMode(QueueRepeatMode.OFF);
                    if (!success){
                        return interaction.followUp({ content: 'Loop disabled!', ephemeral: true});
                    }else{
                        return interaction.followUp({ content: 'Unexpected error occured while disabling loop. Try again', ephemeral: true});
                    }
                }
                
            } catch (e) {
                // let's return error if something failed
                return interaction.followUp(`Something went wrong: ${e}`);
            }
        }
    };