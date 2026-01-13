const { getUser, saveUsers } = require("../../handlers/userHandler");

const COOLDOWN = 60 * 60 * 1000; // 1 hour

module.exports = {
  name: "work",
  category: "Economy",
  description: "Work to earn coins",

  async execute(message) {
    const user = getUser(message.author.id);
    const now = Date.now();

    if (user.lastWork && now - user.lastWork < COOLDOWN) {
      const remaining = COOLDOWN - (now - user.lastWork);
      const minutes = Math.ceil(remaining / 60000);
      return message.reply(`⏳ You are tired. Try again in **${minutes} minutes**.`);
    }

    const earned = Math.floor(Math.random() * 300) + 200;
    user.wallet += earned;
    user.lastWork = now;

    saveUsers();

    message.reply(`🛠️ You worked hard and earned **${earned} coins** 💰`);
  }
}; 
