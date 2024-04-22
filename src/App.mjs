import { useState } from 'react';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';

import PosView from './views/pages/pos.jsx';

function App() {
  const [order , setOrder] = useState([]);
  const [target, setTarget] = useState(null);
  return (
     <PosView order={order} setOrder={setOrder} target={target} setTarget={setTarget} />
  );
}

export default App;
