import express from "express";

const router = express.Router();
const channelIDs = {
    "Ginger": "1296294176673235086",
    "Tart" : "1296293885777154069",
    "Waffle" : "1296293387875385427",
    "Qroque_Monsieur" : "1296293108929007657",
    "Consomme_Soup" : "1296293328240902175",
    "Parfait" : "1296293564464238643"
}

router.get("/:channnel/:type/:rotationNum/:hour-:minute-:second", (req, res) => {
    const client = req.discordClient;
    const {channnel, type, rotationNum,hour,minute,second } = req.params;
    const now = new Date();
    const sendTime = `${now.getFullYear()}/${now.getMonth()}/${now.getDate()} ${hour}:${minute}:${second}`
    const channelID = channelIDs[channnel];
    let text = "";
    switch(type){
        case "9090" : text = `90-90確認 : ${rotationNum}ローテ目（送信時刻 : ${sendTime}） `; break;
        case "cooking-start" : text = `調理開始 : ${rotationNum}ローテ目（送信時刻 : ${sendTime}）`; break;
        case "cooling-start" : text = `冷却開始 : ${rotationNum}ローテ目（送信時刻 : ${sendTime}）`; break;
        case "cooling-end" : text = `冷却終了 : ${rotationNum}ローテ目（送信時刻 : ${sendTime}）`; break;
        case "transfer" : text = `食缶移替 : ${rotationNum}ローテ目（送信時刻 : ${sendTime}）`; break;
        case "keep-cooling-start" : text = `保冷開始 : ${rotationNum}ローテ目（送信時刻 : ${sendTime}）`; break;
        case "keep-cooling-end" : text = `保冷終了 : ${rotationNum}ローテ目（送信時刻 : ${sendTime}）`; break;
        default : text = "送信エラー";
    }
    client.channels.cache.get(channelID).send(text);
    res.json({msg: `${text} を送信しました`});
});

export default router;