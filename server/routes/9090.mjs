import express from "express";
import Status9090 from "../models/9090.mjs";
const router = express.Router();

router.get("/", (req, res) => {
    Status9090.find({name: req.params.name}).sort([["createdAt", -1]]).then((status) => {
        let results = [];
        let index = 1;
        status.forEach((element) => {
            const time = `${element.time.getFullYear()}/${element.time.getMonth() + 1}/${element.time.getDate()}`;
            if(time === req.params.time){
                results.push({
                    name: element.name,
                    time: element.time,
                    index : index
                });
                index++;
            }
        });
        res.json(results);
    });
}
);

router.get("/date",(req,res)=>{
    Status9090.find().sort([["createdAt", -1]]).then((status) => {
        let results = [];
        status.forEach((element) => {
            const time = `${element.time.getFullYear()}/${element.time.getMonth() + 1}/${element.time.getDate()}`;
            if(!results.includes(time)){
                results.push(time);
            }
        });
        res.json(results);
    });
})

router.post("/", (req, res) => {
    const status = new Status9090({
        name: req.body.name,
        time: req.body.time,
    });
    status.save().then((val) => {
        res.json(val);
    });
});


export default router;