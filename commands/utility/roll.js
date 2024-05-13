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
            let message = '\n`[';
            let sum = 0;
            let pattern = /[\+|\-|*|\/]/; //регулярные выражения + - * и / 
            let diceToken = /d/;
            const request = interaction.options.getString('request', true);
            let process = request;
            let formula = '';
            while (process.length > 0){
                // понять есть ли до 2d20 что-то
                let check = process.substring(0, process.indexOf(process.match(pattern)) + 1);
                formula += process.substring(0, process.indexOf(process.match(pattern)) + 1);
                if(diceToken.test(formula)){
                    formula = formula.replace(process.substring(0, process.indexOf(process.match(pattern)) + 1), '');
                } else {
                    process = process.replace(formula , '');
                }
                
                let quantity = process.substring(0, process.indexOf('d'));
                let dice = process.substring(process.indexOf('d') + 1, process.indexOf(process.match(pattern)));
                // тут роллим
                for( let q = quantity ; q > 0; q-- ){ // бросаем каждый куб отдельно
                    let roll = (Math.floor(Math.random() * dice)+1);
                    
                    if( q === quantity ){
                        formula += roll
                        message += roll
                    } else {
                        formula += '+' + roll
                        message += ', ' + roll
                    }
                }
                console.log('quantity = ' + quantity); 
                console.log('dice = ' + dice);
                console.log('formula = ' + formula);
                //тут меняем
                process = process.replace(process.substring(0, process.indexOf(dice) + 1) , '');
                if (!diceToken.test(process)){
                    formula += process;
                    process = '';
                }
            }
            try {
                sum = eval(formula);
            } catch (error) {
                console.error(error);
            }
            message += ']` \nСуммарно = `' + sum + '`' // закрываем сообщение
            await interaction.followUp(`${interaction.user.globalName} Роллит ` + '`' + request + '`' + message); // выводим результат

            /*
            let quantity = request.substring(0, request.indexOf('d'));
            let dice = request.substring(request.indexOf('d') + 1, request.indexOf('+'));
            let modif = request.substring(request.indexOf('+') + 1);
            let sumMod = 0;
            
            if (request.indexOf('+') != -1){ // вытягиваем кость до модификатора
                dice = request.substring(request.indexOf('d') + 1, request.indexOf('+'));
            } else { // или просто берем её если модификатора нет
                dice = request.substring(request.indexOf('d') + 1);
            }
            

            
            if(quantity > 100){
                await interaction.followUp('Простите, бросить больше 100 кубов нельзя');
            } else if (dice > 1000){
                await interaction.followUp('Простите, бросить куб больше d1000 нельзя');
            } else {

                for( let q = quantity ; q > 0; q-- ){ // бросаем каждый куб отдельно
                    let roll = (Math.floor(Math.random() * dice)+1);
                    
                    if( q === quantity ){
                        message += roll
                    } else {
                        message += ', ' + roll
                    }
                    sum += roll; // суммируем результат бросков
                }

                
                if (pattern.test(request) != -1 ){ // если есть модификатор к броску то считаем его к сумме
                    //let sumMod = 0; //обьявление суммы модификаторов тут, но для теста пока в комментарии и обьявлено выше
                    while( modif.indexOf('+') != -1 ){ // если модификатор не +x а +x+y+z+...+n

                        sumMod += Number(modif.substring(0, modif.indexOf('+')));
                        //console.log(sumMod);
                        modif = modif.replace(modif.substring(0, modif.indexOf('+') + 1), '');
                        //console.log(modif);

                    }
                    //console.log(request.indexOf('+'));
                    sumMod += Number(modif); //добавляем  последнюю цифру в модификаторе ибо цикл её не считает
                    sum += sumMod;// прибавляем к сумме результатов броска итоговый модификатор
                } else {
                    modif = 0;
                
                message += ']` \nСуммарно = `' + sum + '`' // закрываем сообщение
                await interaction.followUp(`${interaction.user.globalName} Роллит ` + '`' + request + '`' + message + '\nМодификатор: ' + sumMod ); // выводим результат
            
            }}*/
        }
};