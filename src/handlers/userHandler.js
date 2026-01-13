const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../../data/users.json");

// ---------- INTERNAL HELPERS ----------
function loadUsers() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "{}");
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (err) {
    console.error("❌ Failed to load users.json", err);
    return {};
  }
}

function saveUsers(users) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("❌ Failed to save users.json", err);
  }
}

// ---------- PUBLIC API ----------
function getUser(userId) {
  const users = loadUsers();

  if (!users[userId]) {
    users[userId] = {
      balance: 1000,
      lastDaily: 0,
      createdAt: Date.now()
    };
    saveUsers(users);
  }

  return users[userId];
}

function addBalance(userId, amount) {
  const users = loadUsers();
  const user = users[userId] ?? getUser(userId);

  user.balance += amount;
  saveUsers(users);

  return user.balance;
}

function removeBalance(userId, amount) {
  const users = loadUsers();
  const user = users[userId] ?? getUser(userId);

  if (user.balance < amount) return false;

  user.balance -= amount;
  saveUsers(users);

  return user.balance;
}

function getAllUsers() {
  return loadUsers();
}

module.exports = {
  getUser,
  addBalance,
  removeBalance,
  getAllUsers
};
