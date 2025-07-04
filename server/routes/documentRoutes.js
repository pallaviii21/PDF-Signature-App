const express = require("express");
const multer = require("multer");
const { uploadDocument,listDocuments,getDocumentById,deleteDocument } = require("../controllers/documentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Configure multer to store files in /uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Upload route
router.post("/upload", authMiddleware, upload.single("pdf"), uploadDocument);

// Get all PDFs uploaded by logged-in user
router.get("/", authMiddleware, listDocuments);

// Get specific PDF by ID
router.get("/:id", authMiddleware, getDocumentById);

// Delete PDF
router.delete("/:id", authMiddleware, deleteDocument);







module.exports = router;
