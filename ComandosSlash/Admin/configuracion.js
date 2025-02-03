const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const Configuracion = require('../../Esquemas/ConfiguracionSchema');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('configuracion')
    .setDescription('Configura opciones del servidor')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addSubcommandGroup(group =>
      group
        .setName('devs')
        .setDescription('Configura los desarrolladores del servidor')
        .addSubcommand(subcommand =>
          subcommand
            .setName('agregar')
            .setDescription('Agrega un desarrollador')
            .addUserOption(option =>
              option.setName('developer')
                .setDescription('Selecciona un desarrollador')
                .setRequired(true)))
        .addSubcommand(subcommand =>
          subcommand
            .setName('remover')
            .setDescription('Remueve un desarrollador')
            .addStringOption(option =>
              option.setName('developerid')
                .setDescription('ID del desarrollador a remover')
                .setRequired(true))))
    .addSubcommandGroup(group =>
      group
        .setName('rolstaff')
        .setDescription('Configura los roles del staff del servidor')
        .addSubcommand(subcommand =>
          subcommand
            .setName('agregar')
            .setDescription('Agrega un rol de staff')
            .addRoleOption(option =>
              option.setName('staffrole')
                .setDescription('Selecciona un rol de staff')
                .setRequired(true)))
        .addSubcommand(subcommand =>
          subcommand
            .setName('remover')
            .setDescription('Remueve un rol de staff')
            .addStringOption(option =>
              option.setName('staffroleid')
                .setDescription('ID del rol de staff a remover')
                .setRequired(true))))
    .addSubcommand(subcommand =>
      subcommand
        .setName('ver')
        .setDescription('Muestra la configuración actual del servidor')),

  async execute(interaction) {
    const guildId = interaction.guild.id;
    const subcommandGroup = interaction.options.getSubcommandGroup(false);
    const subcommand = interaction.options.getSubcommand();

    let config = await Configuracion.findOne({ guildId });

    if (!config) {
      config = new Configuracion({ guildId });
    }

    if (subcommandGroup === 'devs') {
      if (subcommand === 'agregar') {
        const developer = interaction.options.getUser('developer');
        if (!config.Developers.includes(developer.id)) {
          config.Developers.push(developer.id);
          await config.save();
          const embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`Desarrollador añadido: ${developer}`);
          await interaction.reply({ embeds: [embed] });
        } else {
          await interaction.reply(`El desarrollador ${developer.tag} ya está en la lista.`);
        }
      } else if (subcommand === 'remover') {
        const developerId = interaction.options.getString('developerid');
        if (config.Developers.includes(developerId)) {
          config.Developers = config.Developers.filter(id => id !== developerId);
          await config.save();
          const embed = new EmbedBuilder()
            .setColor('Red')
            .setDescription(`Desarrollador removido: ${developerId}`);
          await interaction.reply({ embeds: [embed] });
        } else {
          await interaction.reply(`El desarrollador con ID ${developerId} no está en la lista.`);
        }
      }
    } else if (subcommandGroup === 'rolstaff') {
      if (subcommand === 'agregar') {
        const staffRole = interaction.options.getRole('staffrole');
        if (!config.StaffRoles.includes(staffRole.id)) {
          config.StaffRoles.push(staffRole.id);
          await config.save();
          const embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`Rol de staff añadido: ${staffRole}`);
          await interaction.reply({ embeds: [embed] });
        } else {
          await interaction.reply(`El rol de staff ${staffRole} ya está en la lista.`);
        }
      } else if (subcommand === 'remover') {
        const staffRoleId = interaction.options.getString('staffroleid');
        if (config.StaffRoles.includes(staffRoleId)) {
          config.StaffRoles = config.StaffRoles.filter(id => id !== staffRoleId);
          await config.save();
          const embed = new EmbedBuilder()
            .setColor('Red')
            .setDescription(`Rol de staff removido: <@&${staffRoleId}>`);
          await interaction.reply({ embeds: [embed] });
        } else {
          await interaction.reply(`El rol de staff con ID ${staffRoleId} no está en la lista.`);
        }
      }
    } else if (subcommand === 'ver') {
      const developersMention = config.Developers.map(id => `<@${id}>\n`).join(' ');
      const staffRolesMention = config.StaffRoles.map(id => `<@&${id}>\n`).join(' ');

      const embed = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle('Configuración Actual')
        .addFields(
          { name: 'Developers:', value: developersMention },
          { name: 'Staff Roles:', value: staffRolesMention }
        )
      await interaction.reply({ embeds: [embed] });
    }
  },
};