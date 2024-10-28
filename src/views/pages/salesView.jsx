import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import styles from "./salesView.module.css";
import Select from "react-select";

const app = new Realm.App({ id: "application-0-vmbzlrz" });

export default function SalesView() {
  const [user, setUser] = useState(null);
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(10);
  const [day, setDay] = useState(28);
  const [info, setInfo] = useState({ items: [] });
  const options = [
    { value : [2024,10,28], label: "2024/10/28" },
    { value : [2024,10,31], label: "2024/10/31" },
    { value : [2024,11,1], label: "2024/11/1" },
    { value : [2024,11,2], label: "2024/11/2" },
    { value : [2024,11,3], label: "2024/11/3" }
  ]
  function setDate(value){
    setYear(value[0]);
    setMonth(value[1]);
    setDay(value[2]);
    getInfo(value[0], value[1], value[2]);
  }
  function getInfo(year, month, day) {
    if (year === undefined || month === undefined || day === undefined) {
      const date = new Date();
      year = date.getFullYear();
      month = date.getMonth() + 1;
      day = date.getDate();
    }
    console.log(year, month, day);
    axios
      .get(`/api/orders/ordersAtDate/${year}-${month}-${day}`)
      .then(function (response) {
        setInfo(response.data);
        console.log(response.data);
      });
  }

  useEffect(() => {
    getInfo();
    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user);
      getInfo(year, month, day);

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("orders");

      for await (const change of collection.watch()) {
        getInfo(year, month, day);
      }
    };
    login();
  }, []);

  function InfoItem({ element }) {
    return (
      <tr>
        <td>{element.name}</td>
        <td>{element.quantity}</td>
      </tr>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>売上情報</h1>
        <Select placeholder="2024/10/28" options={options} onChange={(e) => setDate(e.value)} />
      <table>
        <tr>
          <th>品目名</th>
          <th>数量</th>
        </tr>
        {info.items.map((element) => (
          <InfoItem element={element} />
        ))}
      </table>
      <p>現金売上: {info.salesCash}円</p>
      <p>電子決済売上: {info.salesSquare}円</p>
    </div>
  );
}
