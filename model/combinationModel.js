const mongoose = require("mongoose");

const combinationSchema = new mongoose.Schema({
  pattern: String,
  luck: String,
  remark: String,
});

const Combination = mongoose.model("Combination", combinationSchema);

module.exports = Combination;
