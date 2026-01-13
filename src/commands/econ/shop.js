module.exports = {
  name: "shop",
  category: "Economy",
  description: "View shop items",

  async execute(message) {
    const shopText = `
🛒 **Shop**

1️⃣ 🗡️ Sword — 1000 coins
2️⃣ 🛡️ Shield — 1500 coins
3️⃣ 🎫 VIP Pass — 5000 coins

Use:
\`.buy <item number>\`
    `;

    message.reply(shopText);
  }
}; 
