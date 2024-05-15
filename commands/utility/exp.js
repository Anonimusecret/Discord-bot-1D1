const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('exp')
        .setDescription('Расчет опыта по CR врагов')
        .addStringOption(option =>
            option.setName('request')
            .setDescription('Ввод одной фразой')
            .setRequired(true)
        ).addIntegerOption(option =>
            option.setName('players')
            .setDescription('Количество игроков')
            .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('progression')
            .setDescription('Скорость прогрессии')
            .setRequired(false)
            .addChoices(
                { name: 'fast', value: 'f' },
                { name: 'medium', value: 'm' },
                { name: 'slow', value: 's' }
            ) 
        )
        ,

        async execute(interaction) {
            //код тут
            await interaction.deferReply(); //приложение думает
            const request = interaction.options.getString('request', true);

            // превратить CR в EXP в зависимости от параметра progression , по умолчанию медиум
            
            await interaction.followUp("<:Cubes:956132971725869076> **Work in progress** <:Cubes:956132971725869076>");
        }
    };