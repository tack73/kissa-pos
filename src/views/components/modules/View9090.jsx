import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Realm from "realm-web";
const app = new Realm.App({ id: "application-0-vmbzlrz" });

export default function Check9090({ area, date }) {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const endpoint = "api/status9090/";
  function getStatus9090({ area, date }) {
    const dateSplitted = date.split("/");
    const time = `${dateSplitted[0]}-${dateSplitted[1]}-${dateSplitted[2]}`;
    axios
      .get(endpoint + area + "/" + time)
      .then(function (response) {
        setData(response.data);
      });
  }
  useEffect(() => {
    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database
      getStatus9090({ area: area, date: date });

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("status9090"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
        getStatus9090({ area: area, date: date });
      }
    };
    login();
  }, []);

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
          {data.map((item) => (
            <tr>
              <td>{item.index}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
