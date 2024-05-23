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
        .addUserOption(option =>
            option.setName('speaker')
            .setDescription('Кто это сказал?')
            .setRequired(true)
        )
        ,

        async execute(interaction) {
            await interaction.deferReply({ ephemeral: true });
            //console.log(interaction.channel);
            let channel = interaction.guild.channels.cache.get('835877817580912650');// с**а да. вот как нужно дергать кэш из интеракции PS - цифры это id канала
            let input = interaction.options.getString('input', true);
            let speaker = interaction.options.getUser('speaker', true);
            channel.send(input + ` ${speaker}`)
            .then( await interaction.editReply({ content: `Цитирован ${speaker}`, ephemeral: true}))
        }
}
