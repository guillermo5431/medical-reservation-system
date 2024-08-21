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
import About from './pages/about';
import MyAppointments from './pages/MyAppointments';
import MyPatients from './pages/MyPatients';

function App() {

  const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('authToken'));

  React.useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('authToken'));
  }, []);

  const userRole = isAuthenticated ? localStorage.getItem('userRole') : 'guest';

  return (
    <Router>
    <div className="App">
        <Navbar userRole={userRole} /> {/* Pass userRole as a prop*/ }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login_Signup" element={<LoginSignup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/scheduleAppointment' element={<ScheduleAppointment />} />
          <Route path='/about' element={<About />} />
          <Route path='/myAppointments' element={<MyAppointments />} />
          <Route path='/myPatients' element={<MyPatients />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
