const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('help')
        .setDescription('Информация о пользовании ботом и командами')
        .addStringOption(option =>
			option.setName('command')
				.setDescription('Phrase to search for')
				.setAutocomplete(true))
        ,

        async autocomplete(interaction) {

            const focusedValue = interaction.options.getFocused();
            const choices = [
                "roll - бросить кубики", 
                "exp - посчитать CR", 
                "quote - добавить цитату", 
                "say - отправить сообщене в чат", 
                "r - бросок d20",
                "schedule - расрписание партий на неделю",
                "level - количество EXP для уровня",
                "reload - перезагрузить команду[DEV_ONLY]", 
                "test - тестовая команда [DEV_ONLY]",
        ];
            const filtered = choices.filter(choice => choice.startsWith(focusedValue));

            await interaction.respond(
                filtered.map(choice => ({ name: choice, value: choice })),
            );
        },

            async execute(interaction) {

            //await interaction.deferReply({ephemeral: true}); //приложение думает

            let exampleEmbed = {
                color: 0x000000,
                title: '0',
                description: '0',
                fields: [
                    {
                        name: '**Информация**',
                        value: 'Время перезарядки:',
                    },
                    {
                        name: '**Пример:**',
                        value: 'пример',
                        inline: false,
                    },
                    {
                        name: '**Важно!**',
                        value: 'Важно',
                        inline: false,
                    },
                    {
                        name: '**Важно!**',
                        value: 'Важно',
                        inline: false,
                    },
                ],
                timestamp: new Date().toISOString(),
            };



            const request = interaction.options.getString('command', false);
            
            switch (request){
                case 'exp - посчитать CR':
                    exampleEmbed.title = 'Информация о команде `/exp`';
                    exampleEmbed.description = 'Для использования команды `/exp` введите в поле **request** CR енкаунтеров через запятую, плюс или пробел.\nДля ввода большого количества одинаковых CR проще использовать `CR*количество` использкя символ `*`\n';
                    exampleEmbed.fields[0].value += ' `0 секунд`'
                    exampleEmbed.fields[1].value = '`/exp 12+13+14*2`\nСложить итоговый опыт.'
                    exampleEmbed.fields[2].value = 'Сначала написать CR и только потом количество'
                    exampleEmbed.fields[3].value = 'Не использовать пробел между CR, умножением и количеством'
                    await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
                    break;

                case 'roll - бросить кубики':
                    exampleEmbed.title = 'Информация о команде `/roll`';
                    exampleEmbed.description = 'Бросить кубики.';
                    exampleEmbed.fields[0].value += ' `0 секунд`'
                    exampleEmbed.fields[1].value = '`/roll 4+2d6+2d10+8*4-2`\nБросить кубики и сразу посчитать модификаторы.'
                    exampleEmbed.fields[2].value = 'Не используйте пробелы'
                    exampleEmbed.fields[3].value = 'Задавая кубы используйте итоговые числа до и после `d`'
                    await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
                    break;

                case 'quote - добавить цитату':
                    exampleEmbed.title = 'Информация о команде `/quote`';
                    exampleEmbed.description = 'Увековечить цитату';
                    exampleEmbed.fields[0].value += ' `5 секунд`'
                    exampleEmbed.fields[1].value = '`/quote Я мыслю, соответственно я существую @user`\nОтправить цитату в чат `#цитатник` с упоминанием @user.'
                    exampleEmbed.fields[2].value = 'Убедитесь что вы не совершили оишбок! Сообщение будет трудно удалить'
                    exampleEmbed.fields[3].value = 'Сказавший цитату должен быть членом сервера, иначе его нельзя будет выбрать'
                    await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
                    break;
                    
                case 'say - отправить сообщене в чат':
                    exampleEmbed.title = 'Информация о команде `/say`';
                    exampleEmbed.description = 'Отправить сообщение в чат от имени бота';
                    exampleEmbed.fields[0].value += ' `0 секунд`'
                    exampleEmbed.fields[1].value = '`/say Я мыслю, соответственно я существую`\nОтправить сообщение в текущий чат.'
                    exampleEmbed.fields[2].name = '**Пример 2**'
                    exampleEmbed.fields[2].value = '`/say Я мыслю, соответственно я существую #general`\nОтправить сообщение в чат #general.'
                    exampleEmbed.fields[3].value = 'Убедитесь что вы не совершили оишбок! Сообщение будет трудно удалить'
                    await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
                    break;
                    
                case 'r - бросок d20':
                    exampleEmbed.title = 'Информация о команде `/r`';
                    exampleEmbed.description = 'Появится кнопка Roll при нажатии на которую бросится куб d20 и выведется результат';
                    exampleEmbed.fields[0].value += ' `0 секунд`'
                    exampleEmbed.fields[1].value = '`/r'
                    exampleEmbed.fields[2].value = 'Кнопка многоразовая, но активна только для того, кто ввел команду.'
                    exampleEmbed.fields[3].value = 'Команда использует кастомные смайлики'
                    await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
                    break;

                case 'schedule - расрписание партий на неделю':
                    exampleEmbed.title = 'Информация о команде `/schedule`';
                    exampleEmbed.description = 'Вывести расписание партий на неделю';
                    exampleEmbed.fields[0].value += ' `0 секунд`'
                    exampleEmbed.fields[1].value = '`/schedule'
                    exampleEmbed.fields[2].value = 'Убедитесь что дата выведепнная командой совпадает с датой начала недели.'
                    exampleEmbed.fields[3].value = 'Команда пока в разработке'
                    await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
                    break;

                case 'level - количество EXP для уровня':
                        exampleEmbed.title = 'Информация о команде `/level`';
                        exampleEmbed.description = 'Напишите уровень и получиите количество опыта для этого уровня в зависимости от прогрессии';
                        exampleEmbed.fields[0].value += ' `0 секунд`'
                        exampleEmbed.fields[1].value = '`/level 24 fast'
                        exampleEmbed.fields[2].value = 'Если не указать прогрессию, EXP автоматически посчитается по средней.'
                        exampleEmbed.fields[3].value = 'При уровне ниже 1 выведется `0`'
                        await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
                        break;
                    
                case 'reload - перезагрузить команду[DEV_ONLY]':
                    await interaction.reply({content: 
                        "Для использования команды `/reload` ничего вводить не надо.\n"+
                        "Команда используется разработчиком бота для обновления команды без перезапуска бота"+
                        "**Важно!** Не используйте команду если вы не разработчик\n"+
                        "**Важно!** Эту команду могу использовать только администраторы сервера",
                    ephemeral: true})
                    break;
                    
                case 'test - тестовая команда [DEV_ONLY]':
                    await interaction.reply({content: 
                    "Для использования команды `/test` ничего вводить не надо.\n"+
                    "Команда используется разработчиком бота для проверки функций"+
                    "**Важно!** Не используйте команду если вы не разработчик\n"+
                    "**Важно!** Эту команду могу использовать только администраторы сервера",
                    ephemeral: true})
                    break;

                

                default:
                await interaction.reply({content: 
                    `Бот для дискорда ${interaction.client.user.tag} разработан для личных целей сервера [D1]Сиситеа одного куба[D1]\n`+
                    "На данный момент доступны команды:\n"+
                    "**/roll** - проброс кубиков с модификаторами\n"+
                    "**/exp** - калькулятор CR для первого пасфайндера\n"+
                    "**/quote** - добавить цитату в цитатник"+
                    "**/say** - отправить сообщене в чат от лица бота"+
                    "**/r** - бросок d20 по кнопке", 
                    ephemeral: true})
                    break;
            }
            
        }
}