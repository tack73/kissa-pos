import allergenData from "../../../utilities/allergy.json";
export default function AllergenItem({ id, isContained }) {
    const allergen = allergenData.find((allergen) => allergen.id === id);
    const name = allergen.allergen;
    const image = allergen.image;
    var imageSize , marginSize;
    (id > 8) ? imageSize = "28.7px" : imageSize = "35px";
    (id > 8) ? marginSize = "2px" : marginSize = "3px";
    if(isContained){
  return (
    <div className="allergenItem">
        <img src={image} alt={name} style={{width : imageSize , margin : marginSize}} />
    </div>
  );}
  return (
    <div className="allergenItem">
        <img src={image} alt={name} style={{width : imageSize , filter : "opacity(20%)" , margin : marginSize}} />
    </div>
  )
}