import AllergenItem from "../atoms/allergen";
import AllergenInfo from "../../../utilities/allergy.json";
import itemInfo from "../../../utilities/items.json";

export default function AllergenView({ id }) {
  const itemId = id;
  const allergen = itemInfo.find((item) => item.id === itemId).allergen;
  return (
    <>
      <p>特定原材料等</p>
      <div className="allergenIcons">
        {AllergenInfo.map((val, index) => (
          <AllergenItem
            key={index}
            id={val.id}
            isContained={allergen.includes(val.id)}
          />
        ))}
      </div>
    </>
  );
}
