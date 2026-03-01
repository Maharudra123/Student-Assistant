const validate = (req, res, next) => {
  const { prompt, mode } = req.body;
  const VALID_MODES = ["explain", "mcq", "summarize", "improve"];

  // Validate the prompt string
  if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "Prompt must be at least 3 characters long.",
    });
  }

  // Prevent massive payloads from eating up API limits
  if (prompt.trim().length > 3000) {
    return res.status(400).json({
      success: false,
      message: "Prompt exceeds 3000 character limit.",
    });
  }

  // Validate the mode selection
  if (!mode || !VALID_MODES.includes(mode)) {
    return res.status(400).json({
      success: false,
      message: `Mode must be one of: ${VALID_MODES.join(", ")}`,
    });
  }

  // If everything is good, proceed to the controller
  next();
};

module.exports = validate;
