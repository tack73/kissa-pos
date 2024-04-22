import Detail from "../blocks/detail.jsx";
import Total from "../blocks/total.jsx";

export default function RightPannel({ order, setOrder, target, setTarget }) {
    if(target === null){
        return <Total order={order} setOrder={setOrder} />
    }
    return <Detail id={target} order={order} setOrder={setOrder} setTarget={setTarget} />
}
