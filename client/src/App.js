import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import {Container} from 'semantic-ui-react';

import './semantics/semantic.css';
import './semantics/semantic.min.css';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
function App() {
  return (
    <div>
      <Router>
        <Container>

          <MenuBar />
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/Login" element={<Login/>} />
            <Route exact path = "/Register" element = {<Register/>}/>
          </Routes>
           
        </Container>
      </Router>

    </div>
  );
}

export default App;
