import itemsData from "../../../utilities/items.json";
export default function OrderView({ orderItem ,order ,setOrder}) {
    const name = itemsData.find((item) => item.id === orderItem.itemId).name;
    return (
        <div className="orderItem">
            <div className="orderItem__name">{name}</div>
            <div className="orderItem__quantity">{orderItem.quantity} 個</div>
            <button onClick={() => setOrder(order.filter((item) => item.orderId !== orderItem.orderId))}>削除</button>
        </div>
    );
}