import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from "./9090check.module.css";
import axios from "axios";
import Select from "react-select";

export default function Check() {
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const endpoint = "api/status9090/";
  let options = [];
  useEffect(() => {
    const datas = axios.get(endpoint + "date");
    datas.then((res) => {
      res.data.forEach((element) => {
        options.push({ value: element, label: element });
      });
    });
  });
  
  

  function onChange(e) {
    setDate(e.value);
  }
  function Status9090view({ area, date, data, setData }) {
    axios
      .get(endpoint, { params: { name: area, time: date } })
      .then((res) => {
        setData(res.data);
      });
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

  return (
    <div>
      <h1>9090 Check</h1>
      <Select
        options={options}
        isSearchable={true}
        className={styles.selectView}
        onChange={onChange}
      />
      <Status9090view area="Tart" date={date} data={data} setData={setData} />
      <Status9090view area="Waffle" date={date} data={data} setData={setData} />
      <Status9090view area="Ginger" date={date} data={data} setData={setData} />
      <Status9090view area="Consomme_Soup" date={date} data={data} setData={setData} />
      <Link to="/">Back to Home</Link>
    </div>
  );
}
