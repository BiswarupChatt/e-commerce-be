import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    material: {
      type: String,
    },
    care: {
      type: String,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
        },
        isPrimary: {
          type: Boolean,
        },
        sortOrder: {
          type: String,
        },
      },
    ],
    availableSize: {
      type: String,
    },
    availableColor: {
      type: String,
    },
    totalStocks: {
      type: String,
    },
    basePrice: {
      type: String,
      required: true,
    },
    previouslyPurchased: {
      type: Boolean,
    },
    variant: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    tags: { type: Schema.Types.ObjectId, ref: "Tag" },
    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model("Product", productSchema);
