import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar/index';
import DoctorProfile from './pages/Doctor/profile';
import DoctorPatients from './pages/Doctor/MyPatients';
import AdminDoctor from './pages/Admin/doctors';
import AdminOffices from './pages/Admin/offices';
import AdminPatients from './pages/Admin/patients';
import AppointmentsGuest from './pages/Appointments/appointmentsGuest';
import ScheduleAppointment from './pages/Appointments/scheduleAppointment';
import appointmentList from './pages/Appointments/appointmentList';
import PatientLoginSignup from './pages/Auth/login_Signup';
import PartnersLoginSignup from './pages/Auth/partners_signup_login';
import AdminDashboard from './pages/Dashboard/adminDashboard';
import PatientDashboard from './pages/Dashboard/dashboard';
import DoctorDashboard from './pages/Dashboard/doctorDashboard';
import PatientDoctors from './pages/Patient/doctors';
import PatientMedicalRecords from './pages/Patient/medicalRecords';
import PatientProfile from './pages/Patient/profile';
import Home from './pages/Home';
import About from './pages/about';

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
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          <Route path="/doctor/patients" element={<DoctorPatients />} />
          <Route path="/admin/doctors" element={<AdminDoctor />} />
          <Route path="/admin/offices" element={<AdminOffices />} />
          <Route path="/admin/patients" element={<AdminPatients />} /> 
          <Route path="/appointmentsGuest" element={<AppointmentsGuest />} />
          <Route path='/appointmentList' element={<appointmentList />} />      
          <Route path='/scheduleAppointment' element={<ScheduleAppointment />} />   
          <Route path="/patient/login-signup" element={<PatientLoginSignup />} />
          <Route path='/partners/login-signup' element={<PartnersLoginSignup />} />
          <Route path='/admindashboard' element={<AdminDashboard />} />
          <Route path='/patientdashboard' element={<PatientDashboard />} />
          <Route path='/doctordashboard' element={<DoctorDashboard />} />
          <Route path='/patient/doctors' element={<PatientDoctors />} />
          <Route path='/patient/medical-records' element={<PatientMedicalRecords />} />   
          <Route path='/patient/profile' element={<PatientProfile />} />       
          <Route path='/about' element={<About />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
