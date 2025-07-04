const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// REGISTER
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ msg: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verified: false,
    });

    const verifyUrl = `${process.env.VITE_CLIENT_URL}/verify-email?token=${verificationToken}&id=${newUser._id}`;

    await transporter.sendMail({
      from: `"Signify" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html: `
        <h2>Welcome to SIGNify 👋</h2>
        <p>Click below to verify your email:</p>
        <a href="${verifyUrl}" target="_blank">Verify Email</a>
      `,
    });

    res.status(201).json({
      msg: "Registration successful! Please check your email to verify your account.",
    });
  } catch (err) {
    console.error("[register]", err);
    res.status(500).json({ msg: err.message });
  }

};

// VERIFY EMAIL
const verifyEmail = async (req, res) => {
  const { token, id } = req.query;

  try {
    const { token, id } = req.query;

    const user = await User.findById(id);
    if (!user) return res.status(400).json({ msg: "User not found" });

    if (user.verified)
      return res.json({ msg: "Email is already verified. You can log in now." });

    if (user.verificationToken !== token)
      return res.status(400).json({ msg: "Invalid or expired token" });

    user.verified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ msg: "Email verified successfully. You can now log in." });
  } catch (err) {
      res.status(500).json({ msg: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.verified)
      return res
        .status(403)
        .json({ msg: "Please verify your email before logging in." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ user: { id: user._id, name: user.name }, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Email not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.VITE_CLIENT_URL}/reset-password?token=${token}&id=${user._id}`;

    await transporter.sendMail({
      from: `"Signify" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`,
    });

    res.json({ msg: "Password reset email sent. Please also check your spam " });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  const { token, id, password } = req.body;

  try {
    const user = await User.findOne({
      _id: id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ msg: "Password reset successful." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
