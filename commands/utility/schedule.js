const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
    
        .setName('schedule')
        .setDescription('Вывести расписаний партий на неделю'),

        async execute(interaction) {		

            //let schedule = 'Привет График на неделю\n1 пусто\n2 хрущь\n3  пусто\n4 Ваниль\n5 Сильварилион\n6 Усталав\n7 пусто';
            let schedule = 'Привет График на неделю\n';
            let week = {
                Понедельник: 'пусто',
                Вторник: 'хрущь',
                Среда: 'нет',
                Четверг: 'Ваниль',
                Пятница: 'Сильварилион',
                Суббота: 'Усталав',
                Воскресенье: 'ничего',
            }

            for (let day in week){ // если 2 раза встречается оинаковые значение оно плохо работает

                schedule += propName(week, week[day]) + ' - ' + week[day] + '\n';

            }



            await interaction.reply({ content: schedule, ephemeral: true}); 

            function propName(prop, value) { // код гавна. придумать способ адекватнее
                let res = '';
                for (var i in prop) {
                    if (typeof prop[i] == 'object') {
                        if (propName(prop[i], value)) {
                            return res;
                        }
                    } else {
                        if (prop[i] == value) {
                            res = i;
                            return res;
                        }
                    }
                }
                return undefined;
            }

        }
}