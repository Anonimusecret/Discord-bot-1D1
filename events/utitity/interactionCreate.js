const { Collection, Events, EmbedBuilder, InteractionType } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
	name: Events.InteractionCreate,
    source: 'client',
	async execute(interaction) {
        if (/*!*/interaction.isChatInputCommand())/* return;*/{
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            const { cooldowns } = interaction.client;

            if (!cooldowns.has(command.data.name)) {
                cooldowns.set(command.data.name, new Collection());
            }
            
            const now = Date.now();
            const timestamps = cooldowns.get(command.data.name);
            const defaultCooldownDuration = 3;
            const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;
            
            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

                if (now < expirationTime) {
                    const expiredTimestamp = Math.round(expirationTime / 1_000);
                    return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
                }
            }
            
            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            } 
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(interaction.commandName);
    
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
    
            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        } else if (interaction.isButton()){

            const customId = inter.customId;
            const channel = interaction.member.voice.channel;
            const queue = useQueue(interaction.guild.id);

            if (!customId) {
                console.log('неприемлимый customId кнопки')
                return;
            }


            switch (customId){
                case 'back':

                    await interaction.deferUpdate();

                    if (!queue?.isPlaying()) return interaction.followUp({ content: `No music currently playing <${interaction.member}>... try again ? <❌>` });
                    
                    if (!queue.history.previousTrack) return interaction.followUp({ content: `There was no music played before <${interaction.member}>... try again ? <❌>`});
                    
                    await queue.history.back();

                    break;

                case 'skip':
                    
                    if (!channel) return interaction.reply('You are not connected to a voice channel!'); // make sure we have a voice channel

                    await interaction.deferUpdate();

                    try {

                        if (!queue?.isPlaying()) return interaction.followUp({ content: `No music currently playing <${interaction.member}>... try again ? <❌>` });
                        
                        const success = queue.node.skip();

                        if (success){
                            interaction.followUp({ content: 'Skipped!', ephemeral: true});
                        }else{
                            interaction.followUp({ content: 'Unexpected error. Try again', ephemeral: true});
                        }
                        
                    } catch (e) {
                        // let's return error if something failed
                        return interaction.followUp(`Something went wrong: ${e}`);
                    }

                    break;
                
                case 'resume&pause':
                
                if (!channel) return interaction.reply('You are not connected to a voice channel!'); // make sure we have a voice channel
    
                await interaction.deferUpdate();
    
                try {
    
                    if(!queue.node.isPaused()){
                        queue.node.setPaused(!queue.node.isPaused());
                        interaction.followUp({content: `Track paused!`, ephemeral: true});
                    }else{
                        queue.node.setPaused(!queue.node.isPaused());
                        interaction.followUp({content: `Track resumed!`, ephemeral: true});
                    }
                    //isPaused() returns true if that player is already paused
    
                    
                } catch (e) {
                    // let's return error if something failed
                    return interaction.followUp(`Something went wrong: ${e}`);
                }

                    break;

                case 'loop':

                await interaction.deferUpdate();

                try {
    
                    if (!queue?.isPlaying()) return interaction.followUp({ content: `No music currently playing <${interaction.member}>... try again ? <❌>` });
                    
                    if (queue.repeatMode === QueueRepeatMode.OFF){
                        const success = queue.setRepeatMode(QueueRepeatMode.TRACK);
                        
                        if (!success){
                            interaction.followUp({ content: 'Looped!', ephemeral: true});
                        }else{
                            interaction.followUp({ content: 'Unexpected error occured while enabling loop. Try again. Try again', ephemeral: true});
                        }
                    } else {
                        const success = queue.setRepeatMode(QueueRepeatMode.OFF);
                        if (!success){
                            interaction.followUp({ content: 'Loop disabled!', ephemeral: true});
                        }else{
                            interaction.followUp({ content: 'Unexpected error occured while disabling loop. Try again', ephemeral: true});
                        }
                    }
                    
                } catch (e) {
                    // let's return error if something failed
                    return interaction.followUp(`Something went wrong: ${e}`);
                }

                    break;
                
                case 'lyrics':

                await interaction.deferUpdate();

                interaction.followUp(`Now playing **${track.cleanTitle}**!`);

                    break;
                
                default:

                console.log(`Нажата кнопка ${customId}`);

                break;
            }
        }
    },
};