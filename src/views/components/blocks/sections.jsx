import Data from "../../../utilities/items.json";
import Item from "../atoms/items";

export default function Section({ genre , setTarget}) {
  const items = Data.filter((item) => item.type === genre);

  return (
    <div className="section">
      <h1>{genre}</h1>
      <div className="itemCards">
        {items.map((item, index) => (
          <div><Item key={index} id={item.id} setTarget={setTarget} /></div>
        ))}
      </div>
    </div>
  );
}
