import { Schema, model } from "mongoose";

const categorySchema = new Schema(
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
    },
    image: {
      type: String,
    },
    isActive: {
      type: String,
    },
    sortOrder: {
      type: String,
    },
  },
  { timestamps: true }
);
export const Category = model("Category", categorySchema);
