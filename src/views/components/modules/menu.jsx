import Section from "../blocks/sections";

export default function Menu({setTarget}) {
    return (
        <div className="menu">
            <Section genre="Drinks" setTarget={setTarget}/>
            <Section genre="Sweets" setTarget={setTarget}/>
            <Section genre="Foods" setTarget={setTarget}/>
        </div>
    );
}