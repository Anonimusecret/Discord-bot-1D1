const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('roll')
        .setDescription('roll some dice')
        .addStringOption(option =>
            option.setName('request')
            .setDescription('Ввод одной фразой')
            .setRequired(true)
        ),
        async execute(interaction) {
            await interaction.deferReply();
            let sum = 0;
            const request = interaction.options.getString('request', true);
            let rolls = [];
            const diceRegex = /(\d+)d(\d+)/g
            let mistakeQ = false;
            let mistakeD = false;
            let mistakeSum = false;
            if (request === '1d1'){
                await interaction.followUp("<:crit:1037660173659029505> **Сервер запривачен** <:crit:1037660173659029505>"); //пасхалка
            } 

            function roll(quantity, dice) {
                
                let result = 0;
                dice = Math.floor(dice);
                rolls += '['
                if (quantity > 100){
                    mistakeQ = true;
                    rolls += 0;
                }
                else if (dice > 1000){
                    mistakeD = true;
                    rolls += 0;
                } else {
                    for( let q = quantity ; q > 0; q-- ){ // бросаем каждый куб отдельно
                        let roll = Math.floor(Math.random() * dice)+1
                        if (q === quantity){
                            rolls += roll;
                        } else {
                            rolls += ', ' + roll;
                        }
                        result += roll;
                    }
                }
                rolls += ']'
                return result;
            };
            
            let result = request;
            let match;
            while (match = diceRegex.exec(request)){
                result = result.replace(match[0], roll(match[1], match[2]));
            };
            if(mistakeQ){
                await interaction.followUp('Простите, бросить больше 100 кубов за раз нельзя');
            } else if(mistakeD){
                await interaction.followUp('Простите, бросить куб больше 1d1000 нельзя');
            } else {
                try {
                    sum = eval?.(`"use strict";(${result})`) 
                } catch (error) {
                    console.error(error);
                    await interaction.followUp('Ошибка в формуле броска');
                    mistakeSum = true;
                }
                if(!mistakeSum){
                    try {
                        await interaction.followUp(`${interaction.user/*.displayName*/} Роллит: ` + '`' + request + '`' + '\nПроброс: `' + rolls + '`' + '\nИтого: ' + sum);
                    } catch (error) {
                        console.error(error);
                        await interaction.followUp('Слишком длинный ответ. Невозможно вывести из-за ограничений Дискорда');
                    }
                }
            }
        }
};