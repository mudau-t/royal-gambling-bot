const fs = require("fs");
const path = require("path");
const { getUser } = require("../../handlers/userHandler");

const DATA_FILE = path.join(__dirname, "../../../data/users.json");

function loadUsers() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

module.exports = {
  name: "bank",
  aliases: ["atm"],
  category: "Economy",
  description: "Deposit or withdraw coins from your bank",

  async execute(message, args) {
    const userId = message.author.id;
    const users = loadUsers();
    const user = getUser(userId);

    // Ensure bank exists
    if (users[userId] && users[userId].bank === undefined) {
      users[userId].bank = 0;
    }

    // !bank → view balances
    if (!args[0]) {
      return message.reply(
        `🏦 **Your Bank**\n` +
        `━━━━━━━━━━━━━━\n` +
        `💼 Wallet: **${user.balance} coins**\n` +
        `🏦 Bank: **${users[userId].bank} coins**`
      );
    }

    const action = args[0].toLowerCase();
    let amount;

    if (args[1]?.toLowerCase() === "all") {
      amount = action === "deposit"
        ? user.balance
        : users[userId].bank;
    } else {
      amount = parseInt(args[1]);
    }

    if (!["deposit", "withdraw"].includes(action)) {
      return message.reply("❌ Use `deposit` or `withdraw`.");
    }

    if (isNaN(amount) || amount <= 0) {
      return message.reply("❌ Enter a valid amount.");
    }

    // Deposit
    if (action === "deposit") {
      if (amount > user.balance) {
        return message.reply("❌ Not enough coins in wallet.");
      }

      user.balance -= amount;
      users[userId].bank += amount;
    }

    // Withdraw
    if (action === "withdraw") {
      if (amount > users[userId].bank) {
        return message.reply("❌ Not enough coins in bank.");
      }

      users[userId].bank -= amount;
      user.balance += amount;
    }

    saveUsers(users);

    message.reply(
      `🏦 **Bank Updated**\n` +
      `💼 Wallet: **${user.balance}**\n` +
      `🏦 Bank: **${users[userId].bank}**`
    );
  }
};
