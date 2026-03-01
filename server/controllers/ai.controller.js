const { generateResponse } = require("../services/ai.service");
const History = require("../models/History");

const generate = async (req, res) => {
  try {
    const { prompt, mode } = req.body;

    const result = await generateResponse(prompt.trim(), mode);
    const newInteraction = new History({
      prompt: prompt.trim(),
      mode,
      response: result,
    });
    await newInteraction.save();

    res.status(200).json({ success: true, mode, result });
  } catch (error) {
    console.error("[AI Controller Error]", error.message);

    res.status(500).json({
      success: false,
      message: "AI service failed. Please check your API key and try again.",
    });
  }
};

const getHistory = async (req, res) => {
  try {
    // Fetch the 10 most recent interactions, sorted by newest first (-1)
    const history = await History.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.error("[History Fetch Error]", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch history from the database.",
    });
  }
};

module.exports = { generate, getHistory };
