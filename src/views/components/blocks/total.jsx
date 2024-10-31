import Order from "../blocks/order.jsx";
import itemsData from "../../../utilities/items.json";
import Count from "../atoms/count.jsx";


export default function Total({
  order,
  setOrder,
  setIsProcessing,
  isEatIn,
  setIsEatIn,
  persons,
setPersons
}) {
  var total = 0;
  order.forEach((orderItem) => {
    const item = itemsData.find((item) => item.id === orderItem.itemId);
    total += item.price * orderItem.quantity;
  });
  return (
    <div className="total">
      <div className="total__title">
        <h1>注文内容</h1>
        <div className="backButton">
        {isEatIn === true ? <button onClick={()=>{setIsEatIn(false)}}>EAT IN</button> : <button onClick={()=>{setIsEatIn(true)}}>TAKE OUT</button>}
        </div>
        
      </div>
      <div className="total__order">
        <Order order={order} setOrder={setOrder} />
      </div>
      <div className="total__total">
        <p>Total {total} yen</p>
        <button onClick={() => setIsProcessing(true)}>注文</button>
      </div>
    </div>
  );
}

function OrderButton({ IsProcessing, setIsProcessing }) {
  return <button onClick={() => setIsProcessing(true)}>注文</button>;
}
