const { 
  Client, 
  Collection, 
  GatewayIntentBits 
} = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const PREFIX = process.env.PREFIX || "!";
client.commands = new Collection();

// -------- RECURSIVE COMMAND LOADER --------
function loadCommands(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      loadCommands(fullPath);
    } else if (file.name.endsWith(".js")) {
      const command = require(fullPath);

      if (!command.name || !command.execute) {
        console.warn(`⚠️ Invalid command skipped: ${fullPath}`);
        continue;
      }

      client.commands.set(command.name, command);
      console.log(`✅ Loaded command: ${command.name}`);
    }
  }
}

loadCommands(path.join(__dirname, "commands"));

// -------- EVENTS --------
client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  console.log(`📌 Prefix: ${PREFIX}`);
});

client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("❌ Error executing command.");
  }
});

// -------- LOGIN --------
client.login(process.env.TOKEN);
