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
  body("isEatIn").isBoolean(),
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { persons, orderItems, total, submitId, payment, isServed, tableNum, isEatIn } = req.body;
    const order = new Order({
      persons,
      orderItems,
      total,
      submitId,
      payment,
      isServed,
      tableNum,
      isEatIn
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
      const date = new Date(order.createdAt);
      order.orderItems.forEach((v) => {
        var orderItem = v.toObject();
        orderItem.date = date;
        orderItem.submitId = submitId;
        if (orderItem.isCompleted === false && orderItem.area === req.params.area) orderItems.push(orderItem);
      });
    });
    res.json(orderItems);
  });
});

router.get("/orders", (req, res) => {
  Order.find({ isServed: false }).sort([["createdAt", 1]]).then((orders) => {
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

router.get("/ordersAtDate/:year-:month-:day", (req, res) => {
  console.log(req.params.year, req.params.month, req.params.day);
  if (req.params.year === undefined ) {
    console.log("No date specified");
    return res.json({ "salesCash": 0, "salesSquare": 0, "items": [] });
  } else {
    const date = new Date(req.params.year, req.params.month - 1, req.params.day);
    var results = {
      salesCash: 0,
      salesSquare: 0,
      items: []
    };
    Order.find({ createdAt: { $gte: date, $lt: new Date(date.getTime() + 86400000) } }).then((orders) => {
      orders.forEach((order) => {
        order.payment === "cash" ? results.salesCash += order.total : results.salesSquare += order.total;
        order.orderItems.forEach((v) => {
          if (results.items[v.itemId]) {
            results.items[v.itemId] += v.quantity;
          } else {
            results.items[v.itemId] = v.quantity;
          }
        });
      });
      const data = { 
        "salesCash": results.salesCash,
        "salesSquare": results.salesSquare,
        "items": [
          {
            "name": "ジンジャーエール",
            "quantity": results.items[1] ? results.items[1] : 0
          },
          {
            "name": "アイスコーヒー",
            "quantity": results.items[2] ? results.items[2] : 0
          },
          {
            "name": "ホットコーヒー(mild)",
            "quantity": results.items[3] ? results.items[3] : 0
          },
          {
            "name": "ホットコーヒー(strong)",
            "quantity": results.items[13] ? results.items[13] : 0
          },
          {
            "name": "紅茶",
            "quantity": results.items[4] ? results.items[4] : 0
          },
          {
            "name": "リンゴジュース",
            "quantity": results.items[5] ? results.items[5] : 0
          },
          {
            "name": "ワッフル",
            "quantity": results.items[6] ? results.items[6] : 0
          },
          {
            "name": "フルーツミックスパフェ",
            "quantity": results.items[7] ? results.items[7] : 0
          },
          {
            "name": "抹茶パフェ",
            "quantity": results.items[10] ? results.items[10] : 0
          },
          {
            "name": "タルト",
            "quantity": results.items[9] ? results.items[9] : 0
          },
          {
            "name": "クロックムッシュ",
            "quantity": results.items[11] ? results.items[11] : 0
          },
          {
            "name": "コンソメスープ",
            "quantity": results.items[12] ? results.items[12] : 0
          }
        ]
      };
      res.json(data);
    });
  }
}); //日付を指定して注文を取得

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
