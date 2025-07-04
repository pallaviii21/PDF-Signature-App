const Document = require("../models/Document");
const fs = require("fs");
const path = require("path");

const uploadDocument = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ msg: "No file uploaded" });

    const newDoc = new Document({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      uploadedBy: req.user.id
    });

    await newDoc.save();
    res.status(201).json({ msg: "File uploaded", document: newDoc });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const listDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ uploadedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id.trim(),
      uploadedBy: req.user.id,
    });

    if (!document) {
      return res.status(404).json({ msg: "Document not found" });
    }

    const filePath = path.join(__dirname, "../uploads", document.filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ msg: "File not found on server" });
    }

    const fileBuffer = fs.readFileSync(filePath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${document.originalname}"`);
    res.send(fileBuffer);
  } catch (err) {
    console.error("Error in getDocumentById:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};



const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ msg: "Document not found" });
    }

    // Delete the file from the filesystem
    const filePath = path.join(__dirname, "..", "uploads", doc.filename);
    fs.unlink(filePath, (err) => {
      if (err) console.warn("File not found or already deleted:", err.message);
    });

    // Delete from database
    await Document.findByIdAndDelete(req.params.id);

    res.json({ msg: "Document deleted successfully" });
  } catch (err) {
    console.error("[deleteDocument]", err);
    res.status(500).json({ msg: "Server error" });
  }
};



// ✅ Make sure you export ALL functions
module.exports = {
  uploadDocument,
  listDocuments,
  getDocumentById,
  deleteDocument
};
