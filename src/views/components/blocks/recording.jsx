import React from "react";
import styles from "./recording.module.css";
import Submit9090 from "../blocks/submit9090";
import NumPad from "../blocks/numPad";
import * as Realm from "realm-web";
import { useState, useEffect } from "react";
import axios from "axios";

const app = new Realm.App({ id: "application-0-vmbzlrz" });

export default function Recording({ area, setIsPopupVisible }) {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [lastRotationTimes, setLastRotationTimes] = useState(0);
  const [rotationNum, setRotationNum] = useState(0);
  const [isNumPadVisible, setIsNumPadVisible] = useState(false);
  const [is9090PopupVisible, setIs9090PopupVisible] = useState(false);

  function getLastRotationTimes() {
    axios
      .get(`api/status9090/cooking-start/${area}/lastTime`)
      .then(function (response) {
        setLastRotationTimes(response.data);
      });
  }
  useEffect(() => {
    getLastRotationTimes();
    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("status9090"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
        getLastRotationTimes();
      }
    };
    login();
  }, []);

  function Header() {
    return (
      <>
        <h1>各種記録</h1>
        <p>最終送信（調理開始時） : {lastRotationTimes}</p>
        <div className={styles.submit9090}>
        <p>現在のローテ : {rotationNum}</p>
        <button
          onClick={() => {
            setRotationNum(0);
            setIsNumPadVisible(true);
          }}
          className={styles.buttonRotationNum}
        >
          変更
        </button>
        </div>
        
        <div className={styles.submit9090}>
          <h2>調理開始</h2>
          <Submit9090
            area={area}
            setIsPopupVisible={setIs9090PopupVisible}
            type={"cooking-start"}
            rotationTimes={rotationNum}
          />
        </div>
        {isNumPadVisible && (
          <div className={styles.popup}>
            <div className={styles.popup_numpad}>
              <NumPad setNum={setRotationNum} num={rotationNum} />
              <button onClick={() => setIsNumPadVisible(false)}>完了</button>
            </div>
          </div>
        )}
        {is9090PopupVisible && (
          <div className={styles.popup}>
            <div className={styles.popup_numpad}>
              <h2 className={styles.submitCompleted}>送信完了</h2>
              <button onClick={() => setIs9090PopupVisible(false)}>閉じる</button>
            </div>
          </div>
        )}
      </>
    );
  }

  switch (area) {
    case "Drink":
      return (
        <div className={styles.recording}>
          <Header />
          <div className={styles.submit9090}>
            <h2>ジンジャーエール-保冷開始</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIs9090PopupVisible}
              type={"keep-cooling-start"}
              rotationTimes={rotationNum}
            />
          </div>
          <div className={styles.submit9090}>
            <h2>ジンジャーエール-保冷終了</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIs9090PopupVisible}
              type={"keep-cooling-end"}
              rotationTimes={rotationNum}
            />
          </div>
        </div>
      );
    case "Ginger":
      return (
        <div className={styles.recording}>
          <Header />
          <div className={styles.submit9090}>
            <h2>90-90送信</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIs9090PopupVisible}
              type={"9090"}
              rotationTimes={rotationNum}
            />
          </div>
          <div className={styles.submit9090}>
            <h2>冷却開始</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIs9090PopupVisible}
              type={"cooling-start"}
              rotationTimes={rotationNum}
            />
          </div>
          <div className={styles.submit9090}>
            <h2>冷却終了</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIs9090PopupVisible}
              type={"cooling-end"}
              rotationTimes={rotationNum}
            />
          </div>
        </div>
      );
    case "Tart":
      return (
        <div className={styles.recording}>
          <Header />
          <div className={styles.submit9090}>
            <h2>90-90送信</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIs9090PopupVisible}
              type={"9090"}
              rotationTimes={rotationNum}
            />
          </div>
        </div>
      );
    case "Waffle":
      return (
        <div className={styles.recording}>
          <Header />
          <div className={styles.submit9090}>
            <h2>90-90送信</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIs9090PopupVisible}
              type={"9090"}
              rotationTimes={rotationNum}
            />
          </div>
        </div>
      );
    case "Consomme_Soup":
      return (
        <div className={styles.recording}>
          <Header />
          <div className={styles.submit9090}>
            <h2>90-90送信</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIs9090PopupVisible}
              type={"9090"}
              rotationTimes={rotationNum}
            />
          </div>
          <div className={styles.submit9090}>
            <h2>食缶移し替え</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIs9090PopupVisible}
              type={"transfer"}
              rotationTimes={rotationNum}
            />
          </div>
        </div>
      );
    default:
      return (
        <div className={styles.recording}>
          <Header />
        </div>
      );
  }
}
