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
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { persons, orderItems , total, submitId} = req.body;
    const order = new Order({
      persons,
      orderItems,
      total,
      submitId,
    });
    order.save().then((order) => {
      res.status(201).json(order);
    });
  }
);

export default router;