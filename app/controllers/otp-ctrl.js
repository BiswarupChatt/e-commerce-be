import { Otp } from "../models/otp-model.js";
import { User } from "../models/user-model.js";
import { generateUserJwt } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

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
  const hashedOtp = await bcrypt.hash(otp, 10);

  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.create({
    phone,
    email,
    otp: hashedOtp,
    purpose,
    isUsed: false,
    attempts: 0,
    expiresAt: expiry,
  });

  // TODO: Send OTP via SMS/Email here

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

  if (otpRecord.expiresAt < new Date()) {
    otpRecord.attempts += 1;
    await otpRecord.save();
    return res.status(400).json({ error: "OTP has expired" });
  }

  if (otpRecord.attempts >= 5) {
    return res.status(429).json({ error: "Too many attempts" });
  }

  const isOtpValid = await bcrypt.compare(inputOtp, otpRecord.otp);

  if (!isOtpValid) {
    otpRecord.attempts += 1;
    await otpRecord.save();
    return res.status(400).json({ error: "Incorrect OTP" });
  }

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

  const token = generateUserJwt(user);

  return res.json({
    message: `User ${
      purpose === "registration" ? "Register" : "Login"
    } successfully`,
    token,
    user,
  });
};
