const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        let channel = client.channels.cache.get('886293737381171201');// id канала оповещений - 888740347340005437
        let schedule = 'schedule test';
		//channel.send(schedule);
	},
};