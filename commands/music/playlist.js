const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { useMainPlayer, useQueue, QueueRepeatMode } = require('discord-player');

module.exports = {
    cooldown: 1,
    data: new SlashCommandBuilder()
    
        .setName('playlist')
        .setDescription('Играть музыку из пресетов')
        .addStringOption(option =>
            option.setName('preset')
            .setDescription('Выберите что играть')
            .setRequired(true)
            .addChoices(
                { name: 'Усталав ваниль 1', value: 'Void_songOfForgottenCastle_1' },
            ) 
        )
        ,

        async execute(interaction) {
            const player = useMainPlayer();
            
            const channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply('You are not connected to a voice channel!'); // make sure we have a voice channel
            // if (queue?.isPlaying()){
            //     queue.delete();
            // }

            await interaction.deferReply({ephemeral: true});

            switch(interaction.options.getString('preset', true)){
                case 'Void_songOfForgottenCastle_1':
                    addTrack('https://www.youtube.com/watch?v=PaqmYiSPjS8');
                    addTrack('https://www.youtube.com/watch?v=JYFU_RiefKk&t=1s');

                    //const queue = useQueue(interaction.guild.id);
                    const queue = player.queues.get(interaction.guild.id)
                    if(!queue?.isPlaying()){
                        player.events.once('queueCreate', (queue) => {
                            queue.setRepeatMode(QueueRepeatMode.TRACK)
                        });
                        await interaction.followUp({content: `**Усталав ваниль 1** подключено и зациклено!`, ephemeral: true});
                    } else {
                        if(queue.repeatMode != QueueRepeatMode.TRACK){
                            queue.setRepeatMode(QueueRepeatMode.TRACK)
                        }
                        await interaction.followUp({content: `**Усталав ваниль 1** подключено и зациклено!`, ephemeral: true});
                    }
                    break;
            }


            async function addTrack(query){
                const queue = useQueue(interaction.guild.id)
                if(!queue){
                    try {
                        const { track } = await player.play(channel, query, {
                            nodeOptions: {
                                // nodeOptions are the options for guild node (aka your queue in simple word)
                                metadata: interaction, // we can access this metadata object using queue.metadata later on
                                leaveOnStop: false,
                                leaveOnEnd: false,
                                leaveOnEmpty: true, //If the player should leave when the voice channel is empty
                                leaveOnEmptyCooldown: 300_000, //Cooldown in ms
                                skipOnNoStream: true
                            }
                        });

                        return interaction.followUp({content: `**${track.cleanTitle}** enqueued!`, ephemeral: true});
                    } catch (e) {
                        // let's return error if something failed
                        return interaction.followUp(`Something went wrong: ${e}`);
                    }
                }else {
                    try{
                        queue.addTrack(query);
                    } catch (e) {
                        return interaction.followUp(`Something went wrong: ${e}`);
                    }
                    
                }
            } 

        }
    };