import itemsData from "../../../utilities/items.json";
import { useState } from "react";
import Count from "../atoms/count.jsx";
import AllergenView from "./allergenView.jsx";

export default function Detail({ id, order, setOrder, setTarget,setIsEatIn,isEatIn }) {
  const [quantity, setQuantity] = useState(1);

  if (id === null) return <div className="detail"></div>;
  const item = itemsData.find((item) => item.id === id);
  const name = item.name;
  const price = item.price;
  const area = item.area;
  var orderItem = { itemId: id, quantity: quantity, options: {} ,area : area};
  var orders = order;
  function getUniqueStr(myStrong) {
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return (
      new Date().getTime().toString(16) +
      Math.floor(strong * Math.random()).toString(16)
    );
  }

  return (
    <div className="detail">
      <div className="detailInfo">
        <div className="detailText">
          <h2>{name}</h2>
          <p>{price} yen</p>
        </div>
        <div className="backButton">
          <button
            onClick={() => {
              setTarget(null);
            }}
          >
            Back
          </button>
        </div>
      </div>
      <div className="allergenView">
        <AllergenView id = {id} />
      </div>

      <div className="detailNavigation">
        <div className="detailQuantity">
          <Count quantity={quantity} setQuantity={setQuantity} />
        </div>
        <div className="detailButton">
          <button
            onClick={() => {
              orderItem.orderId = getUniqueStr();
              orderItem.isCompleted = false;
              setOrder([...orders, orderItem]);
              setQuantity(1);
              setTarget(null);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
