import express from "express";
import Order from "../models/order.mjs";
import createReceipt from "../controllers/createReceipt.mjs";
import fs from "fs";
import { body, validationResult } from "express-validator";
import pdf2base64 from 'pdf-to-base64';

const router = express.Router();

router.post(
  "/",
  body("persons").notEmpty().isNumeric(),
  body("orderItems").notEmpty().isArray(),
  body("total").notEmpty().isNumeric(),
  body("submitId").notEmpty().isString(),
  body("payment").isIn(["cash", "square"]),
  body("isServed").isBoolean(),
  body("tableNum").notEmpty().isNumeric(),
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { persons, orderItems, total, submitId, payment, isServed, tableNum } = req.body;
    const order = new Order({
      persons,
      orderItems,
      total,
      submitId,
      payment,
      isServed,
      tableNum
    });
    order.save().then((order) => {
      res.status(201).json(order);
    });
  }
);

router.get("/orderitems/:area", (req, res) => {
  Order.find({ isServed: false }).sort([["createdAt", -1]]).then((orders) => {
    console.log(req.params.area)
    var orderItems = [];
    orders.forEach((order) => {
      const submitId = order.submitId;
      order.orderItems.forEach((v) => {
        var orderItem = v.toObject();
        orderItem.submitId = submitId;
        if (orderItem.isCompleted === false && orderItem.area === req.params.area) orderItems.push(orderItem);
      });
    });
    res.json(orderItems);
  });
});

router.get("/orders", (req, res) => {
  Order.find({ isServed: false }).sort([["createdAt", -1]]).then((orders) => {
    res.json(orders);
  });
});

router.patch("/orderitems/:submitId/:orderId", (req, res) => { //submitId 内 orderId の注文を完了にする
  Order.findOne({ submitId: req.params.submitId }).then((order) => {
    order.orderItems.forEach((v) => {
      if (v.orderId === req.params.orderId) {
        v.isCompleted = true;
      }
    });
    order.save().then((order) => {
      res.json(order);
    });
  });
});

router.patch("/:submitId", (req, res) => { //submitId の注文を完了にする
  Order.findOne({ submitId: req.params.submitId }).then((order) => {
    order.isServed = true;
    order.save().then((order) => {
      res.json(order);
    });
  });
});

router.get("/receipt/:submitId", (req, res) => {
  Order.findOne({ submitId: req.params.submitId }).then((order) => {
    (async () => {
      await createReceipt(order);
      pdf2base64(`./server/tmp/${order.submitId}.pdf`)
        .then((base64) => {
          res.send(base64);
          fs.rm(`./server/tmp/${order.submitId}.pdf`, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });

    })();
  });
});

router.get("/info", (req, res) => {
  var info = [
    {
      "id": 1,
      "name": "ジンジャーエール",
      "quantity": 0
    },
    {
      "id": 2,
      "name": "アイスコーヒー",
      "quantity": 0
    },
    {
      "id": 3,
      "name": "ホットコーヒー",
      "quantity": 0
    },
    {
      "id": 4,
      "name": "紅茶",
      "quantity": 0
    },
    {
      "id": 5,
      "name": "リンゴジュース",
      "quantity": 0
    },
    {
      "id": 6,
      "name": "ワッフル",
      "quantity": 0
    },
    {
      "id": 7,
      "name": "フルーツミックスパフェ",
      "quantity": 0
    },
    {
      "id": 10,
      "name": "抹茶パフェ",
      "quantity": 0
    },
    {
      "id": 9,
      "name": "カップケーキ",
      "quantity": 0
    },
    {
      "id": 11,
      "name": "クロックムッシュ",
      "quantity": 0
    },
    {
      "id": 12,
      "name": "コンソメスープ",
      "quantity": 0
    }
  ]
  Order.find().then((orders) => {
    orders.forEach((order) => {
      order.orderItems.forEach((v) => {
        info.find((item) => item.id === v.itemId).quantity += v.quantity;
      });
    });
    res.json(info);
  });
  
  
})



export default router;
