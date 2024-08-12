import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/index';
import Doctor from './pages/doctor';
import LoginSignup from './pages/login_Signup'
import Appointment from './pages/appointments';
import Home from './pages/Home';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <Router>
    <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login_Signup" element={<LoginSignup />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
