import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    persons: {
      type: Number,
      required: true,
    },
    orderItems: [
      {
        itemId : { type: Number, required: true },
        quantity: { type: Number, required: true },
        options : { type : Object, required : false},
        orderId : { type : String, required : true},
        isCompleted : { type : Boolean, required : true}
      },
    ],
    total : {type : Number, required : true},
    submitId : {type : String, required : true}
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
