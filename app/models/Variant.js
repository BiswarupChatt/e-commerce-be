import { Schema, model } from "mongoose";

const VariantSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    sku: {
      type: String,
    },
    color: {
      name: {
        type: String,
      },
      code: {
        type: String,
      },
    },
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    },
    pricing: {
      price: {
        type: String,
        required: true,
      },
      discountPrice: {
        type: String,
      },
      costPrice: {
        type: String,
      },
    },
    inventory: {
      stock: {
        type: String,
      },
      available: {
        type: String,
      },
    },
    physical: {
      weight: { type: String },
      dimensions: {
        length: { type: String },
        width: { type: String },
        height: { type: String },
      },
    },
    images: [String],
    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const Variant = model(VariantSchema);
