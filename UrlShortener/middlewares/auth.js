const { getUser } = require("../service/auth");

async function restrictToLoggedUserOnly(req, res, next) {
  const cookie = req.cookies.uid;

  if (!cookie) {
    return res.redirect("/login");
  }

  const user = getUser(cookie);

  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;

  next();
}

async function checkAuth(req, res, next) {
  const cookie = req.cookies.uid;
  const user = getUser(cookie);
  req.user = user;
  next();
}

module.exports = { restrictToLoggedUserOnly, checkAuth };
