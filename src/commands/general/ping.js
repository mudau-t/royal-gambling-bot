module.exports = {
  name: "ping",
  aliases: ["latency"],
  category: "General",
  description: "Check the bot latency",

  async execute(message) {
    const sent = await message.reply("🏓 Pinging...");

    const latency = sent.createdTimestamp - message.createdTimestamp;
    const apiLatency = Math.round(message.client.ws.ping);

    sent.edit(
      `🏓 **Pong!**\n` +
      `📶 Message latency: **${latency}ms**\n` +
      `🌐 API latency: **${apiLatency}ms**`
    );
  }
};
