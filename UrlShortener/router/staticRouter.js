const express = require("express");
const { handleShowStuff } = require("../controllers/userController");
const { checkAuth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", checkAuth, handleShowStuff);

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
