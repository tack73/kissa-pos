import Detail from "../blocks/detail.jsx";
import Total from "../blocks/total.jsx";

export default function RightPannel({ order, setOrder, target, setTarget, setIsProcessing ,IsProcessing ,persons, setPersons}) {
    if(target === null){
        return <Total order={order} setOrder={setOrder} setIsProcessing={setIsProcessing} IsProcessing={IsProcessing} persons={persons} setPersons={setPersons}/>
    }
    return <Detail id={target} order={order} setOrder={setOrder} setTarget={setTarget} />
}
