const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('say')
        .setDescription('Сказать фразу в чат')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('Фраза которую нужно сказать')
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
