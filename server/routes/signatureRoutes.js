const express = require("express");
const { saveSignature, getSignaturesByDoc } = require("../controllers/signatureController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, saveSignature);
router.get("/:id", authMiddleware, getSignaturesByDoc); // id = documentId

module.exports = router;
