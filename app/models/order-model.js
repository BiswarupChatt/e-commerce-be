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
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const statusHistorySchema = new Schema(
  {
    status: {
      type: String,
    },
    updatedBy: ObjectId,
  },
  { timestamps: true, _id: false }
);

const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [itemSchema],
    pricing: {
      subTotal: {
        type: Number,
      },
      tax: {
        type: Number,
      },
      shipping: {
        type: Number,
      },
      discount: {
        type: Number,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      pinCode: {
        type: String,
        required: true,
      },
      addressLine1: {
        type: String,
        required: true,
      },
      addressLine2: {
        type: String,
      },
      landmark: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    shippingId: {
      type: Schema.Types.ObjectId,
      ref: "Shipping",
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Return",
      ],
    },
    statusHistory: [statusHistorySchema],
    couponCode: {
      type: String,
    },
    couponDiscount: {
      type: String,
    },
    notes: {
      type: String,
    },
    customerNotes: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
