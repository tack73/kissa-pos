import { Link } from "react-router-dom";
import React, { useState } from "react";
import styles from "./9090check.module.css";
import axios from "axios";
import Select from "react-select";

export default function Check() {
  const [date, setDate] = useState("");
  const endpoint = "api/status9090/";
  const datas = axios.get(endpoint + "date");
  let options = [];
  datas.then((res) => {
    res.data.forEach((element) => {
      options.push({ value: element, label: element });
    });
  });

  function onChange(e) {
    setDate(e.value);
  }
  function Status9090view({ area, date }) {
    // let data = [];
    // await axios
    //   .get(endpoint, { params: { name: area, time: date } })
    //   .then((res) => {
    //     data = res.data;
    //   });
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
            {/* {data.map((item) => (
              <tr>
                <td>{item.index}</td>
                <td>{item.time}</td>
              </tr>
            ))} */}
            <tr>
                <td>1</td>
                <td>2021/9/1</td>
            </tr>
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
      <Status9090view area="Tart" date={date} />
      <Status9090view area="Waffle" date={date} />
      <Status9090view area="Ginger" date={date} />
      <Status9090view area="Consomme_Soup" date={date} />
      <Link to="/">Back to Home</Link>
    </div>
  );
}
