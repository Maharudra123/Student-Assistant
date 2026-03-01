const { generateResponse } = require("../services/ai.service");

const generate = async (req, res) => {
  try {
    const { prompt, mode } = req.body;

    const result = await generateResponse(prompt.trim(), mode);

    res.status(200).json({ success: true, mode, result });
  } catch (error) {
    console.error("[AI Controller Error]", error.message);

    res.status(500).json({
      success: false,
      message: "AI service failed. Please check your API key and try again.",
    });
  }
};

module.exports = { generate };
