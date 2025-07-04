const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: "Document", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  page: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "signed", "rejected"],
    default: "pending"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Signature", signatureSchema);
