import { Schema, model } from "mongoose";

const shippingSchema = new Schema({});

export const Payment = model("Shipping", shippingSchema);
