import express from "express";
import Status from "../models/status.mjs";
const router = express.Router();

router.get("/:area", (req, res) => {
    Status.find({ area: req.params.area }).then((status) => {
        let results = [];
        status.forEach((element) => {
            results.push({
                id: element.id,
                name: element.name,
                status: element.status,
            });
        });
        console.log(results);
        res.json(results);
    });
}
);

router.patch("/", (req, res) => {
    const  id  = req.body.id;
    const status = req.body.status;
    Status.findOne({ id: id }).then((e) => {
        e.status = status;
        e.save().then((val) => {
            res.json(val);
        });
    });
});


export default router;