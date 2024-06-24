import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/index';
import Footer from './components/footer/footer'
import Doctor from './pages/doctor';
import Admin from './pages/admin';
import Login from './pages/login';
import Signup from './pages/signup';
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
