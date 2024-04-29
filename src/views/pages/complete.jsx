import { Link } from "react-router-dom";
import styles from "./complete.module.css";

export default function Complete({ init }) {
  return (
    <div className={styles.completePage}>
      <h1 className={styles.title}>注文が完了しました</h1>
      <div className={styles.buttons}>
        <button>レシート印字</button>
        <Link to="/">
          <button onClick={init}>新規注文</button>
        </Link>
      </div>
    </div>
  );
}
