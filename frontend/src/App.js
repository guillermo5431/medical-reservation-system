import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/index';
import Doctor from './pages/doctor';
import LoginSignup from './pages/login_Signup'
import Appointment from './pages/appointments';
import Home from './pages/Home';
import Dashboard from './pages/dashboard';
import ScheduleAppointment from './pages/scheduleAppointment';

//Set the Authorization header for axios
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;


function App() {
  const isAuthenticated = !!localStorage.getItem('authToken')

  return (
    <Router>
    <div className="App">
        <Navbar />
        {!isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login_Signup" element={<LoginSignup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/scheduleAppointment' element={<ScheduleAppointment />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
