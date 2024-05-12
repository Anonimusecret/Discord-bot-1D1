const { SlashCommandBuilder, ChannelType } = require('discord.js');
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
        .addChannelOption(option => //поле для ввода названия канала
            option.setName('channel')
                .setDescription('The channel to echo into')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(false))
        .addStringOption(option => //поле для ввода boolean
            option.setName('ephemeral')
                .setDescription('Whether or not the echo should be ephemeral')
                .setRequired(false)
                .addChoices(
                    { name: 'yes', value: 'true' },
                    { name: 'no', value: 'false' }
                )
        ),
        
        async execute(interaction) {
            
            const isEphemeral = interaction.options.getBoolean('ephemeral', true);
            const channel = interaction.options.getChannel('channel', true);
            const input = interaction.options.getString('input', true);
            await interaction.deferReply({ ephemeral: true }); // приложение думает
            //await interaction.reply({content: 'Я встал!', ephemeral: true}); //эфемерный ответ
            await interaction.reply({ content: input, ephemeral: isEphemeral/*, channel: channel*/ }); //super experiment
            await wait(4_000);
		    await interaction.editReply('Я опечатался!');
            //await wait(2_000);
            //await interaction.followUp('Не смейтесь!'); //followUp - ещё сообщение
            //await interaction.followUp('блин');
            const message = await interaction.fetchReply();
            console.log(message);
            //await interaction.deleteReply(); // удалить ответ
        }
};