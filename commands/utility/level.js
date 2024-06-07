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
            let expSlow = [ //запомнить, что id это уровень -1
                0, 3_000, 7_500, 14_000, 23_000,
                35_000, 53_000, 77_000, 115_000, 160_000,
                235_000, 330_000, 475_000, 665_000, 955_000,
                1350000, 1900000, 2_700_000, 3_850_000, 5_350_000
                ];
            let expMedium = [
                0, 2_000, 5_000, 9_000, 15_000,
                23_000, 35_000, 51_000, 75_000, 105_000,
                155_000, 220_000, 315_000, 445_000, 635_000,
                890_000, 1_300_000, 1_800_000, 2_550_000, 3_600_000,
                ];
            let expFast = [
                0, 1_300, 3_300, 6_000, 10_000,
                15_000, 23_000, 34_000, 50_000, 71_000,
                105_000, 145_000, 210_000, 295_000, 425_000,
                600_000, 850_000, 1_200_000, 1_700_000, 2_400_000,
                ];

            await interaction.deferReply({ephemeral: true}); //приложение думает

            switch (progression){
                case 'fast': 
                    result = calcExpForLevel(input, expFast);
                    break;
                    
                case 'medium': 
                    result = calcExpForLevel(input, expMedium);
                    break;

                case 'slow':
                    result = calcExpForLevel(input, expSlow);
                    break;
            }

            await interaction.followUp({content: "Ввод: `"+ input + "`\nEXP: " + result + ` Для ${progression} прогрессии`, ephemeral: true});

            function calcExpForLevel(level, progression){
        
                let result = 0;
                let difference = progression[19] - progression[18]

                if(level<=0){
                    return 0
                }
        
                if(level<=20){
                    result = progression[level-1]
                    return result;
                }
            
                for(let i=20 ; i<level ; i++){
        
                    result += difference*2;
                    difference *= 2;
                }
        
                result += progression[19];
                return result;
            }
        }
    };