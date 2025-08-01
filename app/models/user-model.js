import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
    role: { type: String, enum: ["user", "admin"] },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    avatar: {
      type: String,
    },
    defaultAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
