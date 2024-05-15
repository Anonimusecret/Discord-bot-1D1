const { Events, TextInputBuilder, TextInputStyle, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ChannelType, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { channel } = require('node:diagnostics_channel');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test!')
        .addStringOption(option => //поле для ввода string
            option.setName('input')
                .setDescription('The input to echo back'))
                
        // .addChannelOption(option => //поле для ввода названия канала
        //     option.setName('channel')
        //         .setDescription('The channel to echo into')
        //         .addChannelTypes(ChannelType.GuildText)
        //         .setRequired(false))
        .addStringOption(option => //поле для ввода boolean
            option.setName('ephemeral')
                .setDescription('Whether or not the echo should be ephemeral')
                .setRequired(false)
                .addChoices(
                    { name: 'yes', value: 'true' },
                    { name: 'no', value: 'false' }
                ) 
        )
        ,
        
        async execute(interaction) {
            // const isEphemeral = interaction.options.getBoolean('ephemeral', true);
            // const channel = interaction.options.getChannel('channel', true);
            // 
            // await interaction.deferReply({ ephemeral: true }); // приложение думает
            // await interaction.reply({content: 'Я встал!', ephemeral: true}); //эфемерный ответ
            // await interaction.reply({ content: input, ephemeral: isEphemeral }); //super experiment
            // await wait(4_000);
		    // await interaction.editReply('Я опечатался!');
            // await wait(2_000);
            // await interaction.followUp('Не смейтесь!'); //followUp - ещё сообщение
            // await interaction.followUp('блин');
            // const message = await interaction.fetchReply();
            // console.log(message);
            // await interaction.deleteReply(); // удалить ответ 

            // -------------------------------------------------------
            
            // const danger = new ButtonBuilder()
            //     .setCustomId('danger')
            //     .setLabel('Danger')
            //     .setStyle(ButtonStyle.Danger);

            // const primary = new ButtonBuilder()
            //     .setCustomId('primary')
            //     .setLabel('Primary')
            //     .setStyle(ButtonStyle.Primary);

            //     const succes = new ButtonBuilder()
            //     .setCustomId('succes')
            //     .setLabel('Success')
            //     .setStyle(ButtonStyle.Success);
    
            // const secondary = new ButtonBuilder()
            //     .setCustomId('secondary')
            //     .setLabel('Secondary')
            //     .setStyle(ButtonStyle.Secondary);

            // const rickLink = new ButtonBuilder() // Кнопка с ссылкой без setCustomId
            //     //.setLabel('')
            //     .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            //     .setStyle(ButtonStyle.Link)
            //     // .setDisabled(true); // чтоб кнопка потухла
            //     .setEmoji('884214811485941820');

            //     const row = new ActionRowBuilder()
            //     .addComponents(danger, primary, succes, secondary, rickLink);

                // -------------------------------------------------------

            // const select = new StringSelectMenuBuilder()
			// .setCustomId('starter')
			// .setPlaceholder('Make a selection!')
            // // .setMinValues(1) //можно не ставить для одиночного выбора
			// // .setMaxValues(2) //можно не ставить для одиночного выбора
			// .addOptions(
			// 	new StringSelectMenuOptionBuilder()
			// 		.setLabel('Bulbasaur')
			// 		.setDescription('The dual-type Grass/Poison Seed Pokémon.')
			// 		.setValue('bulbasaur'),
			// 	new StringSelectMenuOptionBuilder()
			// 		.setLabel('Charmander')
			// 		.setDescription('The Fire-type Lizard Pokémon.')
			// 		.setValue('charmander'),
			// 	new StringSelectMenuOptionBuilder()
			// 		.setLabel('Squirtle')
			// 		.setDescription('The Water-type Tiny Turtle Pokémon.')
			// 		.setValue('squirtle'),
			// );

            

            // const row = new ActionRowBuilder()
            //     .addComponents(select);


            // const input = interaction.options.getString('input', true);
            // const message = String(input);
            // const isEphemeral = interaction.options.getString('ephemeral') === 'true'
            // const response = await interaction.reply({
            //     content: message, 
            //     ephemeral: isEphemeral,
            //     components: [row]
            // });

            // const collectorFilter = i => i.user.id === interaction.user.id; // фильтр пользователя который вызвал команду

            // try {
            //     const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 }); //ждем тыка на компонент time сукунд
            //     // console.log(confirmation.values);
            //     if (confirmation.values[0] === 'charmander') {
            //         await confirmation.update({ content: `Мужик.`, components: [] });
            //     } else if (confirmation.values[0] === 'squirtle' || confirmation.values[0] === 'bulbasaur') {
            //         await confirmation.update({ content: 'Зря. Зря.', components: [] });
            //     }
            // } catch (e) {
            //     await interaction.editReply({ content: 'Долго не тыкали, отменяю', components: [] });
            // }


//-----------------------------------------------------------


        }
};