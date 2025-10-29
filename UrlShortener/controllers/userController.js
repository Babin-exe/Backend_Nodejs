const mongoose = require("mongoose");
const URL = require("../models/url.js");
const id = require("short-id");

async function handlePostShortUrl(req, res) {
  const { url } = req.body;
  const shortId = id.generate();
  if (!url) {
    return res.status(401).json({ success: false, message: "Url is reqiured" });
  }

  const response = await URL.create({
    shortId: shortId,
    redirectUrl: url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  res.render("home", { id: shortId });
}

async function handleGetShortUrl(req, res) {
  const shortId = req.params.shortId;
  const response = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: { visitHistory: { timestamp: Date.now() } },
    }
  );

  if (!response) {
    return res.status(400).send("Shorturl not found");
  }
  let redirectUrl = response.redirectUrl;
  if (!/^https?:\/\//i.test(redirectUrl)) {
    redirectUrl = "https://" + redirectUrl;
  }
  res.redirect(redirectUrl);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const response = await URL.findOne({ shortId });

  return res.json({
    TotalClick: response.visitHistory.length,
    analytics: response.visitHistory,
  });
}

async function handleShowStuff(req, res) {
  if (!req.user) {
    return res.redirect("/login");
  }
  const allUrls = await URL.find({ createdBy: req.user });
  res.render("home", { urls: allUrls });
}

module.exports = {
  handlePostShortUrl,
  handleGetShortUrl,
  handleGetAnalytics,
  handleShowStuff,
};
