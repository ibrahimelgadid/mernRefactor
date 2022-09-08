const mongoose = require("mongoose");

const db = mongoose.connect(process.env.MONGO_URL, () => {
  console.log(`DB is connected`.bgRed);
});

module.exports = db;
