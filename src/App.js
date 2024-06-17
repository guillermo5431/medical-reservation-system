import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Doctor from './pages/doctor';
import Patient from './pages/patient';
import Appointment from './pages/appointments';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
     <Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
     </Navbar>
    </div>
  );
}

export default App;
