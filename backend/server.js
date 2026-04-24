const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = {};

app.post("/gn", (req, res) => {
  const { wallet } = req.body;

  if (!wallet) return res.json({ message: "Wallet required" });

  if (!users[wallet]) {
    users[wallet] = {
      points: 0,
      streak: 0,
      lastCheckIn: null
    };
  }

  const user = users[wallet];
  const now = new Date();

  if (
    user.lastCheckIn &&
    new Date(user.lastCheckIn).toDateString() === now.toDateString()
  ) {
    return res.json({ message: "Already checked in today" });
  }

  user.points += 10;
  user.streak += 1;
  user.lastCheckIn = now;

  res.json({
    message: "GN successful 🌙",
    user
  });
});

app.post("/user", (req, res) => {
  const { wallet } = req.body;

  if (!users[wallet]) {
    users[wallet] = { points: 0, streak: 0 };
  }

  res.json(users[wallet]);
});

app.listen(3000, () => console.log("Server running on port 3000"));
