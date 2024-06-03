const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
    
        .setName('schedule')
        .setDescription('Вывести расписаний партий на неделю'),

        async execute(interaction) {		

            let schedule = 'График на неделю\n';
            let days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
            let games = [
                'пусто', 
                'Хрущь', 
                'пусто', 
                'Ваниль', 
                'Сильварилион', 
                'Усталав', 
                'пусто'
            ];
            let scheduleDate = '2024-06-03';
            let date = new Date(scheduleDate);
            let unixTimeStamp = Math.floor(date.getTime() / 1000);

            for (let i = 0 ; i < days.length; i++){
                schedule += days[i] + ' - ' + games[i] + '\n';
            }

            schedule += `<t:${unixTimeStamp}:d>`;

            await interaction.reply({ content: schedule, ephemeral: true}); 

        }
}