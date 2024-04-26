import Order from "../blocks/order.jsx";
import itemsData from "../../../utilities/items.json";
import Count from "../atoms/count.jsx";
import { useState } from "react";

export default function Total({ order, setOrder }) {
  function getUniqueStr(myStrong) {
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return (
      new Date().getTime().toString(16) +
      Math.floor(strong * Math.random()).toString(16)
    );
  }


  const [persons, setPersons] = useState(1);
  var total = 0;
  order.forEach((orderItem) => {
    const item = itemsData.find((item) => item.id === orderItem.itemId);
    total += item.price * orderItem.quantity;
  });
  const submitOrder = {
    persons: persons,
    orderItems: order,
    total: total,
    submitId : getUniqueStr(),
  };

  return (
    <div className="total">
      <div className="total__title">
        <h1>注文内容</h1>
        <Count quantity={persons} setQuantity={setPersons} />
      </div>
      <div className="total__order">
        <Order order={order} setOrder={setOrder} />
      </div>
      <div className="total__total">
        <p>Total {total} yen</p>
        <button onClick={()=>{console.log(submitOrder)}}>注文</button>
      </div>
    </div>
  );
}
