export default function Count({ quantity, setQuantity }) {
  return (
    <div className="count" style={{ display: "flex" }}>
      <button className="plus" onClick={() => setQuantity(culcQuantity("down",quantity))}>-</button>
      <p>{quantity}</p>
      <button className="minus" onClick={() => setQuantity(culcQuantity("up",quantity))}>+</button>
    </div>
  );
}

function culcQuantity(way, quantity) {
    if (way === "up") {
        return quantity + 1;
    } else if (way === "down") {
        if (quantity === 1) {
            return quantity;
        }
        return quantity - 1;
    } else {
        return quantity;
    }
}
