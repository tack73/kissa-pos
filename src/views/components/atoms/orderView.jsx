import itemsData from "../../../utilities/items.json";
export default function OrderView({ orderItem, order, setOrder }) {
  const name = itemsData.find((item) => item.id === orderItem.itemId).name;
  return (
    <div className="orderItem">
      <div className="orderItem__info">
        <p>{name}</p>
        <p>{orderItem.quantity} 個</p>
      </div>
      <div className="orderItem__delete">
        <button
          onClick={() =>
            setOrder(order.filter((item) => item.orderId !== orderItem.orderId))
          }
        >
          削除
        </button>
      </div>
    </div>
  );
}
