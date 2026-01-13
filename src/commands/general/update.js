const { exec } = require("child_process");
const path = require("path");

module.exports = {
  name: "update",
  category: "General",
  description: "Update bot commands from GitHub (owner only)",

  async execute(message) {
    const OWNER_ID = process.env.OWNER_ID;
    if (message.author.id !== OWNER_ID) {
      return message.reply("❌ Only the bot owner can use this command.");
    }

    message.reply("🔄 Updating commands from GitHub...");

    const repoDir = path.resolve(__dirname, "../../../");

    // Fetch latest changes
    exec("git fetch origin main", { cwd: repoDir }, (err) => {
      if (err) {
        console.error(err);
        return message.reply("❌ Failed to fetch updates.");
      }

      // Checkout ONLY src/commands
      exec(
        "git checkout origin/main -- src/commands",
        { cwd: repoDir },
        async (err2) => {
          if (err2) {
            console.error(err2);
            return message.reply("❌ Failed to update commands.");
          }

          // Reload commands
          const { loadCommands } = require("../../handlers/commandHandler");

          message.client.commands.clear();
          await loadCommands(message.client);

          message.reply("✅ Commands updated and reloaded successfully!");
        }
      );
    });
  }
};
