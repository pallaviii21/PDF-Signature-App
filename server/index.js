const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");

const app = express();

const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}


const allowedOrigins = [
  "https://pdf-signature-app-pi.vercel.app", // Vercel frontend
  "http://localhost:5173", // local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// ✅ Static file serving
app.use("/uploads", express.static("uploads"));

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const signatureRoutes = require("./routes/signatureRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);
app.use("/api/signatures", signatureRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ✅ MongoDB Connection & Server Start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server started on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
