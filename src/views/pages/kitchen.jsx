import axios from "axios";
import React, { useState, useEffect } from "react";
import { TbTriangle } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import * as Realm from "realm-web";
import styles from "./kitchen.module.css";
import Select from "react-select";
import OrderItemView from "../components/atoms/orderItemView";

// import OrderItemView from "../components/atoms/orderItemView";
// import itemsData from "../../utilities/items.json";

const app = new Realm.App({ id: "application-0-vmbzlrz" });

export default function Kitchen({ area, setArea }) {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [order, setOrder] = useState([]);
  const [areaName, setAreaName] = useState("Drink");
  const [items, setItems] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const endpoint = "api/status/";

  function getOrderItems(area) {
    axios.get(endpoint + area).then(function (response) {
      setOrder(response.data);
    });
  }
  function getCockItemName(area) {
    axios.get(endpoint + area).then(function (response) {
      console.log(response.data);
      setItems([...response.data]);
    });
  }
  function confAreaName() {
    if (area === "Consomme_Soup") {
      setAreaName("コンソメ");
    } else if (area === "Qroque_Monsieur") {
      setAreaName("QM");
    } else {
      setAreaName(area);
    }
  }
  useEffect(() => {
    confAreaName();
    getCockItemName(area);
    // setItems([...getCockItemName(area)]);
    // console.log(items);

    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database
      getOrderItems(area);

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("status"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
        getCockItemName(area);
      }
    };
    login();
  }, []);

  const options = [
    { value: "Drink", label: "Drink" },
    { value: "Ginger", label: "Ginger" },
    { value: "Coffee", label: "Coffee" },
    { value: "Tart", label: "Tart" },
    { value: "Waffle", label: "Waffle" },
    { value: "Parfait", label: "Parfait" },
    { value: "Qroque_Monsieur", label: "Qroque Monsieur" },
    { value: "Consomme_Soup", label: "Consomme Soup" },
  ];
  function handleChange(e) {
    setArea(e.value);
    setItems(getCockItemName(area));
    confAreaName();
  }
  function AvailabilityView({ itemName, id, status }) {
    let initialActive = [false, false, false];
    initialActive[status] = true;
    const [active, setActive] = useState(initialActive);
    function handleActive(index) {
      setIsPopupVisible(true);
      // let newActive = [false,false,false];
      // newActive[index] = !newActive[index];
      // setActive(newActive);
      axios.patch("/api/status/", { id: id, status: index }).then(() => {
        setIsPopupVisible(false);
      });
    }
    return (
      <div className={styles.itemView}>
        <h2>{itemName}</h2>
        <div className={styles.buttons}>
          <button
            onClick={() => {
              handleActive(0);
            }}
            className={
              active[0]
                ? styles.registButton_click
                : styles.registButton_notClick
            }
          >
            <FaRegCircle size={50} />
            <p>提供可能</p>
          </button>
          <button
            onClick={() => {
              handleActive(1);
            }}
            className={
              active[1]
                ? styles.registButton_click
                : styles.registButton_notClick
            }
          >
            <TbTriangle size={50} />
            <p>あと数個でローテ終了</p>
          </button>
          <button
            onClick={() => {
              handleActive(2);
            }}
            className={
              active[2]
                ? styles.registButton_click
                : styles.registButton_notClick
            }
          >
            <RxCross2 size={50} />
            <p>ローテ インターバル</p>
          </button>
        </div>
      </div>
    );
  }

  function Popup() {
    return (
      <div className={styles.popup}>
        <p>更新中</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.nav}>
        <h1>{areaName}区域 </h1>
        <Select
          placeholder={area}
          options={options}
          isSearchable={false}
          onChange={handleChange}
          className={styles.selectView}
        />
      </div>
      <div>
        <h1>提供状況</h1>
        {items.map((item, index) => (
          <AvailabilityView
            itemName={item.name}
            id={item.id}
            status={item.status}
          />
        ))}
      </div>
      {area === "Consomme_Soup" && (
        <Submit9090 area={area} setIsPopupVisible={setIsPopupVisible} />
      )}
      {area === "Waffle" && (
        <Submit9090 area={area} setIsPopupVisible={setIsPopupVisible} />
      )}
      {area === "Tart" && (
        <Submit9090 area={area} setIsPopupVisible={setIsPopupVisible} />
      )}
      {area === "Ginger" && (
        <Submit9090 area={area} setIsPopupVisible={setIsPopupVisible} />
      )}
      <>
        <h1>注文状況</h1>
        <OrderView area={area} setArea={setArea} />
      </>

      {isPopupVisible && <Popup />}
    </>
  );
}

function Submit9090({ area, setIsPopupVisible }) {
  const endpoint9090 ="/api/status9090";
  function submit9090() {
    setIsPopupVisible(true);
    const today = new Date();
    axios.post(endpoint9090, { name: area, time: today }).then(() => {
      setIsPopupVisible(false);
  });
  }
  return (
    <div>
      <button onClick={submit9090}>9090送信</button>
    </div>
  );
}

function OrderView({ area, setArea }) {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [order, setOrder] = useState([]);
  const [areaName, setAreaName] = useState("Drink");
  const endpoint = "api/orders/orderitems/";

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
    { value: "Drink", label: "Drink" },
    { value: "Waffle", label: "Waffle" },
    { value: "Parfait", label: "Parfait" },
    { value: "Qroque_Monsieur", label: "Qroque Monsieur"},
    { value : "Consomme_Soup", label: "Consomme Soup"}
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
  );}