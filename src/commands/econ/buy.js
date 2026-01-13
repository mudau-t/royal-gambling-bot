const { getUser, saveUsers } = require("../../handlers/userHandler");

const items = {
  1: { name: "Sword", price: 1000 },
  2: { name: "Shield", price: 1500 },
  3: { name: "VIP Pass", price: 5000 }
};

module.exports = {
  name: "buy",
  category: "Economy",
  description: "Buy an item from the shop",

  async execute(message, args) {
    const itemId = args[0];
    const item = items[itemId];

    if (!item) {
      return message.reply("❌ Invalid item. Use `.shop` to see items.");
    }

    const user = getUser(message.author.id);

    if (user.wallet < item.price) {
      return message.reply("💸 You don’t have enough coins.");
    }

    user.wallet -= item.price;

    if (!user.items) user.items = [];
    user.items.push(item.name);

    saveUsers();

    message.reply(`✅ You bought **${item.name}** for **${item.price} coins**.`);
  }
}; 
