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
        // .addStringOption(option =>
        //     option.setName('progression')
        //     .setDescription('Скорость прогрессии')
        //     .setRequired(false)
        //     .addChoices(
        //         { name: 'fast', value: 'f' },
        //         { name: 'medium', value: 'm' },
        //         { name: 'slow', value: 's' }
        //     ) 
        // )
        ,

        async execute(interaction) {
            //код тут
            await interaction.deferReply({content: "Считаем", ephemeral: true}); //приложение думает
            let request = interaction.options.getString('request', true);
            let players = interaction.options.getInteger('players', false) ?? 1;
            // const progression = interaction.options.getString('progression', true) ?? 'm';
            const crRegEx = /\d+/g;
            const multiplicationRegEx = /(\d+)\*(\d+)/g
            let match1;
            let match2;
            let result = 0;
            players = Math.floor(players);

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
                return (exp)
            }

            while(match1 = multiplicationRegEx.exec(request)){
                for (let i = match1[2] ; i > 0 ; i--){
                    result += calculateExp(match1[1]);
                    request = request.replace(match1[0], '');
                }
            }

            while(match2 = crRegEx.exec(request)){
                result += calculateExp(match2[0]);
            }

            if (players > 1){
                await interaction.followUp({content: "EXP: " + result + '\nНаждого из `' + players + '` игроков по ' + (result / players), ephemeral: true});
            } else {
                await interaction.followUp({content: "EXP: " + result, ephemeral: true});
            }
            
        }
    };