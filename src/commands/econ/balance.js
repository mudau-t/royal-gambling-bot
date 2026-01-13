module.exports = {
  name: "help",
  aliases: ["menu", "commands"],
  category: "General",
  description: "Show bot command menu",

  async execute(message) {
    const prefix = process.env.PREFIX || "!";
    const categories = {};

    // Group commands by category
    message.client.commands.forEach(cmd => {
      const cat = cmd.category || "Other";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd.name);
    });

    let menu = `🤖 **Bot Menu**\n\n`;

    for (const [category, cmds] of Object.entries(categories)) {
      menu += `📂 **${category}**\n`;
      menu += cmds.map(c => `\`${prefix}${c}\``).join(", ");
      menu += "\n\n";
    }

    message.reply(menu);
  }
};
