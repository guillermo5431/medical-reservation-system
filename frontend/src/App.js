import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/index';
import Doctor from './pages/doctor';
import Login from './pages/login';
import Signup from './pages/signup';
import LoginSignup from './pages/login_Signup'
import Appointment from './pages/appointments';
import Home from './pages/Home';

function App() {
  return (
    <Router>
    <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login_Signup" element={<LoginSignup />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
