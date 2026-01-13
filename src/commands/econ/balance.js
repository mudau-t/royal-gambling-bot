const { SlashCommandBuilder } = require("discord.js");
const { getUser } = require("../../handlers/userHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your coin balance"),

  async execute(interaction) {
    const userId = interaction.user.id;
    const user = getUser(userId);

    await interaction.reply({
      content: `💰 **Your Balance**\nYou have **${user.balance} coins**`,
      ephemeral: false
    });
  }
};
