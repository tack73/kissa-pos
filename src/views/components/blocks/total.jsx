import Order from "../blocks/order.jsx";
import itemsData from "../../../utilities/items.json";
export default function Total({ order, setOrder }) {
  var total = 0;
  order.forEach((orderItem) => {
    const item = itemsData.find((item) => item.id === orderItem.itemId);
    total += item.price * orderItem.quantity;
  });
  return (
    <div className="total">
      <div className="total__title">
        <h1>注文内容</h1>
      </div>
      <div className="total__order">
        <Order order={order} setOrder={setOrder} />
      </div>
      <div className="total__total">
        <p>Total {total} yen</p>
        <button>注文</button>
      </div>
    </div>
  );
}
