const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('poll')
        .setDescription('Создать скрытое голосование')
        .addStringOption(option =>
			option.setName('option_one')
				.setDescription('Первый вариант для голосования')
                .setRequired(true)
            )
        .addStringOption(option =>
            option.setName('option_two')
                .setDescription('Второй вариант для голосования')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('timer')
                .setDescription('Сколько будет длиться голосование?')
                .setRequired(false)
        )
        ,

    async execute(interaction) {

        const optionFirst = interaction.options.getString('option_one', true);
        const optionSecond = interaction.options.getString('option_two', true);

        await interaction.reply({content: `${interaction.user} запускает голосование!`})
        

        const select = new StringSelectMenuBuilder()
			.setCustomId('poll')
			.setPlaceholder('Голосуйте за ваш вариант тут!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
                    .setLabel(optionFirst)
                    .setDescription('Option 1')
                    .setValue(`optionFirst`),
                new StringSelectMenuOptionBuilder()
                    .setLabel(optionSecond)
                    .setDescription('Option 2')
                    .setValue(optionSecond)
			);
        
            const row = new ActionRowBuilder()
                .addComponents(select);

            await interaction.followUp({
                content: 'Голосуем! \nГолосование закончится через [время]',
                components: [row],
            });

            let voted = [];
            let votesCount = 0;
            let votesForFirst = 0;
            let votesForSecond = 0;
            const timer = interaction.options.getInteger('timer', false)*1000 ?? 30_000;

            const isUserVoted = i => {
                i.deferUpdate(); 
                for (key in voted){ 
                    if (i.user.id == voted[key]){
                        return false
                    }
                }
                return true;
            }
            const collector = interaction.channel.createMessageComponentCollector({ 
                filter: isUserVoted,
                componentType: ComponentType.StringSelect,  
                time: timer,
            });

            collector.on('collect', i => {
                console.log(`${i.user.globalName} проголосовал за ${i.values[0]}`);
    
                voted[votesCount] = i.user.id;
                votesCount++;

                if (i.values[0] == 'option_1'){
                    votesForFirst++
                } else {
                    votesForSecond++
                }
            });

            collector.on('end', async collected => {
                console.log(`Проголосовало ${collected.size} человек`);
                await interaction.followUp({
                    content: 
                        'За ' + optionFirst + ' проголосовало ' + votesForFirst + 
                        '\nЗа ' + optionSecond + ' проголосовало ' + votesForSecond + 
                        '\nВсего проголосовало ' + votesCount + ' человек'
                })
            });


    }
}