import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

import PosView from "./views/pages/pos.jsx";
import KitchenDrink from "./views/pages/kitchen.jsx";
import Complete from "./views/pages/complete.jsx";
import Home from "./views/pages/home.jsx";

function App() {
  const [order, setOrder] = useState([]);
  const [target, setTarget] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [payment, setPayment] = useState(null);
  const [persons, setPersons] = useState(1);
  const [area, setArea] = useState("Drinks");
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
      />
    );
  }
  function Kitchen() {
    return <KitchenDrink area={area} setArea={setArea} />;
  }
  function init() {
    setOrder([]);
    setTarget(null);
    setIsProcessing(false);
    setPayment(null);
    setPersons(1);
  }


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pos" element={<Pos />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/complete" element={<Complete init={init} />} />
      </Routes>
    </Router>
  );
}

export default App;
