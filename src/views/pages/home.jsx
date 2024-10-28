import { Link } from "react-router-dom";
import styles from "./home.module.css";

export default function Home({ setIsEatIn }) {
    return (
      <div className={styles.home}>
        <h1>喫茶班メインシステム</h1>
        <Link to="/pos" onClick={()=>{setIsEatIn(true)}}>POS-EAT IN</Link>
        <Link to="/pos" onClick={()=>{setIsEatIn(false)}}>POS-TAKE OUT</Link>
        <Link to="/kitchen">厨房システム</Link>
        <Link to="/sales">売上表示</Link>
        <Link to="/serve-status-view">提供状況</Link>
      </div>
    );
  }