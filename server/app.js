const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");
const cron = require("node-cron");
const axios = require("axios");
const app = express();

// Allow requests from our Vite frontend
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Mount the AI routes
app.use("/api/ai", aiRoutes);

// Simple health check endpoint
app.get("/health", (_, res) => res.json({ status: "ok" }));

// 404 handler for unknown routes
app.use((_, res) => res.status(404).json({ message: "Route not found" }));

cron.schedule("*/10 * * * *", async () => {
  // Pings the server every 10 minutes (just before the 15-minute sleep timer)
  try {
    await axios.get("https://your-render-app-url.onrender.com/health");
    console.log("Self-ping successful. Server kept alive.");
  } catch (error) {
    console.error("Self-ping failed:", error.message);
  }
});

module.exports = app;
