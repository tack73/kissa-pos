import Detail from "../blocks/detail.jsx";
import Total from "../blocks/total.jsx";

export default function RightPannel({ order, setOrder, target, setTarget, setIsProcessing ,IsProcessing ,persons, setPersons , isEatIn, setIsEatIn}) {
    if(target === null){
        return <Total isEatIn={isEatIn} setIsEatIn={setIsEatIn} order={order} setOrder={setOrder} setIsProcessing={setIsProcessing} IsProcessing={IsProcessing} persons={persons} setPersons={setPersons}/>
    }
    return <Detail id={target} order={order} setOrder={setOrder} setTarget={setTarget} isEatIn={isEatIn} setIsEatIn={setIsEatIn} />
}
