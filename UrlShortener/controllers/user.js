const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.js");
const { setUser, getUser } = require("../service/auth.js");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  if (password.length < 8) {
    return res.json({
      success: false,
      message: "Password length must be at least 8 characters",
    });
  }

  const response = await User.create({ name, email, password });
  return res.render("login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("login", { error: "Not enough information to login" });
  }

  const response = await User.findOne({ email, password });

  if (!response) {
    return res.render("login", { error: "Invalid credentials" });
  }

  const sessionId = uuidv4();

  setUser(sessionId, response);

  res.cookie("uid", sessionId);

  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
