const express = require("express");
const {
  handlePostShortUrl,
  handleGetShortUrl,
  handleGetAnalytics,
} = require("../controllers/userController");

const router = express.Router();

//I will put controllers/something later here
router.post("/", handlePostShortUrl);

router.get("/:shortId", handleGetShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
