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
            let prev;
            let last;  

            await interaction.deferReply({ephemeral: true}); //приложение думает

            switch (progression){
                case 'fast':
                    prev = 1_700_000;
                    last = 2_400_000;   
                    result = calcExpForLevel(input, prev, last);
                    break;
                case 'medium':
                    prev = 2_550_000;
                    last = 3_600_000;   
                    result = calcExpForLevel(input, prev, last);
                    break;
                case 'slow':
                    prev = 3_850_000;
                    last = 5_350_000;   
                    result = calcExpForLevel(input, prev, last);
                    break;
            }

            await interaction.followUp({content: "Ввод: `"+ input + "`\nEXP: " + result + ` Для ${progression} прогрессии`, ephemeral: true});

            function calcExpForLevel(level, prev, last){
        
                let result = 0;
                let difference = last - prev;
                
                if(level>20){
                    for(let i=20 ; i<level ; i++){
                        result += difference*2;
                        difference *= 2;
                    }
                    result += last;
                }
                return result;
            }
        }
    };