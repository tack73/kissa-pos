import itemsData from "../../../utilities/items.json";
import getItemsData from "../../../utilities/getItemsData.mjs";
// const itemsData = getItemsData();
export default function Item({ id, setTarget }) {
  
  function handleClick() {
    setTarget(id);
  }
  const priceObject = itemsData;
  const name = priceObject.find((item) => item.id === id).name;
  const price = priceObject.find((item) => item.id === id).price;
  const image = priceObject.find((item) => item.id === id).image;
  return (
    <button className="itemButton" onClick={handleClick}>
      <div className="item">
        <img src={image} alt={name} className="itemImg" />
        <div className="itemInfo">
          <p className="itemInfo-name">{name}</p>
          <p>{price} yen</p>
        </div>
      </div>
    </button>
  );
}
