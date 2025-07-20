import { Schema, model } from "mongoose";

const paymentSchema = new Schema({});

export const Payment = model("Payment", paymentSchema);
