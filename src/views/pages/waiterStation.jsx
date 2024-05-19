import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import styles from "./waiterStation.module.css";
import itemsData from "../../utilities/items.json";
import OrderForWaiter from "../components/atoms/orderForWaiter";

const app = new Realm.App({ id: "application-0-vmbzlrz" });

export default function ForWaiter() {
  const [orders, setOrders] = useState([]);
  const [isPrintable, setIsPrintable] = useState(false);
  function getOrders() {
    axios.get("/api/orders/orders").then(function (response) {
      setOrders(response.data);
    });
  }

  useEffect(() => {
    getOrders();
    const login = async () => {
      // Authenticate anonymously
      await app.logIn(Realm.Credentials.anonymous());
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("orders"); // Everytime a change happens in the stream, add it to the list of events
      for await (const change of collection.watch()) {
        getOrders();
        console.log("Change in the collection: ");
      }
    };
    login();
  }, []);

  return (
    <div>
      <div className={styles.title}>
        <h1>Waiter Station</h1>
        {isPrintable ? (
          <p>プリンターを使用できます</p>
        ) : (
          <p>プリンターは使用できません</p>
        )}
      </div>

      <div>
        {orders.map((order, i) => (
          <OrderForWaiter order={order} />
        ))}
      </div>
    </div>
  );
}
