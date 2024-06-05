const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('level')
        .setDescription('Расчет EXP для уровня')
        .addIntegerOption(option =>
            option.setName('input')
            .setDescription('Какой уровень?')
            .setRequired(true)
        ).addStringOption(option =>
            option.setName('progression')
            .setDescription('Для какой прогрессии?')
            .setRequired(false)
            .addChoices(
                { name: 'fast', value: 'fast' },
                { name: 'medium', value: 'medium' },
                { name: 'slow', value: 'slow' }
            ) 
        )
        ,

        async execute(interaction) {
            //код тут
            let input = interaction.options.getInteger('input', true);
            let progression = interaction.options.getString('progression', false) ?? 'medium';
            let result;

            await interaction.deferReply({ephemeral: true}); //приложение думает

            switch (progression){
                case 'fast':
                    
                    break;
                case 'medium':
                    result = calcExpForLevel(input, progression);
                    break;
                case 'slow':
                    
                    break;
            }

            await interaction.followUp({content: "Ввод: `"+ input + "`\nEXP: " + result, ephemeral: true});

            function calcExpForLevel(level, progression){
                let first = 3_600_000;
                let result;
                let prev = 2_550_000;
                
                if(level>20){
                    for(let i=20 ; i<level ; i++){

                        result = (first - prev)*2 + first;
                        prev = first;
                        first = result;

                    }
                }
                return result;
            }
        }
    };