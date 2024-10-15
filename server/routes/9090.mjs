import express from "express";
import Status9090 from "../models/9090.mjs";
const router = express.Router();

router.get("/:type/:name/:year-:month-:day", (req, res) => {
    const { type, name, year, month, day } = req.params;
    const date = `${year}/${month}/${day}`;
    Status9090.find({ name: name, type: type }).sort([["createdAt", -1]]).then((status) => {
        let results = [];
        status.forEach((element) => {
            const time = `${element.time.getFullYear()}/${element.time.getMonth() + 1}/${element.time.getDate()}`;
            if (time === date) {
                results.push({
                    name: element.name,
                    time: element.time,
                    rotationTimes: element.rotationTimes
                });
            }
        });
        res.json(results);
    });
}
);

router.get("/9090/date", (req, res) => {
    Status9090.find({ type: "9090" }).sort([["createdAt", -1]]).then((status) => {
        let results = [];
        status.forEach((element) => {
            const time = `${element.time.getFullYear()}/${element.time.getMonth() + 1}/${element.time.getDate()}`;
            if (!results.includes(time)) {
                results.push(time);
            }
        });
        res.json(results);
    });
})

router.get("/cooking-start/:name/lastTime", (req, res) => {
    Status9090.find({ name: req.params.name, type: "cooking-start" }).sort([["createdAt", -1]]).then((status) => {
        if (status.length === 0) {
            res.json(0);
            return;
        }
        status.filter((element) => {
            const time = `${element.time.getFullYear()}/${element.time.getMonth() + 1}/${element.time.getDate()}`;
            const now = new Date();
            const today = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
            return time === today;
        });
        if (status.length === 0) {
            res.json(0);
            return;
        };
        let lastTime = 0;
        status.forEach((element) => {
            if (lastTime < element.rotationTimes) {
                lastTime = element.rotationTimes;
            }
        });
        res.json(lastTime);
    })
});

router.post("/", (req, res) => {
    const status = new Status9090({
        name: req.body.name,
        time: req.body.time,
        type: req.body.type,
        rotationTimes: req.body.rotationTimes
    });
    status.save().then((val) => {
        res.json(val);
    });
});


export default router;