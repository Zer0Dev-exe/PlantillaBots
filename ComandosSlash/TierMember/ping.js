const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Haz ping al bot'),
    devMode: true,

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('Ping del bot')
            .setDescription(`Pong ${client.ws.ping}ms :ping_pong:`)
            .setColor('Orange');

        interaction.reply({ embeds: [embed] });
    }
};
