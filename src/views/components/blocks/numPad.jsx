import styles from "./numPad.module.css";
import { IoBackspaceOutline } from "react-icons/io5";
export default function NumPad({ setNum, num }) {
  function handleNumClick(e) {
    const targetNum = e.target.textContent;
    if (targetNum === "C") {
      setNum(0);
      return;
    }
    if (targetNum === "0" && num === 1) {
      return;
    }
    if (num === 0) {
      setNum(Number(targetNum));
    } else {
      setNum(Number(num.toString() + targetNum));
    }
  }
  function handleBackSpace() {
    if (num === 0) {
      return;
    }
    setNum(Number(num.toString().slice(0, -1)));
  }

  return (
    <div className={styles.numpad}>
        <div className={styles.numDisplay}><p>{num}</p></div>
      <div className={styles.numpad_row}>
        <button onClick={handleNumClick}>1</button>
        <button onClick={handleNumClick}>2</button>
        <button onClick={handleNumClick}>3</button>
      </div>
      <div className={styles.numpad_row}>
        <button onClick={handleNumClick}>4</button>
        <button onClick={handleNumClick}>5</button>
        <button onClick={handleNumClick}>6</button>
      </div>
      <div className={styles.numpad_row}>
        <button onClick={handleNumClick}>7</button>
        <button onClick={handleNumClick}>8</button>
        <button onClick={handleNumClick}>9</button>
      </div>
      <div className={styles.numpad_row}>
        <button onClick={handleNumClick}>C</button>
        <button onClick={handleNumClick}>0</button>
        <button onClick={handleBackSpace}><IoBackspaceOutline /></button>
      </div>
    </div>
  );
}
