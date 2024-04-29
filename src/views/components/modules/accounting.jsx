import styles from "./accounting.module.css";
import itemsData from "../../../utilities/items.json";
import { MdPayment, MdPayments } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Accounting({
  setIsProcessing,
  payment,
  setPayment,
  order,
  persons,
}) {
  const navigate = useNavigate();
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
      isServed: false,
    };
    axios
      .post("/api/orders", submitOrder)
      .then((response) => navigate("/complete"))
      .catch((error) => console.log(error));
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
    </>
  );
}
