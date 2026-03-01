const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { generate } = require("../controllers/ai.controller");

// Notice how validate runs FIRST, then generate
router.post("/generate", validate, generate);

module.exports = router;
