const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('generate')
        .setDescription('Сгенерировать статы для персонажа пф1')
        
        .addSubcommand(subcommand =>
            subcommand
                .setName('pointbuy')
                .setDescription('Проброс случайных статов на цену поинт бая')
                .addIntegerOption(option =>
                    option.setName('points')
                    .setDescription('Сколько очков на поинт-бай?')
                    .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stats')
                .setDescription('Проброс 4d6*1'))
        ,

        async execute(interaction) {	
            await interaction.deferReply({ephemeral: true});
            
            let maxPoints = interaction.options.getInteger('points', false);
            let scoreCosts = [-4,-2,-1,0,1,2,3,5,7,10,13,17];
            let scores = [7,8,9,10,11,12,13,14,15,16,17,18];
            let stats;

            if (interaction.options.getSubcommand() === 'stats') {
                stats = rollStats();
                await interaction.followUp({ content: stats, ephemeral: true});
            } else {
                

                if (maxPoints > 88){
                    await interaction.followUp({ content: 'Количество очков должно быть меньше 88', ephemeral: true});
                    return;
                }

                if (maxPoints < -22){// это минимальное окно где изменение на 1 вазможно и ничего не сломает
                    await interaction.followUp({ content: 'Количество очков должно быть больше чем -22', ephemeral: true});
                    return;
                }

                    stats = randomPointBuy(maxPoints) + 
                    randomPointBuy(maxPoints) + 
                    randomPointBuy(maxPoints) + 
                    randomPointBuy(maxPoints);
                    await interaction.followUp({ content: stats, ephemeral: true});
                
            }
            


            function randomPointBuy(points){ 
                let statsResult = [];
                
                do{

                    for ( let i = 0, n = 0 ; i < 6 ; i++ ){
                        n = roll(12)-1
                        points -= scoreCosts[n];
                        statsResult[i] = scores[n];
                    }

                }while(calcPrice(statsResult) != maxPoints);

                // bruteForceFourTwo();

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

                    return messageResult + '\nЦеной по ПБ: ' + costResult + '\n';
            }

            function calcPrice(statResult) {
                let costResult = 0;

                for (let i = 0, n = 0 ; i < statResult.length ; i++){
                    n = scores.indexOf(statResult[i]);
                    costResult += scoreCosts[n];
                }
                return costResult;
            }

            // function bruteForceForTwoLastStats(){
            //     for (let n = 0 ; n < scoreCosts.length ; n++){ //брутфорс для подбора последних 2 статов
            //         for (let m = 0 ; m < scoreCosts.length ; m++){
            //             if (scoreCosts[n] + scoreCosts[m] == points){
            //                 statsResult[4] = scores[n];
            //                 statsResult[5] = scores[m];
            //                 complete = true;
            //                 break;
            //             } else {
            //                 complete = false;
            //             }
            //         }
            //     }
            // }

            // function bruteForceFourTwo(){
            //     let n = 0;
            //     let pointsForRoll = 0;
            //     let complete = false;
            //     do{

            //         for (let i = 0 ; i < 4 ; i++){
    
            //             pointsForRoll = points / (6-i);
            //             do {
            //                 n = roll(12)-1
            //             } while(scoreCosts[n] > pointsForRoll);
    
            //             points -= scoreCosts[n];
            //             statsResult[i] = scores[n];
    
            //         }
    
            //         //console.log('Четыре ' + statsResult)
    
            //         bruteForceForTwoLastStats();
            //         //console.log('последние 2 ' + statsResult)
    
            //     }while (!complete && calcPrice(statsResult) != maxPoints) //  все ещё не работает как надо
            // }
        }
}