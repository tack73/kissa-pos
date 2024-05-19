import express from "express";
import {itemsData} from "../assets/items.mjs";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(itemsData);
}
);

export default router;