const mongoose = require("mongoose");

const rajyogSchema = new mongoose.Schema({
  rajyogNo: String,
  pattern: String,
  quality: String,
});

const Rajyog = mongoose.model("Rajyog", rajyogSchema);

module.exports = Rajyog;
