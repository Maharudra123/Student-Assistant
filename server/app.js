const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");
const cron = require("node-cron");
const axios = require("axios");
const app = express();

// --- CORS CONFIGURATION ---

const allowedOrigins = [
  "http://localhost:5173",
  "https://student-assistant-frontend.vercel.app",
  "https://student-assistant-frontend-l5n5olcoe-rudras-projects-4ea4a5d9.vercel.app"
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

app.use("/api/ai", aiRoutes);

app.get("/health", (_, res) => res.json({ status: "ok" }));

app.use((_, res) => res.status(404).json({ message: "Route not found" }));

// --- CRON JOB ---
cron.schedule("*/10 * * * *", async () => {
  try {
    await axios.get("https://student-assistant-backend-dwtz.onrender.com/health");
    console.log("Self-ping successful. Server kept alive.");
  } catch (error) {
    console.error("Self-ping failed:", error.message);
  }
});

module.exports = app;
