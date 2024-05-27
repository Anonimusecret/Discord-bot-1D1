const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('generate')
        .setDescription('Сгенерировать статы для персонажа пф1')
        .addIntegerOption(option =>
            option.setName('points')
            .setDescription('Сколько очков на поинт-бай?')
            .setRequired(false)
        )
        ,

        async execute(interaction) {	
            await interaction.deferReply({ephemeral: true});	
            
            let maxPoints = interaction.options.getInteger('points', false);
            let stats = rollStats();

            await interaction.followUp({ content: stats, ephemeral: true});

            function rollStats(){
                let statResult = [0,0,0,0,0,0];
                let messageResult = '';

                for ( let i = 5 ; i >= 0 ; i-- ){

                    statResult[i] += roll(4,6);

                }

                // console.log(statResult);

                statResult.sort(function (a, b) {
                    return b - a;
                }
            );
            // console.log(statResult);

            for (let i = 0 ; i < 5 ; i++){
                messageResult += '(' + statResult[i] + ') ';
            }


                return messageResult;

            }
            function roll(quantity, dice){
                let roll = function(dice) {
                    return Math.floor(Math.random() * dice)+1;
                }
                let result = 0;
                let diceResults = [0,0,0,0];

                for (let i = 0  ; i < quantity ; i++){

                    diceResults[i] += roll(dice)

                }

                // console.log('diceResults');
                // console.log(diceResults);

                diceResults.sort(function (a, b) {
                    return b - a;
                }
            );
                // console.log('diceResultsSorted');
                // console.log(diceResults);

                return result = diceResults[0] + diceResults[1] + diceResults[2];

            }

        }
}