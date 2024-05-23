const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('quote')
        .setDescription('Увековечить цитату анонимно')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('Цитата которую нужно сказать')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('speaker')
            .setDescription('Кто это сказал?')
            .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('chanel')
            .setDescription('Канал куда отправить сообщение')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(false)
        )
        ,

        async execute(interaction) {
            await interaction.deferReply({ ephemeral: true });
            let channel = interaction.options.getChannel('chanel', false) ?? interaction.channel;
            let input = interaction.options.getString('input', true);
            channel.send(input)
            .then( await interaction.editReply({ content: 'Отправлено', ephemeral: true}))
        }
}
