import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    persons: {
      type: Number,
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
