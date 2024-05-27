const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('generate')
        .setDescription('Сгенерировать статы для персонажа пф1'),

        async execute(interaction) {		
            const query = interaction.options.getString('query');
            const version = interaction.options.getString('version');
            await interaction.reply({ content: '**Версия:** ' + version + '\n**Тема:** ' + query});        
        }
}