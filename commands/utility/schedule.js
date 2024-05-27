const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('schedule')
        .setDescription('Вывести расписаний партий на неделю'),

        async execute(interaction) {		
            const query = interaction.options.getString('query');
            const version = interaction.options.getString('version');
            await interaction.reply({ content: '**Версия:** ' + version + '\n**Тема:** ' + query});        
        }
}