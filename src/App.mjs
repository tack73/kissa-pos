import { useState } from 'react';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';

import PosView from './views/pages/pos.jsx';

function App() {
  const [order , setOrder] = useState([]);
  const [target, setTarget] = useState(null);
  function Pos () {
    return (
      <PosView order={order} setOrder={setOrder} target={target} setTarget={setTarget} />
    )
  }
  function Kitchen () {
    return (
      <h1>Kitchen へようこそ</h1>
    )
  }
  return (
    <Router>
     <Routes>
        <Route path="/" element={<Pos />} />
        <Route path="/home" element={<Kitchen />} />
      </Routes>
    </Router>
  );
}

export default App;
