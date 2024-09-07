import Section from "../blocks/sections";

export default function Menu({setTarget,isEatIn}) {
    return (
        <div className="menu">
            <Section genre="Drinks" setTarget={setTarget}/>
            {isEatIn === true ? <Section genre="Sweets" setTarget={setTarget}/> : null}
            {isEatIn === true ? <Section genre="Foods" setTarget={setTarget}/> : null}
            {/* <Section genre="Sweets" setTarget={setTarget}/>
            <Section genre="Foods" setTarget={setTarget}/> */}
        </div>
    );
}