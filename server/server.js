require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting the server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(" Connected to MongoDB successfully");

    // Start the server only after the DB connects
    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1); // Stop the app if the database fails to connect
  });
