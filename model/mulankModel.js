const mongoose = require("mongoose");
const validator = require("validator");

const mulankSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, "A Mulank must have a number"],
    unique: true,
    trim: true,
    maxlength: [1, "It should be between 1-9"],
    //check if number is between from 1-9 using validator model
    validate: {
      validator: function(value) {
        return Number.isInteger(value) && value >= 1 && value <= 9;
      },
      message: "Mulank number must be between 1 and 9",
    },
  },
  star: {
    type: String,
    required: [true, "A Mulank must have a Star"],
    unique: true,
    trim: true,
    enum: {
      values: [
        "Sun",
        "Moon",
        "Jupiter",
        "Rahu",
        "Mercury",
        "Venus",
        "Kethu",
        "Saturn",
        "Mars",
      ],
      message:
        "Stars should be one of : 'Sun', 'Moon', 'Jupiter','Rahu','Mercury','Venus','Kethu','Saturn','Mars'",
    },
  },
  pros: [String],
  cons: [String],
  neutral: [String],
  remedies: {
    type: String,
    maxlength: [1000, "It should be less than 1000 characters"],
  },
  key: [String],
  friendNumbers: [Number],
  enemyNumbers: [Number],
  neutralNumber: [Number],
});

const Mulank = mongoose.model("Mulank", mulankSchema);

module.exports = Mulank;
