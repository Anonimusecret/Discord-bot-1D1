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
                let success;

                if (!queue?.isPlaying()) return interaction.followUp({ content: `No music currently playing <${interaction.member}>... try again ? <❌>` });
                
                //success = queue.node.move(queue.tracks.toArray()[0], queue.tracks.toArray().length)
                success = queue.node.jump(0)
                if(success){
                    return interaction.followUp({ content: 'Skipped!', ephemeral: true});
                }else{
                        return interaction.followUp({ content: 'Unexpected error. Try again' + `\n ${queue.tracks.toArray()[0].title}`, ephemeral: true});
                    }
                
                // const unloop = queue.setRepeatMode(QueueRepeatMode.OFF);
                // if (!unloop){
                //     const skip = queue.node.skip();
                //     if (skip){
                //         const loop = setTimeout(queue.setRepeatMode, 5_000, QueueRepeatMode.TRACK) //queue.setRepeatMode(QueueRepeatMode.TRACK);
                //         if(!loop){
                //             return interaction.followUp({ content: 'Skipped!', ephemeral: true});
                //         }
                //     }
                // }
                
                // success = queue.node.skip();
                //TODO: попробовать задержку
                
                

                // if (success){
                //     queue.setRepeatMode(QueueRepeatMode.TRACK);
                //     return interaction.followUp({ content: 'Skipped!', ephemeral: true});
                // }else{
                //     return interaction.followUp({ content: 'Unexpected error. Try again', ephemeral: true});
                // }
                
            } catch (e) {
                // let's return error if something failed
                return interaction.followUp(`Something went wrong: ${e}`);
            }
        }
    };