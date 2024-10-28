import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import axios from "axios";

import PosView from "./views/pages/pos.jsx";
import KitchenDrink from "./views/pages/kitchen.jsx";
import Complete from "./views/pages/complete.jsx";
import Home from "./views/pages/home.jsx";
import WaiterStation from "./views/pages/waiterStation.jsx";
import InventryCheck from "./views/pages/inventryCheck.jsx";
import KitchenForPafait from "./views/pages/kitchenForPafait.jsx";
import ServeStatusView from "./views/pages/serveStatusView.jsx";
import SalesView from "./views/pages/salesView.jsx";

function App() {
  const [order, setOrder] = useState([]);
  const [target, setTarget] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [payment, setPayment] = useState(null);
  const [persons, setPersons] = useState(1);
  const [area, setArea] = useState("Drink");
  const [tableNum, setTableNum] = useState("未設定");
  const [submitId, setSubmitId] = useState(null);
  const [isEatIn, setIsEatIn] = useState(true);
  function Pos() {
    return (
      <PosView
        persons={persons}
        setPersons={setPersons}
        order={order}
        setOrder={setOrder}
        target={target}
        setTarget={setTarget}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
        payment={payment}
        setPayment={setPayment}
        tableNum={tableNum}
        setTableNum={setTableNum}
        setSubmitId={setSubmitId}
        isEatIn={isEatIn}
      />
    );
  }
  function Kitchen() {
    return <KitchenDrink area={area} setArea={setArea} />;
  }
  function KitchenPafait() {
    return <KitchenForPafait area={area} setArea={setArea} />;
  }
  function init() {
    setOrder([]);
    setTarget(null);
    setIsProcessing(false);
    setPayment(null);
    setPersons(1);
    setSubmitId(null);

  }


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setIsEatIn={setIsEatIn}/>} />
        <Route path="/pos" element={<Pos />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/complete" element={<Complete init={init} submitId={submitId} order={order} />} />
        <Route path="/waiterstation" element={<WaiterStation />} />
        <Route path="/inventrycheck" element={<InventryCheck />} />
        <Route path="/kitchenForPafait" element={<KitchenPafait />} />
        <Route path="/serve-status-view" element={<ServeStatusView />} />
        <Route path="/sales" element={<SalesView />} />
      </Routes>
    </Router>
  );
}

export default App;
