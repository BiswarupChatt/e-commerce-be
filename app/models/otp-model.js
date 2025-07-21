import { Schema, model } from "mongoose";
const otpSchema = new Schema(
  {
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["login", "registration"],
      required: true,
    },
    isUsed: {
      type: Boolean,
      required: true,
    },
    attempts: {
      type: Number,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Otp = model("Otp", otpSchema);
