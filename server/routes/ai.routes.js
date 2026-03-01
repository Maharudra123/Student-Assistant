const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { generate, getHistory } = require("../controllers/ai.controller");

router.post("/generate", validate, generate);
router.get("/history", getHistory);

module.exports = router;
