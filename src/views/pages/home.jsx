import { Link } from "react-router-dom";
import styles from "./home.module.css";

export default function Home({ setIsEatIn }) {
    return (
      <div className={styles.home}>
        <h1>喫茶班メインシステム</h1>
        <Link to="/pos" onClick={()=>{setIsEatIn(true)}}>POS-EAT IN</Link>
        <Link to="/pos" onClick={()=>{setIsEatIn(false)}}>POS-TAKE OUT</Link>
        <Link to="/kitchen">Kitchen</Link>
        <Link to="/waiterstation">Waiter Station</Link>
        <Link to="/kitchenForPafait">KitchenForPafait</Link>
      </div>
    );
  }