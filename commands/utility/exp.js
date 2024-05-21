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
        ,

        async execute(interaction) {
            //код тут
            await interaction.deferReply({content: "Считаем", ephemeral: true}); //приложение думает
            let request = interaction.options.getString('request', true);
            let players = interaction.options.getInteger('players', false) ?? 1;
            const minusRegEx = /(\d+)\-(\d+)/g;
            let match;
            let result = 0;
            players = Math.floor(players);

            // превратить CR в EXP в зависимости от параметра progression , по умолчанию медиум
            function calculateExp(cr) { //Считаем EXP из CR
                let exp = 400;
                if (cr >= 1){ //проверка на вход нормального cr для фикса бага
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
                } else {
                    exp = 0;
                }
                return (exp)
            }
            function calculateCr(request){ //Считаем сумму всей EXP из формулы ввода
                let result = 0;
                let match;
                const crRegEx = /\d+/g;
                const multiplicationRegEx = /(\d+)\*(\d+)/g
                while(match = multiplicationRegEx.exec(request)){
                    for (let i = match[2] ; i > 0 ; i--){
                        result += calculateExp(match[1]);
                        request = request.replace(match[0], '');
                    }
                }

                while(match = crRegEx.exec(request)){
                    result += calculateExp(match[0]);
                }
                return (result);
            }

            if (match = minusRegEx.exec(request)){ //функция команды длЯ вычета cr из exp
                let exp = match[1];
                let cr = request.replace(match[0], match[2]);
                result = exp - calculateExp(cr);

                await interaction.followUp({content: "Из "+ match[1] +" EXP вычтен "+ cr +" CR: " + result, ephemeral: true});

            } else { //функция сложения CR
            result = calculateCr(request);
            if (players > 1){
                await interaction.followUp({content: "EXP: " + result + '\nНаждого из `' + players + '` игроков по ' + (result / players), ephemeral: true});
            } else {
                await interaction.followUp({content: "EXP: " + result, ephemeral: true});
            }
        }

        }
    };