const { getUser } = require("../../handlers/userHandler");

module.exports = {
  name: "balance",
  aliases: ["bal", "coins"],
  category: "Economy",
  description: "Check your coin balance",

  async execute(message) {
    const user = getUser(message.author.id);
    message.reply(`💰 You have **${user.balance} coins**`);
  }
};
