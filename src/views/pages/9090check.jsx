import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from "./9090check.module.css";
import axios from "axios";
import Select from "react-select";
import * as Realm from "realm-web";
import View9090 from "../components/modules/View9090.jsx";

const app = new Realm.App({ id: "application-0-vmbzlrz" });





export default function Check() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("日付を選択");
  const [options, setOptions] = useState([]);
  const endpoint = "api/status9090/";
  function getDates() {
    axios.get(endpoint + "date").then(function (response) {
      setOptions(
        response.data.map((date) => {
          return { value: date, label: date };
        })
      );
    });
  }
  useEffect(() => {
    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database
      getDates();

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("status9090"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
        getDates();
      }
    };
    login();
  }, []);
  
  

  function onChange(e) {
    setDate(e.value);
  }
  return (
    <div>
      <h1>9090 Check</h1>
      <Select
        options={options}
        isSearchable={true}
        className={styles.selectView}
        onChange={onChange}
      />
      <View9090 area="Tart" date={date} />
      <View9090 area="Waffle" date={date} />
      <View9090 area="Ginger" date={date} />
      <View9090 area="Consomme_Soup" date={date} />
      <Link to="/">Back to Home</Link>
    </div>
  );
}
