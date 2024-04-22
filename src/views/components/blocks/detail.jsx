import itemsData from "../../../utilities/items.json";
import { useState } from "react";
import Count from "../atoms/count.jsx";

export default function Detail({ id ,order, setOrder,setTarget}) {
  const [quantity, setQuantity] = useState(1);

  if (id === null) return <div className="detail"></div>;
  const item = itemsData.find((item) => item.id === id);
  const name = item.name;
  const price = item.price;
  const image = item.image;
  const options = item.options;
  var orderItem = { "itemId" : id, "quantity" : quantity, "options" : {} };
  var orders = order;
  function getUniqueStr(myStrong){
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
   }
   
  
  return (
    <div className="detail">
      <div className="detailInfo">
        <h2>{name}</h2>
        <p>{price} yen</p>
        <img src={image} alt={name} className="detailImg" />
      </div>
      <div className="detailNavigation">
        <div className="detailQuantity">
          <Count quantity={quantity} setQuantity={setQuantity} />
        </div>
        <div className="detailButton">
          <button onClick={()=>{
            orderItem.orderId = getUniqueStr();
            orderItem.isCompleted = false;
            setOrder([...orders,orderItem]);
            setQuantity(1);
            setTarget(null);
            }}>追加</button>
        </div>
      </div>
    </div>
  );
}
