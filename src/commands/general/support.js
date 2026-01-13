module.exports = {
  name: "support",
  category: "General",
  description: "Get support server and ticket info",

  async execute(message) {
    const SUPPORT_SERVER_ID = "1458887767194079284";
    const TICKET_CHANNEL_ID = "1459261483677384855";

    const supportMessage =
      "🆘 **Need Help? Support Info Below**\n\n" +
      `🌐 **Official Server:** https://discord.gg/${SUPPORT_SERVER_ID}\n` +
      `🎫 **Ticket Channel:** <#${TICKET_CHANNEL_ID}>\n\n` +
      "Join the server and open a ticket if you need help 💙";

    message.reply(supportMessage);
  }
}; 
