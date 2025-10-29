const mongoose = require("mongoose");
async function connectDb(url) {
  try {
    mongoose
      .connect(url)
      .then(() => {
        console.log("Database Connected");
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { connectDb };
