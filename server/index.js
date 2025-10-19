import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "./config/gemeni.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoute from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

// ✅ Proper middleware order
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies/auth headers
  })
);
app.use(express.json());

// ✅ DB connection
const db = mongoose.connection;
db.on("error", (error) => console.error("❌ DB Error:", error));
db.once("open", () => console.log("✅ DB Connection is Open"));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use('/api/ai', aiRoute);

app.get("/", (req, res) => {
  res.json({
    message: "🩺 HealthMate API is running successfully!",
    version: "1.0.0",
  });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));