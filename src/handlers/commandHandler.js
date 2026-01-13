const fs = require("fs");
const path = require("path");

/**
 * Recursively load slash commands from subfolders
 * @param {Client} client Discord client
 * @param {string} commandsPath Path to commands folder
 * @returns {Array} Slash command JSON data
 */
function loadCommands(client, commandsPath) {
  const commands = [];

  function walk(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        walk(fullPath);
      } else if (file.name.endsWith(".js")) {
        const command = require(fullPath);

        if (!command?.data || !command?.execute) {
          console.warn(`⚠️ Invalid command skipped: ${fullPath}`);
          continue;
        }

        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());

        console.log(`✅ Loaded command: ${command.data.name}`);
      }
    }
  }

  walk(commandsPath);
  return commands;
}

module.exports = { loadCommands };
