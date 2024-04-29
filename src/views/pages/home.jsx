import { Link } from "react-router-dom";
import styles from "./home.module.css";

export default function Home() {
    return (
      <div className={styles.home}>
        <h1>喫茶班メインシステム</h1>
        <Link to="/pos">POS</Link>
        <Link to="/kitchen">Kitchen</Link>
      </div>
    );
  }