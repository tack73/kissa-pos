import itemsData from "../../../utilities/items.json";
import styles from "./orderItemView.module.css";
import { useState } from "react";
import axios from "axios";

export default function OrderItemView({ order }) {
  // console.log(itemsData.filter((item) => item.id === order.itemId)[0].name);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const name = itemsData.filter((item) => item.id === order.itemId)[0].name;

  function handleComplete() {
    axios
      .patch("/api/orders/orderitems/" + order.submitId + "/" + order.orderId)
      .then((response) => {
        setIsPopupVisible(false);
      });
  }
  const date = new Date(order.date);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return (
    <div className={styles.order_item}>
      <div className={styles.name}>{name}</div>
      <div className={styles.quantity}>{order.quantity}</div>
      {/* <div className={styles.submitId}>{order.submitId}</div> */}
      <div className={styles.date}>{formattedDate}</div>
      <div className={styles.complete}>
        <button
          onClick={() => {
            setIsPopupVisible(true);
          }}
        >
          完了
        </button>
      </div>
      {isPopupVisible && (
        <div className={styles.popup}>
          <p>
            {name} (伝票番号：{order.submitId}) {order.quantity}
            個を完了にしますか
          </p>
          <div className={styles.popup_buttons}>
            <button
              onClick={() => {
                setIsPopupVisible(false);
              }}
            >
              キャンセル
            </button>
            <button onClick={handleComplete}>完了</button>
          </div>
        </div>
      )}
    </div>
  );
}
