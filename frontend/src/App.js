import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar/index';
import Doctor from './pages/doctor';
import LoginSignup from './pages/Auth/login_Signup';
import Appointment from './pages/Appointments/appointmentsGuest';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard/dashboard';
import ScheduleAppointment from './pages/Appointments/scheduleAppointment';
import About from './pages/about';
import appointmentList from './pages/Appointments/appointmentList';
import MyPatients from './pages/MyPatients';
import PartnersLoginSignup from './pages/Auth/partners_signup_login';

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
          <Route path="/login_Signup" element={<LoginSignup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/scheduleAppointment' element={<ScheduleAppointment />} />
          <Route path='/about' element={<About />} />
          <Route path='/appointmentList' element={<appointmentList />} />
          <Route path='/myPatients' element={<MyPatients />} />
          <Route path='/PartnersLoginSignup' element={<PartnersLoginSignup />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
