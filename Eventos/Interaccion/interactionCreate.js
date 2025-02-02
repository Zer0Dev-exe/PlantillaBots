module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {

        return interaction.reply({ content: "Este comando tiene errores de nivel alto, comprueba la consola para ver los errores" })
      }
      else {
      }
      command.execute(interaction, client);

    }
  }
}