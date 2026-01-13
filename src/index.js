const { 
  Client, 
  Collection, 
  GatewayIntentBits,
  REST,
  Routes
} = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

// -------- RECURSIVE COMMAND LOADER --------
const commands = [];

function loadCommands(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // go deeper (econ, mods, fun, etc.)
      loadCommands(fullPath);
    } else if (file.name.endsWith(".js")) {
      const command = require(fullPath);

      if (!command.data || !command.execute) {
        console.warn(`⚠️ Skipping invalid command file: ${fullPath}`);
        continue;
      }

      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
    }
  }
}

loadCommands(path.join(__dirname, "commands"));

// -------- REGISTER SLASH COMMANDS --------
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("⏳ Registering slash commands...");
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log("✅ Slash commands registered");
  } catch (error) {
    console.error("❌ Failed to register commands:", error);
  }
})();

// -------- EVENTS --------
client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ 
        content: "❌ Error executing this command.", 
        ephemeral: true 
      });
    } else {
      await interaction.reply({ 
        content: "❌ Error executing this command.", 
        ephemeral: true 
      });
    }
  }
});

// -------- LOGIN --------
client.login(process.env.TOKEN);
