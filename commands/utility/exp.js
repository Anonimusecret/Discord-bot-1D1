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
            // const progression = interaction.options.getString('progression', true) ?? 'm';
            const crRegEx = /\d+/g;
            let crArr = [];
            let match;
            let result = 0;

            // превратить CR в EXP в зависимости от параметра progression , по умолчанию медиум
            function calculateExp(cr) {
                let exp = 400;
                if ( cr % 2 !== 0 ){
                    for ( let i = 1 ; i < cr ; i += 2 ){ //цикл подсчета нечетного CR

                        exp = exp * 2;

                    }
                } else {
                    cr--; // помогаем посчитать нечетную часть CR
                    for ( let i = 1 ; i < cr ; i += 2 ){

                        exp = exp * 2;

                    }
                    exp = exp * 1.5; // Превращаем нечетный CR 15 в четный 16
                }
                return (exp)  //your iterator
            }

            while(match = crRegEx.exec(request)){
                result += calculateExp(match[0]);
            }

            await interaction.followUp({content: "EXP: " + result, ephemeral: true});

            // await interaction.followUp("<:Cubes:956132971725869076> **Work in progress** <:Cubes:956132971725869076>");
        }
    };