const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('help')
        .setDescription('Информация о пользовании ботом и командами')
        .addSubcommand(subcommand =>
            subcommand
                .setName('roll')
                .setDescription('Информация про команду /roll')
                //.addUserOption(option => option.setName('target').setDescription('The user'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('exp')
                .setDescription('Информация про команду /exp')
        )
        ,

        async execute(interaction) {
            //код тут
            await interaction.deferReply({ephemeral: true}); //приложение думает

            const request = interaction.options.getSubcommand();
            const choises = ["roll", "exp"];

            switch (request){
                case 'exp':
                    await interaction.followUp({content: 
                    "Для использования команды `/exp` введите в поле **request** CR енкаунтеров через запятую, плюс или пробел.\n"+
                    "Пример: `[12+13+14]`\n"+
                    "Для ввода большого количества одинаковых CR проще использовать `CR*количество` использкя символ `*`\n"+
                    "Пример: `[12*2+6*12]`\n"+
                    "**Важно!** Сначала написать CR и только потом количество\n"+
                    "**Важно!** Не использовать пробел между CR, умножением и количеством",
                    ephemeral: true})
                    break;
                case 'roll':
                    await interaction.followUp({content: 
                    "Для использования команды `/roll` введите в поле **request** формулу броска.\n"+
                    "Поддерживается сложение `+`, вычитание `-`, умножение `*`, деление `/` и возведение в степень`**`"+
                    "Пример: `[4+2d6+8*4-2]`\n"+
                    "Для броска куба используйте `d` как `xdx`\n"+
                    "Пример: `[1d1]`\n"+
                    "**Важно!** Не используйте пробелы\n"+
                    "**Важно!** Задавая кубы используйте итоговые числа до и после `d`",
                    ephemeral: true})
                    break;
                default:
                await interaction.followUp({content: 
                    `Бот для дискорда ${interaction.client.user.tag} разработан для личных целей сервера [D1]Сиситеа одного куба[D1]\n`+
                    "На данный момент доступны команды:\n"+
                    "**/roll** - проброс кубиков с модификаторами\n"+
                    "**/exp** - калькулятор CR для первого пасфайндера\n",
                    ephemeral: true})
                    break;
            }
            

        }
}