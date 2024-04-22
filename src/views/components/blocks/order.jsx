import OrderView from "../atoms/orderView.jsx";

export default function Order({ order, setOrder }) {
    if(order.length === 0){
        return (
            <div className="order">
                <p>注文がありません</p>
            </div>
        );
    }
    return (
        <div className="order">
            {order.map((orderItem) => (
                <OrderView orderItem={orderItem} order={order} setOrder={setOrder} />
            ))}
        </div>
    );
    }