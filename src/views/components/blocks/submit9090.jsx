import React from "react";
import axios from "axios";
import styles from "./submit9090.module.css";

export default function Submit9090({
  area,
  setIsPopupVisible,
  type,
  rotationTimes,
}) {
  const endpoint9090 = "/api/status9090";
  function submit9090() {
    setIsPopupVisible(true);
    const today = new Date();
    axios
      .post(endpoint9090, {
        name: area,
        time: today,
        type: type,
        rotationTimes: rotationTimes,
      }).then(() => {
        let channel;
        let submitTime;
        axios.get(
          `/api/discord/${channel}/${type}/${rotationTimes}/${submitTime}`
        );
      })
      .then(() => {
        axios.get(
          "https://script.google.com/macros/s/AKfycbz8FiuL9qVD10xbGfE9vGyXncwCfF5J5WQzGXqIFb2ao0FEliH9EU-I2eYyGrelqltAbw/exec"
        );
      });
  }
  let text;
  switch (type) {
    case "9090":
      text = "90-90送信";
      break;
    case "cooling-start":
      text = "冷却開始";
      break;
    case "cooling-end":
      text = "冷却終了";
      break;
    case "keep-cooling-start":
      text = "保冷開始";
      break;
    case "keep-cooling-end":
      text = "保冷終了";
      break;
    case "transfer" :
      text = "移し替え";
      break;
    case "cooking-start":
      text = "調理開始";
      break;
    default: 
      text = "例外";
  }
  return (
    <div>
      <button onClick={submit9090} className={styles.button9090}>
        {text}
      </button>
    </div>
  );
}
