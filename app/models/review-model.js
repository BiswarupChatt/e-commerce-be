import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    variantId: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
    },
    comment: {
      type: String,
    },
    images: {
      type: [String],
    },
    isVerified: {
      type: Boolean,
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Review = model("Review", reviewSchema);
