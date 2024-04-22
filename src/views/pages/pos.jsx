
import Menu from "../components/modules/menu.jsx";
import RightPannel from '../components/modules/rightPannel.jsx';

export default function PosView({ order , setOrder, target, setTarget }) {
  return (
    <div className="App">
      <div className="right">
        <div className="menu">
          <Menu setTarget={setTarget} />
        </div>
      </div>

      <div className="left">
        <div className="left-content">
          <RightPannel order={order} setOrder={setOrder} target={target} setTarget={setTarget} />
        </div>
      </div>
    </div>
  );
}
