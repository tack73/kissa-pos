import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from "./9090check.module.css";
import axios from "axios";
import Select from "react-select";
import * as Realm from "realm-web";

const app = new Realm.App({ id: "application-0-vmbzlrz" });

export default function Check() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("2024/9/24");
  const [options, setOptions] = useState([]);
  const [data, setData] = useState([]);
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

  function setStatus9090({ date }) {
    function getStatus9090({ area, date }) {
      const dateSplitted = date.split("/");
      const time = `${dateSplitted[0]}-${dateSplitted[1]}-${dateSplitted[2]}`;
      axios.get(endpoint + area + "/" + time).then(function (response) {
        return response.data;
      });
    }
    let data = [];
    data.push({
      area: "Tart",
      data: getStatus9090({ area: "Tart", date: date }),
    });
    data.push({
      area: "Waffle",
      data: getStatus9090({ area: "Waffle", date: date }),
    });
    data.push({
      area: "Ginger",
      data: getStatus9090({ area: "Ginger", date: date }),
    });
    data.push({
      area: "Consomme_Soup",
      data: getStatus9090({ area: "Consomme_Soup", date: date }),
    });
    setData(data);
  }
  useEffect(() => {
    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database
      getDates();
      setStatus9090({ date: date });

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("status9090"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
        getDates();
        setStatus9090({ date: date });
      }
    };
    login();
  }, []);
  function onChange(e) {
    setDate(e.value);
    console.log(date);
  }

  function View9090({ area }) {
    if (!data.some((item) => item.area === area)) {
      return <div>Loading...</div>;
    }
    const status = data.find((item) => item.area === area).data;
    return (
      <div>
        <h1>{area}</h1>
        <table>
          <thead>
            <tr>
              <th>ローテ回数</th>
              <th>時間</th>
            </tr>
          </thead>
          <tbody>
            {status.map((item) => (
              <tr>
                <td>{item.index}</td>
                <td>
                  {() => {
                    item.time = new Date(item.time);
                    return (
                      item.time.getHours() +
                      ":" +
                      item.time.getMinutes() +
                      ":" +
                      item.time.getSeconds()
                    );
                  }}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
      <View9090 area="Tart" />
      <View9090 area="Waffle" />
      <View9090 area="Ginger" />
      <View9090 area="Consomme_Soup" />
      <Link to="/">Back to Home</Link>
    </div>
  );
}
