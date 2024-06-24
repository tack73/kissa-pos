import styles from "./accounting.module.css";
import itemsData from "../../../utilities/items.json";
import { MdPayment, MdPayments } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import NumPad from "../blocks/numPad";
var tableNumHolder = 0;

export default function Accounting({
  setIsProcessing,
  payment,
  setPayment,
  order,
  persons,
  setSubmitId,
}) {
  const [tableNum, setTableNum] = useState(tableNumHolder);
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  function getUniqueStr(myStrong) {
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return (
      new Date().getTime().toString(16) +
      Math.floor(strong * Math.random()).toString(16)
    );
  }

  function handleSubmit() {
    var total = 0;
    order.forEach((orderItem) => {
      const item = itemsData.find((item) => item.id === orderItem.itemId);
      total += item.price * orderItem.quantity;
    });
    const submitOrder = {
      persons: persons,
      orderItems: order,
      total: total,
      payment: payment,
      submitId: getUniqueStr(),
      tableNum: tableNum,
      isServed: false,
    };
    setSubmitId(submitOrder.submitId);
    setIsPrinting(true);
    axios
      .post("/api/orders", submitOrder)
      .then((response) => {
        axios
          .get(
            `https://informed-chief-stork.ngrok-free.app/api/orders/${submitOrder.submitId}`,
            { headers: { "ngrok-skip-browser-warning": "something" } }
          )
          .then((response) => {
            setIsPrinting(false);
            navigate("/complete");
          })
          .catch((error) => {
            console.log(error);
            setIsPrinting(false);
            navigate("/complete");
          });
      })
      .catch((error) => console.log(error));
    console.log(submitOrder);
    // axios.get(`http://192.168.1.13:5000/api/orders/${submitOrder.submitId}`).then((response) => console.log(response.data)).catch((error) => console.log(error));

    console.log(submitOrder);
  }

  function PaymentView() {
    if (payment === "cash") {
      return (
        <div className={styles.payment_nav}>
          <h2>現金でお支払い</h2>
          <button onClick={handleSubmit}>支払い完了</button>
        </div>
      );
    }
    if (payment === "square") {
      return (
        <div className={styles.payment_nav}>
          <h2>電子決済でお支払い</h2>
          <button>Square を開く</button>
        </div>
      );
    }
    return (
      <div className={styles.payment_nav}>
        <h2>決済方法を選択</h2>
      </div>
    );
  }
  return (
    <>
      <div className={styles.tableNum}>
        <h2>テーブル番号 : {tableNum}</h2>
        <button
          onClick={() => {
            setIsPopupVisible(true);
            setTableNum(0);
          }}
        >
          入力
        </button>
      </div>
      {isPopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popup_numpad}>
            <NumPad setNum={setTableNum} num={tableNum} />
          </div>
          <div className={styles.popup_OK}>
            <button
              onClick={() => {
                setIsPopupVisible(false);
                tableNumHolder = tableNum;
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className={styles.nav}>
        <h1 className={styles.title}>決済方法を選択</h1>
        <button
          onClick={() => {
            setIsProcessing(false);
          }}
        >
          Back
        </button>
      </div>
      <div className={styles.container}>
        <button
          onClick={() => {
            setPayment("cash");
          }}
          className={styles.card}
        >
          <MdPayments size={100} className={styles.icon} />
          <h2>現金</h2>
        </button>
        <button
          onClick={() => {
            setPayment("square");
          }}
          className={styles.card}
        >
          <MdPayment size={100} className={styles.icon} />
          <h2>電子決済</h2>
        </button>
      </div>
      <div className={styles.payment}>
        <PaymentView />
      </div>
      {isPrinting && (
        <div className={styles.printing}>
          <h2>印刷中...</h2>
        </div>
      )}
    </>
  );
}
