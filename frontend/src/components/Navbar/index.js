import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function index({ userRole }) {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    window.location.href = '/login_Signup';
  }


  return (
    <>
    <Navbar bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand as={Link} to="/">MedRes</Navbar.Brand>
      <Nav className="me-auto">
       {userRole === 'patient' && (
        <>
          <Nav.Link as={Link} to="/appointmentList">My Appointments</Nav.Link>
          <Nav.Link as={Link} to="/patient/doctors">Doctors</Nav.Link>
          <Nav.Link as={Link} to="/patient/medical-records">Medical Records</Nav.Link>
          <Nav.Link as={Link} to="/patient/profile">Profile</Nav.Link>  
          <Nav.Link as={Link} to= "/scheduleAppointment">Make an appointment</Nav.Link>
        </>
       )}
       {userRole === 'admin' && (
        <>
        <Nav.Link as={Link} to="/adminDashboard">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/admin/patients">Patients</Nav.Link>  
        <Nav.Link as={Link} to="/admin/doctors">Doctors</Nav.Link> 
        <Nav.Link as={Link} to="/admin/offices">Offices</Nav.Link>         
        <Nav.Link as={Link} to="/appointmentList">Appointments</Nav.Link>
        <Nav.Link as={Link} to="/admin/reports">Reports</Nav.Link>
        </>
       )}
       {userRole === 'doctor' && (
        <>
        <Nav.Link as={Link} to="/doctorDashboard">Dashboard</Nav.Link>  
        <Nav.Link as={Link} to="/doctor/patients">My Patients</Nav.Link>
        <Nav.Link as={Link} to="/appointmentList">Appointments</Nav.Link>
        <Nav.Link as={Link} to="/doctor/profile">Profile</Nav.Link>  
        </>
       )}
       {userRole === 'guest' && (
        <>
        <Nav.Link as={Link} to="/about">About Us</Nav.Link>
        <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
        <Nav.Link as={Link} to= "/scheduleAppointment">Make an appointment</Nav.Link>
        <Nav.Link as={Link} to="/partners/login-signup">Partner Login/Signup</Nav.Link>

        </>
       )}
      </Nav>
      <Nav className='justify-content-end'>
       {userRole === 'guest' ? (
        <Nav.Link as={Link} to="/patient/login-signup">Login/Signup</Nav.Link>
       ) : (
        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
       )}
      </Nav>
    </Container>
  </Navbar>
  </>
  )
}

export default index