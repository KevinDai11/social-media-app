import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import {Container} from 'semantic-ui-react';

import './semantics/semantic.css';
import './semantics/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRouter';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Container>

            <MenuBar />
            <Routes>
              <Route exact path="/" element={<Home/>} />

              <Route exact path="/Login" element={<AuthRoute/>}>
                <Route exact path = "/Login" element={<Login/>} />
              </Route>

              <Route exact path="/Register" element={<AuthRoute/>}>
                <Route exact path = "/Register" element = {<Register/>}/>
              </Route>
            </Routes>
            
          </Container>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
