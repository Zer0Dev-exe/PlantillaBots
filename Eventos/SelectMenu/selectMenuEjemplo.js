module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    //TICKETS
    if(interaction.isSelectMenu() ) {

        if(interaction.customId === "id-selector") {
            const values = interaction.values[0];

            if(values === 'id-opcion1') {
                console.log('Opcion1')
            } else if(values === 'id-opcion2') {
                console.log('Opcion2')
            }
        }
    }
}
}