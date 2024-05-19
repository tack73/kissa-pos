import { Link } from "react-router-dom";
import styles from "./complete.module.css";
import axios from "axios";

export default function Complete({ init, submitId }) {
  function printReceipt() {
    axios
      .get(`/api/orders/receipt/${submitId}`, { responseType: "pdf" })
      .then((response) => {
        console.log(response.data);
        const printData = encodeURIComponent(response.data);
        const successURL = window.location.href;
        const urlData = `tmprintassistant://tmprintassistant.epson.com/print?ver=1&data-type=pdf&data=${printData}&success=${encodeURIComponent(successURL)}`;
        window.location.href = urlData;
        
      });
  }

  return (
    <div className={styles.completePage}>
      <h1 className={styles.title}>注文が完了しました</h1>
      <div className={styles.buttons}>
        <button onClick={printReceipt}>レシート印字</button>
        <Link to="/pos">
          <button onClick={init}>新規注文</button>
           
        </Link>
      </div>
    </div>
  );
}
