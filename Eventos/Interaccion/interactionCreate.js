const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const Configuracion = require('../../Esquemas/ConfiguracionSchema');

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({
          content: "Este comando tiene errores de nivel alto, comprueba la consola para ver los errores",
        });
      }

      const guildId = interaction.guild.id;
      const config = await Configuracion.findOne({ guildId });

      if (command.admin) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor('Red')
                .setDescription(':warning: | Este comando es solo para administradores')
            ],
            ephemeral: true
          });
        }
      }

      if (command.dev) {
        if (!config || !config.Developers.includes(interaction.user.id)) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor('Red')
                .setDescription(':warning: | Este comando es solo para desarrolladores')
            ],
            ephemeral: true
          });
        }
      }

      if (command.staff) {
        const memberRoles = interaction.member.roles.cache.map(role => role.id);
        const hasStaffRole = config && config.StaffRoles.some(roleId => memberRoles.includes(roleId));
        if (!hasStaffRole) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor('Red')
                .setDescription(':warning: | Este comando es solo para el staff')
            ],
            ephemeral: true
          });
        }
      }

      if (command.desarrollo && (!config || !config.Developers.includes(interaction.user.id))) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('Red')
              .setDescription(':warning: | Este comando está en desarrollo, intenta más tarde')
          ],
          ephemeral: true
        });
      }

      // Si pasa todas las verificaciones, ejecuta el comando
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        interaction.reply({
          content: "Hubo un error al ejecutar este comando.",
          ephemeral: true,
        });
      }
    }
  },
};