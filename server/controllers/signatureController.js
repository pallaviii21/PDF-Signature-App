const Signature = require("../models/Signature");

const saveSignature = async (req, res) => {
  const { documentId, x, y, page } = req.body;

  if (!documentId || !x || !y || !page) {
    return res.status(400).json({ msg: "Missing signature data" });
  }

  try {
    const signature = new Signature({
      documentId,
      userId: req.user.id,
      x,
      y,
      page
    });

    await signature.save();
    res.status(201).json({ msg: "Signature position saved", signature });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getSignaturesByDoc = async (req, res) => {
  try {
    const signatures = await Signature.find({ documentId: req.params.id });
    res.json(signatures);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  saveSignature,
  getSignaturesByDoc
};
