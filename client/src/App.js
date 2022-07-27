import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';

import './semantics/semantic.css';
import './semantics/semantic.min.css';
import './App.css';

import Home from './pages/Home';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={< Login/>} />
          <Route exact path = "/Register" element = {< Register/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
