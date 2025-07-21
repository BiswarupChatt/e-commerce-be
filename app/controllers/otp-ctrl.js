import { Otp } from "../models/otp-model.js";
import { User } from "../models/user-model.js";
import { generateJwt } from "../utils/jwt.js";

export const sendOtp = async (req, res) => {
  const { phone, email, purpose } = req.body;

  if (!phone && !email) {
    return res.status(400).json({ error: "Phone or email is required" });
  }

  if (!["registration", "login"].includes(purpose)) {
    return res.status(400).json({ error: "Invalid OTP purpose" });
  }

  if (purpose === "registration") {
    const user = await User.findOne(phone ? { phone } : { email });

    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.create({
    phone,
    email,
    otp,
    purpose,
    isUsed: false,
    attempts: 0,
    expiresAt: expiry,
  });

  // otp sending logic will be here

  return res.status(200).json({
    success: true,
    message: "OTP sent successfully",
    data: {
      deliveryMethod: phone ? "sms" : "email",
      purpose,
      otp,
      expiresIn: "5 minutes",
    },
  });
};

export const verifyOtp = async (req, res) => {
  const {
    phone,
    email,
    otp: inputOtp,
    purpose,
    firstName,
    lastName,
  } = req.body;

  const query = {
    $or: [{ phone }, { email }],
    purpose,
    isUsed: false,
  };

  const otpRecord = await Otp.findOne(query).sort({ createdAt: -1 });

  if (!otpRecord) {
    return res
      .status(400)
      .json({ error: "No OTP request found or already used" });
  }

  // Check if expired
  if (otpRecord.expiresAt < new Date()) {
    otpRecord.attempts += 1;
    await otpRecord.save();
    return res.status(400).json({ error: "OTP has expired" });
  }

  // Check if attempts exceeded
  if (otpRecord.attempts >= 5) {
    return res.status(429).json({ error: "Too many attempts" });
  }

  // Check if OTP is correct
  if (otpRecord.otp !== inputOtp) {
    otpRecord.attempts += 1;
    await otpRecord.save();
    return res.status(400).json({ error: "Incorrect OTP" });
  }

  // If everything is correct
  otpRecord.attempts += 1;
  otpRecord.isUsed = true;
  await otpRecord.save();

  let user;
  if (purpose === "registration") {
    user = await User.findOne(phone ? { phone } : { email });

    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    user = await User.create({
      phone,
      email,
      firstName,
      lastName,
      isVerified: true,
      isActive: true,
    });
  } else if (purpose === "login") {
    user = await User.findOne(phone ? { phone } : { email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  }

  const token = generateJwt(user._id);

  return res.json({
    message: `User ${
      purpose === "registration" ? "Register" : "Login"
    } successfully`,
    token,
    user,
  });
};
