import styles from "./orderForWaiter.module.css";
import itemsData from "../../../utilities/items.json";
import { useState, useEffect } from "react";
import axios from "axios";

export default function OrderForWaiter({ order }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  function completeOrder() {
    // axios.patch(`/api/orders/${order.submitId}`).then((response) => {
    axios.patch(`/api/orders/${order.submitId}`).then((response) => {
      setIsPopupVisible(false);
    });
  }

  return (
    <div className={styles.orderView}>
      <div className={styles.submitId}>{order.submitId}</div>
      <div className={styles.tableNum}>{order.tableNum}</div>
      <div className={styles.orders}>
        <ul>
          {order.orderItems.map((orderItem, i) => {
            const item = itemsData.find((item) => item.id === orderItem.itemId);
            return (
              <li>
                <div key={i} className={styles.orderItem}>
                  <div className={styles.orderItem_name}>{item.name}</div>
                  <div className={styles.orderItem_quantity}>
                    {orderItem.quantity}
                  </div>
                  {orderItem.isCompleted ? (
                    <div
                      style={{
                        backgroundColor: "blue",
                        position: "absolute",
                        left: "50vw",
                        color: "white",
                      }}
                    >
                      調理済み
                    </div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: "red",
                        position: "absolute",
                        left: "50vw",
                        color: "white",
                      }}
                    >
                      未調理
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {order.orderItems.every((orderItem) => orderItem.isCompleted === true) && (
        <button
          onClick={() => {
            setIsPopupVisible(true);
          }}
          className={styles.completeButton}
        >
          完了
        </button>
      )}
      <button className={styles.printButton}>伝票印字</button>

      {isPopupVisible && (
        <div className={styles.popup}>
          <p>伝票番号：{order.submitId}の注文を完了にしますか</p>
          <div className={styles.popup_buttons}>
            <button
              onClick={() => {
                setIsPopupVisible(false);
              }}
            >
              キャンセル
            </button>
            <button onClick={completeOrder}>完了</button>
          </div>
        </div>
      )}
    </div>
  );
}
