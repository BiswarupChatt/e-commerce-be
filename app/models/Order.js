import { Schema, model } from "mongoose";

const orderSchema = new Schema({});

export const Order = model(orderSchema);
