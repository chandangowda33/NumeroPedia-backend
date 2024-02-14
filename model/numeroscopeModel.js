const mongoose = require("mongoose");

const numeroscopeSchema = new mongoose.Schema({
  pattern: String,
  qualities: [String],
});

const Numeroscope = mongoose.model("Numeroscope", numeroscopeSchema);

module.exports = Numeroscope;
