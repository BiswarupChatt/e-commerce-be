import { Schema, model } from "mongoose";

const itemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variantId: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: true }
);

const wishlistSchema = new Schema(
  {
    usedId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [itemSchema],
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Cart = model("Wishlist",wishlistSchema);
