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
            const request = interaction.options.getString('request', true);
            const quantity = request.substring(0, request.indexOf('d'));
            const dice = request.substring(request.indexOf('d') + 1);
            const modif = request.substring(request.indexOf('+'));
            if(quantity > 100){
                await interaction.followUp('Простите, бросить больше 100 кубов нельзя');
            } else if (dice > 1000){
                await interaction.followUp('Простите, бросить куб больше d1000 нельзя');
            } else {

                for( let q = quantity ; q > 0; q-- ){
                    let roll = (Math.floor(Math.random() * dice)+1);
                    
                    if( q === quantity ){
                        message += roll
                    } else {
                        message += ', ' + roll
                    }
                    sum += roll;
                }

                sum += modif;
                message += ']` \nСуммарно = `' + sum + '`'
                await interaction.followUp(`${interaction.user.globalName} Роллит ` + '`' + request + '`' + message );
            }
        }
};