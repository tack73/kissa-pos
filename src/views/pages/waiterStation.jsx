import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import styles from "./waiterStation.module.css";
import itemsData from "../../utilities/items.json";
import OrderForWaiter from "../components/atoms/orderForWaiter";
import { TbTriangle } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const app = new Realm.App({ id: "application-0-vmbzlrz" });

export default function ForWaiter() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]); 
  const [isPrintable, setIsPrintable] = useState(false);
  function getOrders() {
    axios.get("/api/orders/orders").then(function (response) {
      setOrders(response.data);
    });
  }
  function getStatus() {
    axios.get("/api/status").then(function (response) {
      setStatus(response.data);
    });
  }

  function PrintStatus({ status }) {
    if(status === 0) return <FaRegCircle size={90} />
    else if(status === 1) return <TbTriangle size={90} />
    else if(status === 2) return <RxCross2 size={90} />

  }

  useEffect(() => {
    const loginAndWatch = async () => {
      // Authenticate anonymously
      await app.logIn(Realm.Credentials.anonymous());
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection_orders = mongodb.db("test").collection("orders");
      const collection_status = mongodb.db("test").collection("status");
  
      // Function to fetch data
      const fetchData = () => {
        getOrders();
        getStatus();
      };
  
      // Fetch initial data
      fetchData();
  
      // Watch for changes in both collections
      const changeStreamOrders = collection_orders.watch();
      const changeStreamStatus = collection_status.watch();
  
      const handleChange = () => {
        fetchData();
        console.log("Change in the collection");
      };
  
      const processChanges = async (changeStream) => {
        for await (const change of changeStream) {
          handleChange();
        }
      };
  
      // Start watching both streams
      processChanges(changeStreamOrders);
      processChanges(changeStreamStatus);
    };
  
    loginAndWatch();
  
    return () => {
      // Cleanup function to cancel watch streams if needed
      app.currentUser?.logOut();
    };
  }, []);

  // useEffect(() => {
  //   getOrders();
  //   getStatus();
  //   const login = async () => {
  //     // Authenticate anonymously
  //     await app.logIn(Realm.Credentials.anonymous());
  //     const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  //     const collection_orders = mongodb.db("test").collection("orders"); // Everytime a change happens in the stream, add it to the list of events
  //     const collection_status = mongodb.db("test").collection("status");
  //     for await (const change of collection_orders.watch() || collection_status.watch()) {
  //       getOrders();
  //       getStatus();
  //       console.log("Change in the collection: ");
  //     }
  //   };
  //   login();
  // }, []);

  return (
    <div>
      <div className={styles.title}>
        <h1>Waiter Station</h1>
        {/* {isPrintable ? (
          <p>プリンターを使用できます</p>
        ) : (
          <p>プリンターは使用できません</p>
        )} */}
      </div>

      {/* <div>
        {orders.map((order, i) => (
          <OrderForWaiter order={order} />
        ))}
      </div> */}
      <div className={styles.statusView}>
          {status.map((s) => (
          <div key={s.id} className={styles.status}>
            <p>{s.name}</p>
            <PrintStatus status={s.status} />
          </div>))}
      </div>
    </div>
  );
}
