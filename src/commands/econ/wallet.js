const { getUser } = require("../../handlers/userHandler");

module.exports = {
  name: "wallet",
  aliases: ["bal", "balance", "coins"],
  category: "Economy",
  description: "View your wallet balance",

  async execute(message) {
    const user = getUser(message.author.id);

    const text =
      `💼 **Wallet**\n` +
      `━━━━━━━━━━━━━━\n` +
      `🪙 Coins: **${user.balance}**`;

    message.reply(text);
  }
}; 
