const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Events } = require('discord.js');

module.exports = {
    cooldown: 0,
    data: new SlashCommandBuilder()
    
        .setName('r')
        .setDescription('roll some dice')
        ,

        async execute(interaction) {

            const rollButton = new ButtonBuilder()
                .setCustomId('rollButton')
                .setLabel('Roll')
                .setStyle(ButtonStyle.Primary);
            
            const row = new ActionRowBuilder()
                .addComponents(rollButton);

            const response = await interaction.reply({
                content: `Нажмите на кнопу чтобы бросить 1d20`,
                components: [row],
            });

            // Examples:
                // Create a button interaction collector
            // const filter = (interaction) => interaction.customId === 'button' && interaction.user.id === 'someId';
            // const collector = channel.createMessageComponentCollector({ filter, time: 15_000 });
            // collector.on('collect', interaction => console.log(`Collected ${interaction.customId}`));
            // collector.on('end', collected => console.log(`Collected ${collected.size} items`));

            const collectorFilter = i => i.user.id === interaction.user.id;
            let rollResult = '';
            let roll;

            const collector = response.createMessageComponentCollector({ filter: collectorFilter, time: 3_600_000 });

            collector.on('collect', async i => {
                //const selection = i.values[0];

                roll = Math.floor(Math.random() * 20)+1

                if (roll === 20){
                    rollResult = roll + ' **Критический успех** <:crit:1037660173659029505>'
                    await interaction.editReply({
                        content: 'Нажмите на кнопу чтобы бросить 1d20 \nРезультат: ' + rollResult ,
                        components: [row],
                    });
                } else if (roll === 1){
                    rollResult = roll + ' **Критический провал** <:Cubes:956132971725869076>'
                    await interaction.editReply({
                        content: 'Нажмите на кнопу чтобы бросить 1d20 \nРезультат: ' + rollResult ,
                        components: [row],
                    });
                } else {
                    rollResult = String(roll);
                    await interaction.editReply({
                        content: 'Нажмите на кнопу чтобы бросить 1d20 \nРезультат: ' + rollResult ,
                        components: [row],
                    });
                }
                await i.reply({content: 'Заролено ' + rollResult , ephemeral: true});
                // await i.reply(`${i.user} has selected ${selection}!`);
            });

            collector.on('end', async collected => await interaction.editReply(`Брошено ${collected.size} кубов`));


            // try {
            //\     const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            //     roll = Math.floor(Math.random() * 20)+1
            //     if (roll === 20){
            //         rollResult = roll + ' **Критический успех** <:crit:1037660173659029505>'
            //         await interaction.editReply({
            //             content: 'Нажмите на кнопу чтобы бросить 1d20 \nРезультат: ' + rollResult ,
            //             components: [],
            //         });
            //     } else if (roll === 1){
            //         rollResult = roll + ' **Критический провал** <:Cubes:956132971725869076>'
            //         await interaction.editReply({
            //             content: 'Нажмите на кнопу чтобы бросить 1d20 \nРезультат: ' + rollResult ,
            //             components: [],
            //         });
            //     } else {
            //         rollResult = String(roll);
            //         await interaction.editReply({
            //             content: 'Нажмите на кнопу чтобы бросить 1d20 \nРезультат: ' + rollResult ,
            //             components: [],
            //         });
            //     }
            // } catch (e) {
            //     await interaction.editReply({ content: 'Кнопку не нажали', components: [] });
            // }

            
        }
}