const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
    trim: true,
  },
  mode: {
    type: String,
    required: true,
    enum: ["explain", "mcq", "summarize", "improve"],
  },
  response: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("History", historySchema);
