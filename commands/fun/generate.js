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
            
            let maxPoints = interaction.options.getInteger('points', false) ?? 0;
            let scoreCosts = [-4,-2,-1,0,1,2,3,5,7,10,13,17];
            let scores = [7,8,9,10,11,12,13,14,15,16,17,18];
            let stats;

            if (maxPoints === 0 || maxPoints < -24 || maxPoints > 102){
                stats = rollStats();
                await interaction.followUp({ content: stats, ephemeral: true});
            } else {
                stats = randomPointBuy(maxPoints);
                await interaction.followUp({ content: stats, ephemeral: true});
            }
            

            function randomPointBuy(points){ // не работает - добавить ограничители и починить 6й стат - лучше найти новый подход
                let statsResult = [];
                let n = 0;

                for (let i = 0 ; i < 5 ; i++){
                    n = roll(12)-1
                    points -= scoreCosts[n];
                    statsResult[i] = scores[n];
                }

                n = scoreCosts.indexOf(points);
                statsResult[5] = scores[n];
                console.log(statsResult);

                return generateOutputMessege(statsResult);
            }

            function rollStats(){
                let statResult = [0,0,0,0,0,0];

                for ( let i = 5 ; i >= 0 ; i-- ){
                    statResult[i] += rollDice(4,6);
                }

                return generateOutputMessege(statResult);

            }
            function rollDice(quantity, dice){
                let result = 0;
                let diceResults = [0,0,0,0];

                do{

                    for (let i = 0  ; i < quantity ; i++){
                        diceResults[i] = roll(dice)
                    }

                    diceResults.sort(function (a, b) {
                        return b - a;
                    });

                    result = diceResults[0] + diceResults[1] + diceResults[2];

                } while (result < 7 || result > 18);

                return result;
            }

            function roll(dice) {
                return Math.floor(Math.random() * dice)+1;
            }

            function generateOutputMessege(statResult){
                let messageResult = '';
                let costResult = 0;

                statResult.sort(function (a, b) {
                    return b - a;
                });

                for (let i = 0, n = 0 ; i < statResult.length ; i++){
                    messageResult += '(' + statResult[i] + ') ';

                    n = scores.indexOf(statResult[i]);
                    costResult += scoreCosts[n];
                }

                    return messageResult + '\nЦеной по ПБ: ' + costResult;
            }
        }
}