import React from "react";
import styles from "./recording.module.css";
import Submit9090 from "../blocks/submit9090";
import * as Realm from "realm-web";
import { useState, useEffect } from "react";
import axios from "axios";
import NumPad from "react-numpad";

const app = new Realm.App({ id: "application-0-vmbzlrz" });

export default function Recording({ area, setIsPopupVisible }) {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [lastRotationTimes, setLastRotationTimes] = useState(0);
  const [rotationNum, setRotationNum] = useState();

  function getLastRotationTimes() {
    axios.get(`api/status9090/9090/${area}/lastTime`).then(function (response) {
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

  switch (area) {
    case "Drink":
      return (
        <div className={styles.recording}>
          <h1>各種記録</h1>
          <NumPad.Number
            onChange={(value) => {
              setRotationNum(value);
            }}
            label={"現在のローテ回数"}
            placeholder={"ローテ回数"}
            value={rotationNum}
            decimal={false}
          />
          <div className={styles.submit9090}>
            <h2>ジンジャーエール-保冷開始</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIsPopupVisible}
              type={"keep-cooling-start"}
              rotationTimes={rotationNum}
            />
          </div>
          <div className={styles.submit9090}>
            <h2>ジンジャーエール-保冷終了</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIsPopupVisible}
              type={"keep-cooling-end"}
              rotationTimes={rotationNum}
            />
          </div>
        </div>
      );
    case "Ginger":
      return (
        <div className={styles.recording}>
          <h1>各種記録</h1>
          <NumPad.Number
            onChange={(value) => {
              setRotationNum(value);
            }}
            label={"現在のローテ回数"}
            placeholder={"ローテ回数"}
            value={rotationNum}
            decimal={false}
          />
          <p>最終9090送信 : {lastRotationTimes}</p>
          <div className={styles.submit9090}>
            <h2>90-90送信</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIsPopupVisible}
              type={"9090"}
              rotationTimes={rotationNum}
            />
          </div>
          <div className={styles.submit9090}>
            <h2>冷却開始</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIsPopupVisible}
              type={"cooling-start"}
              rotationTimes={rotationNum}
            />
          </div>
          <div className={styles.submit9090}>
            <h2>冷却終了</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIsPopupVisible}
              type={"cooling-end"}
              rotationTimes={rotationNum}
            />
          </div>
        </div>
      );
    case "Tart":
      return (
        <div className={styles.recording}>
          <h1>各種記録</h1>
          <NumPad.Number
            onChange={(value) => {
              setRotationNum(value);
            }}
            label={"現在のローテ回数"}
            placeholder={"ローテ回数"}
            value={rotationNum}
            decimal={false}
          />
          <p>最終9090送信 : {lastRotationTimes}</p>
          <div className={styles.submit9090}>
            <h2>90-90送信</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIsPopupVisible}
              type={"9090"}
              rotationTimes={rotationNum}
            />
          </div>
        </div>
      );
    case "Waffle":
      return (
        <div className={styles.recording}>
          <h1>各種記録</h1>
          <NumPad.Number
            onChange={(value) => {
              setRotationNum(value);
            }}
            label={"現在のローテ回数"}
            placeholder={"ローテ回数"}
            value={rotationNum}
            decimal={false}
          />
          <p>最終9090送信 : {lastRotationTimes}</p>
          <div className={styles.submit9090}>
            <h2>90-90送信</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIsPopupVisible}
              type={"9090"}
              rotationTimes={rotationNum}
            />
          </div>
        </div>
      );
    case "Consomme_Soup":
      return (
        <div className={styles.recording}>
          <h1>各種記録</h1>
          <NumPad.Number
            onChange={(value) => {
              setRotationNum(value);
            }}
            label={"現在のローテ回数"}
            placeholder={"ローテ回数"}
            value={rotationNum}
            decimal={false}
          />
          <p>最終9090送信 : ローテ {lastRotationTimes}</p>
          <div className={styles.submit9090}>
            <h2>90-90送信</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIsPopupVisible}
              type={"9090"}
              rotationTimes={rotationNum}
            />
          </div>
          <div className={styles.submit9090}>
            <h2>食缶移し替え</h2>
            <Submit9090
              area={area}
              setIsPopupVisible={setIsPopupVisible}
              type={"transfer"}
              rotationTimes={rotationNum}
            />
          </div>
        </div>
      );
    default:
      return;
  }
}
