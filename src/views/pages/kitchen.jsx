import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import styles from "./kitchen.module.css";
import Select from "react-select";

import OrderItemView from "../components/atoms/orderItemView";

const app = new Realm.App({ id: "application-0-vmbzlrz" });

export default function Kitchen({ area, setArea }) {
  // This useEffect hook will run only once when the page is loaded
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [order, setOrder] = useState([]);
  const endpoint = "/api/orders/orderitems/";

  function getOrderItems(area) {
    axios.get(endpoint + area).then(function (response) {
      setOrder(response.data);
    });
  }
  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database
      getOrderItems(area);

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("orders"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
        getOrderItems(area);
      }
    };
    login();
  }, []);

  const options = [
    { value: "Drinks", label: "Drinks" },
    { value: "Sweets", label: "Sweets" },
    { value: "Foods", label: "Foods" },
  ];
  function handleChange(e) {
    setArea(e.value);
  }
  // Return the JSX that will generate HTML for the page
  return (
    <>
      <div className={styles.nav}>
        <h1>キッチン {area}区域 </h1>
        <Select placeholder={area} options={options} isSearchable={false} onChange={handleChange} className={styles.selectView} />
      </div>

      {order.map((v, i) => (
        <OrderItemView order={v} />
      ))}
    </>
  );
}
