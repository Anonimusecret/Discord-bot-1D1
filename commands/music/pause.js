const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    cooldown: 1,
    data: new SlashCommandBuilder()
    
        .setName('pause')
        .setDescription('Поставить паузу')
        ,

        async execute(interaction) {
            const player = useMainPlayer();
            const channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply('You are not connected to a voice channel!'); // make sure we have a voice channel

            await interaction.deferReply({ephemeral: true});

            try {

                const queue = useQueue(interaction.guild.id);
                if(!queue.node.isPaused()){
                    queue.node.setPaused(!queue.node.isPaused());
                    return interaction.followUp({content: `Track paused!`, ephemeral: true});
                }else{
                    queue.node.setPaused(!queue.node.isPaused());
                    return interaction.followUp({content: `Track resumed!`, ephemeral: true});
                }
                //isPaused() returns true if that player is already paused

                
            } catch (e) {
                // let's return error if something failed
                return interaction.followUp(`Something went wrong: ${e}`);
            }
        }
    };