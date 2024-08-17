import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'

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
          <Nav.Link as={Link} to="/my-appointments">My Appointments</Nav.Link>
          <Nav.Link as={Link} to="/doctors">Doctors</Nav.Link>
          <Nav.Link as={Link} to="/medical-records">Medical Records</Nav.Link>
        </>
       )}
       {userRole === 'admin' && (
        <>
        <Nav.Link as={Link} to="/manage-users">Manage Users</Nav.Link>
        <Nav.Link as={Link} to="/appointments">Appointments</Nav.Link>
        <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
        </>
       )}
       {userRole === 'doctor' && (
        <>
        <Nav.Link as={Link} to="/my-patients">My Patients</Nav.Link>
        <Nav.Link as={Link} to="/appointments">Appointments</Nav.Link>
        <Nav.Link as={Link} to="/medical-records">Medical Records</Nav.Link>
        </>
       )}
       {userRole === 'guest' && (
        <>
        <Nav.Link as={Link} to="/about">About Us</Nav.Link>
        <Nav.Link as={Link} to="/appointments">Doctors</Nav.Link>
        <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
        </>
       )}
      </Nav>
      <Nav className='justify-content-end'>
       {userRole === 'guest' ? (
        <Nav.Link as={Link} to="/login_signup">Login/Signup</Nav.Link>
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