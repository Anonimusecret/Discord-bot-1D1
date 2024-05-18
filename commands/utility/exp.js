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
            // const progression = interaction.options.getString('progression', true);
            const crRegEx = /\d+/g
            let crArr = [];
            let match;

            while (match = crRegEx.exec(request)){
                crArr += match[0];

                // result = result.replace(match[0], roll(match[1], match[2]));
            };

            // превратить CR в EXP в зависимости от параметра progression , по умолчанию медиум
            function callback(currentValue) {
                console.log(currentValue);  //your iterator
            }
            //if (progression === 'm'){
                crArr.forEach(callback);
            //}

            await interaction.followUp("<:Cubes:956132971725869076> **Work in progress** <:Cubes:956132971725869076>");
        }
    };