import { Schema, model } from "mongoose";

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
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

export const Tag = model(tagSchema);
