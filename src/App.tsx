import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DnDFlow from './Components/Renderer/DnDFlow';
import Navbar from './Components/Navbar/Navbar';
import ToFlowchart from './Components/ToFlowchart/ToFlowchart';

import './App.css';

function App() {
  return (
    <div style={{ height: '200vh' }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<DnDFlow />} />
          <Route path='/convert' element={<ToFlowchart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
