import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import styles from "./kitchen.module.css";
import Select from "react-select";

import OrderItemView from "../components/atoms/orderItemView";
// import itemsData from "../../utilities/items.json";

const app = new Realm.App({ id: "application-0-vmbzlrz" });


export default function KitchenForPafait({ area, setArea }) {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [order, setOrder] = useState([]);
  const [areaName, setAreaName] = useState("Parfait");
  const endpoint = "api/orders/orderitems/";
  setArea("Parfait");

  function getOrderItems(area) {
    axios.get(endpoint + area).then(function (response) {
      setOrder(response.data);
    });
  }
  function confAreaName(){
    if(area === "Consomme_Soup"){
      setAreaName("コンソメ");
    }else if(area === "Qroque_Monsieur"){
      setAreaName("QM");
    }else {
      setAreaName(area);
    }

  }
  useEffect(() => {
    console.log("starting");
    confAreaName();
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
    { value: "Parfait", label: "Parfait" }
  ];
  function handleChange(e) {
    setArea(e.value);
    confAreaName();
  }
  // Return the JSX that will generate HTML for the page

  return (
    <>
      <div className={styles.nav}>
        <h1>{areaName}区域 </h1>
        <Select placeholder={area} options={options} isSearchable={false} onChange={handleChange} className={styles.selectView} />
      </div>

      {order.map((v, i) => (
        <OrderItemView order={v} />
      ))}
    </>
  );
}