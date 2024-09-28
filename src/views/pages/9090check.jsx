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
  const [data, setData] = useState([
    {
      area: "Tart",
      data: [],
    },
    {
      area: "Waffle",
      data: [],
    },
    {
      area: "Ginger",
      data: [],
    },
    {
      area: "Consomme_Soup",
      data: [],
    },
  ]);
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

  function setStatus9090() {
    function getStatus9090({ area }) {
      const dateSplitted = date.split("/");
      const time = `${dateSplitted[0]}-${dateSplitted[1]}-${dateSplitted[2]}`;
      axios.get(endpoint + area + "/" + time).then(function (response) {
        let arr = [];
        response.data.forEach((element) => {
          element.time = new Date(element.time);
          arr.push(element);
        });
        return arr;
      });
    }
    let result = [];
    result.push({
      area: "Tart",
      data: getStatus9090({ area: "Tart"}),
    });
    result.push({
      area: "Waffle",
      data: getStatus9090({ area: "Waffle"}),
    });
    result.push({
      area: "Ginger",
      data: getStatus9090({ area: "Ginger"}),
    });
    result.push({
      area: "Consomme_Soup",
      data: getStatus9090({ area: "Consomme_Soup"}),
    });
    console.log(result , date)
    setData(result);
    console.log(data);
  }
  useEffect(() => {
    getDates();
    setStatus9090();
    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database
      getDates();
      setStatus9090();

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("status9090"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
        getDates();
        setStatus9090();
      }
    };
    login();
  }, []);
  function onChange(e) {
    setDate(e.value);
  }

  function View9090({ area }) {
    const existsOrUndefined = (dataArray, area) => {
      const foundItem = dataArray.find((item) => item.area === area);
      return foundItem === undefined || foundItem.data === undefined;
    };
    if (existsOrUndefined(data, area)) {
      return <div>Loading...</div>;
    }
    const status = data.find((item) => item.area === area).data;
    console.log(data);
    console.log(status);
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
            {status.forEach((element) => {
              <tr>
                <td>{element.index}</td>
                <td>
                  {() => {
                    element.time = new Date(element.time);
                    return (
                      element.time.getHours() +
                      ":" +
                      element.time.getMinutes() +
                      ":" +
                      element.time.getSeconds()
                    );
                  }}
                </td>
              </tr>;
            })}
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
