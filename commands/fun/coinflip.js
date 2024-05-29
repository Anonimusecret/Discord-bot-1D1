const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('coinflip')
        .setDescription('Подбросить монетку')
        ,
        async execute(interaction) {
            await interaction.deferReply({ephemeral: true});
            let resultMessage = '';
            let result = Math.floor(Math.random() * 2)+1;
            if (result == 2){
                resultMessage = 'Орел!(1)'
            } else {
                resultMessage = 'Решка!(2)'
            }
            




            await interaction.followUp({content: resultMessage});
        }
};