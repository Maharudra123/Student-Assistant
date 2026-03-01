const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { generate } = require("../controllers/ai.controller");

router.post("/generate", validate, generate);

module.exports = router;
