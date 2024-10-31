import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { TbTriangle } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import styles from "./serveStatusView.module.css";
import movie from "../../video/1_1.mp4";


const app = new Realm.App({ id: "application-0-vmbzlrz" });

export default function ServeStatusView() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState([]);
  function getStatus() {
    axios.get("/api/status").then(function (response) {
      setStatus(response.data);
    });
  }

  useEffect(() => {
    getStatus();

    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database
      getStatus();

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("status"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
        getStatus();
      }
    };
    login();
  }, []);

  function StatusItem({ element }) {
    return (
      <div className={styles.container}>
        <p className={styles.elementName}>{element.name}</p>
        {element.status === 0 ? (
          <>
            <FaRegCircle size={50} />
            <p className={styles.status}>提供中</p>
          </>
        ) : element.status === 1 ? (
          <>
            <TbTriangle size={50} />
            <p className={styles.status}>待ち時間有</p>
          </>
        ) : (
          <>
            <RxCross2 size={50} />
            <p className={styles.status}>提供停止</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={styles.serveStatusView}>
      {/* <div className={styles.videoWrap}>
        <video autoPlay muted loop>
          <source src={movie} type="video/mp4" />
        </video>
      </div> */}
      <div className={styles.statusList}>
        {status.map((element) => (
          <StatusItem element={element} />
        ))}
      </div>
    </div>
  );
}
