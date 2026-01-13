const { exec } = require("child_process");

module.exports = {
  name: "update",
  category: "General",
  description: "Update bot from GitHub",

  async execute(message) {
    if (message.author.id !== process.env.OWNER_ID) {
      return message.reply("❌ You are not allowed to use this command.");
    }

    message.reply("🔄 Updating bot from GitHub...");

    exec("git pull origin main", (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        return message.channel.send("❌ Update failed.");
      }

      if (stderr) console.error(stderr);

      message.channel.send("✅ Update successful. Restarting bot...");

      // Restart bot
      setTimeout(() => {
        process.exit(0);
      }, 2000);
    });
  }
};
