import express from "express";
import Order from "../models/order.mjs";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/",
  body("persons").notEmpty().isNumeric(),
  body("orderItems").notEmpty().isArray(),
  body("total").notEmpty().isNumeric(),
  body("submitId").notEmpty().isString(),
  body("payment").isIn(["cash", "square"]),
  body("isServed").isBoolean(),
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { persons, orderItems , total, submitId , payment , isServed} = req.body;
    const order = new Order({
      persons,
      orderItems,
      total,
      submitId,
      payment,
      isServed
    });
    order.save().then((order) => {
      res.status(201).json(order);
    });
  }
);

router.get("/orderitems/:type", (req, res) => {
  Order.find({isServed : false}).sort([["updatedAt" , -1]]).then((orders) => {
    console.log(req.params.type)
    var orderItems = [];
    orders.forEach((order) => {
      const submitId = order.submitId;
      order.orderItems.forEach((v) => {
        var orderItem = v.toObject();
        orderItem.submitId = submitId;
        if(orderItem.isCompleted === false && orderItem.type === req.params.type ) orderItems.push(orderItem);
        // console.log(orderItem.type)
      });
    });
    res.json(orderItems);
  });
});

router.patch("/orderitems/:submitId/:orderId", (req, res) => {
  Order.findOne({submitId : req.params.submitId}).then((order) => {
    order.orderItems.forEach((v) => {
      if(v.orderId === req.params.orderId) {
        v.isCompleted = true;
      }
    });
    order.save().then((order) => {
      res.json(order);
    });
  });
});



export default router;
