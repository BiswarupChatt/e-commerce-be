import { Otp } from "../models/otp-model.js";
import { User } from "../models/user-model.js";
import { generateUserJwt } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

export const sendOtp = async (req, res) => {
  const { phone, email } = req.body;

  if (!phone && !email) {
    return res.status(400).json({ error: "Phone or email is required" });
  }

  const user = await User.findOne(phone ? { phone } : { email });

  let isExisting = true;

  if (!user) {
    isExisting = false;
  } else {
    isExisting = true;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.create({
    phone,
    email,
    otp: hashedOtp,
    isExisting,
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
      isExisting,
      otp,
      expiresIn: "5 minutes",
    },
  });
};

export const verifySignupOtp = async (req, res) => {
  const { phone, email, otp: inputOtp, firstName, lastName } = req.body;

  const query = {
    isUsed: false,
    ...(phone ? { phone } : { email }),
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

  const existingUser = await User.findOne(phone ? { phone } : { email });
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  const newUser = await User.create({
    phone,
    email,
    firstName,
    lastName,
    role: "user",
    isVerified: true,
    isActive: true,
  });

  const token = generateUserJwt(newUser);

  return res.json({
    message: "User registered successfully",
    token,
    user: newUser,
  });
};

export const verifyLoginOtp = async (req, res) => {
  const { phone, email, otp: inputOtp } = req.body;

  const query = {
    isUsed: false,
    ...(phone ? { phone } : { email }),
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

  const user = await User.findOne(phone ? { phone } : { email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const token = generateUserJwt(user);

  return res.json({
    message: "User logged in successfully",
    token,
    user,
  });
};
