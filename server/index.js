const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const fs = require("fs");

// ✅ Ensure uploads/ folder exists
const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = express();

// Middleware
const allowedOrigins = [
  process.env.VITE_CLIENT_URL,
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow server-to-server or curl with no origin
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use('/{*splat}', (req, res) => {
  res.status(404).send('Page not found');
});

// Middleware
app.use(express.json());

// Serve static files from /uploads
app.use("/uploads", express.static("uploads"));

// Routes
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const signatureRoutes = require("./routes/signatureRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);
app.use("/api/signatures", signatureRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// MongoDB Connection & Server Start
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
