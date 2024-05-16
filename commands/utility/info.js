const { AttachmentBuilder, SlashCommandBuilder } = require('discord.js');

const { createCanvas, Image } = require('@napi-rs/canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Provides information about the server or a user.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Info about a user')
				.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Info about the server'))
				.setDMPermission(false), // использование команды через личку бота
				

	async execute(interaction) {


		if (interaction.options.getSubcommand() === 'user'){
			
			const user = interaction.options.getUser('target');


			const applyText = (canvas, text) => {
				const context = canvas.getContext('2d');
				let fontSize = 70;
			
				do {
					context.font = `${fontSize -= 10}px sans-serif`;
				} while (context.measureText(text).width > canvas.width - 300);
			
				return context.font;
			};
			

			if (user){
				const canvas = createCanvas(700, 250);
				const context = canvas.getContext('2d');

				const background = await readFile('./wallpaper.jpg');
				const backgroundImage = new Image();
				backgroundImage.src = background;
				context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

				context.strokeStyle = '#0099ff';
				context.strokeRect(0, 0, canvas.width, canvas.height);

				context.font = '28px sans-serif';
				context.fillStyle = '#ffffff';
				context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);

				context.font = applyText(canvas, `${user.username}!`);
				context.fillStyle = '#ffffff';
				context.fillText(`${user.username}!`, canvas.width / 2.5, canvas.height / 1.8);

				context.beginPath();
				context.arc(125, 125, 100, 0, Math.PI * 2, true);
				context.closePath();
				context.clip();

				const { body } = await request(user.displayAvatarURL({ format: 'jpg' }));
				const avatar = new Image();
				avatar.src = Buffer.from(await body.arrayBuffer());
				context.drawImage(avatar, 25, 25, 200, 200);

				const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });

				await interaction.reply({ files: [attachment] });

				// await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
			} else {
				const canvas = createCanvas(700, 250);
				const context = canvas.getContext('2d');

				const background = await readFile('./wallpaper.jpg');
				const backgroundImage = new Image();
				backgroundImage.src = background;
				context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

				context.strokeStyle = '#0099ff';
				context.strokeRect(0, 0, canvas.width, canvas.height);

				context.font = '28px sans-serif';
				context.fillStyle = '#ffffff';
				context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);

				context.font = applyText(canvas, `${interaction.member.displayName}!`);
				context.fillStyle = '#ffffff';
				context.fillText(`${interaction.member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

				context.beginPath();
				context.arc(125, 125, 100, 0, Math.PI * 2, true);
				context.closePath();
				context.clip();

				const { body } = await request(interaction.user.displayAvatarURL({ format: 'jpg' }));
				const avatar = new Image();
				avatar.src = Buffer.from(await body.arrayBuffer());
				context.drawImage(avatar, 25, 25, 200, 200);

				const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });

				await interaction.reply({ files: [attachment] });

				// await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
			}
		}
		if (interaction.options.getSubcommand() === 'server'){
			await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
		}
	}
};