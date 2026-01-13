const { getUser, addBalance } = require("../../handlers/userHandler");

const DAILY_AMOUNT = 500; // you can change this later or move it to config

module.exports = {
  name: "daily",
  aliases: ["claim", "dailyreward"],
  category: "Economy",
  description: "Claim your daily coin reward",

  async execute(message) {
    const userId = message.author.id;
    const user = getUser(userId);

    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000; // 24 hours

    if (now - user.lastDaily < cooldown) {
      const timeLeft = cooldown - (now - user.lastDaily);
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);

      return message.reply(
        `⏳ You already claimed your daily reward.\nCome back in **${hours}h ${minutes}m**`
      );
    }

    // Give reward
    user.lastDaily = now;
    addBalance(userId, DAILY_AMOUNT);

    message.reply(
      `🎁 **Daily Reward Claimed!**\nYou received **${DAILY_AMOUNT} coins** 💰`
    );
  }
}; 
