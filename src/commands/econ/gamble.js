const { getUser, addBalance, removeBalance } = require("../../handlers/userHandler");

module.exports = {
  name: "gamble",
  aliases: ["bet", "roll"],
  category: "Economy",
  description: "Gamble your coins and test your luck",

  async execute(message, args) {
    const userId = message.author.id;
    const user = getUser(userId);

    if (!args[0]) {
      return message.reply("❌ Please enter an amount to gamble.\nExample: `!gamble 100`");
    }

    let amount;

    if (args[0].toLowerCase() === "all") {
      amount = user.balance;
    } else {
      amount = parseInt(args[0]);
    }

    if (isNaN(amount) || amount <= 0) {
      return message.reply("❌ Please enter a valid number.");
    }

    if (amount > user.balance) {
      return message.reply("❌ You don’t have enough coins.");
    }

    // 50/50 chance
    const win = Math.random() < 0.5;

    if (win) {
      addBalance(userId, amount);
      message.reply(
        `🎉 **YOU WON!**\nYou gained **${amount} coins** 💰`
      );
    } else {
      removeBalance(userId, amount);
      message.reply(
        `💀 **YOU LOST!**\nYou lost **${amount} coins** 😭`
      );
    }
  }
}; 
