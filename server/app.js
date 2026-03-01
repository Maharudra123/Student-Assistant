const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");
const cron = require("node-cron");
const axios = require("axios");
const app = express();

// --- CORS CONFIGURATION ---
// Allow requests from both local development and the live Vercel frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://student-assistant-frontend-nttn6tfxt-rudras-projects-4ea4a5d9.vercel.app" 
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like your self-pinging cron job or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());

// Mount the AI routes
app.use("/api/ai", aiRoutes);

// Simple health check endpoint
app.get("/health", (_, res) => res.json({ status: "ok" }));

// 404 handler for unknown routes
app.use((_, res) => res.status(404).json({ message: "Route not found" }));

// --- CRON JOB ---
cron.schedule("*/10 * * * *", async () => {
  // Pings the server every 10 minutes (just before the 15-minute sleep timer)
  try {
    await axios.get("https://student-assistant-backend-dwtz.onrender.com/health");
    console.log("Self-ping successful. Server kept alive.");
  } catch (error) {
    console.error("Self-ping failed:", error.message);
  }
});

module.exports = app;
