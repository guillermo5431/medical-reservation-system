// Import necessary modules from React and React Router
import React from 'react';
import { Link } from 'react-router-dom';

// Import Bootstrap components for styling and layout
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Functional component that renders the Navbar based on userRole
function Index({ userRole }) {
  
  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');  // Remove authentication token from localStorage
    localStorage.removeItem('userRole');   // Remove user role from localStorage
    window.location.href = '/login_Signup'; // Redirect user to login/signup page
  }

  // Render the Navbar with different navigation links based on userRole
  return (
    <>
      {/* Navbar component with primary background color */}
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          {/* Navbar brand linking to home */}
          <Navbar.Brand as={Link} to="/">MedRes</Navbar.Brand>
          <Nav className="me-auto">
            
            {/* Render navigation links for 'patient' role */}
            {userRole === 'patient' && (
              <>
                <Nav.Link as={Link} to="/appointmentList">My Appointments</Nav.Link>
                <Nav.Link as={Link} to="/patient/doctors">Doctors</Nav.Link>
                <Nav.Link as={Link} to="/patient/medical-records">Medical Records</Nav.Link>
                <Nav.Link as={Link} to="/patient/profile">Profile</Nav.Link>  
                <Nav.Link as={Link} to="/scheduleAppointment">Make an appointment</Nav.Link>
              </>
            )}

            {/* Render navigation links for 'admin' role */}
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

            {/* Render navigation links for 'doctor' role */}
            {userRole === 'doctor' && (
              <>
                <Nav.Link as={Link} to="/doctorDashboard">Dashboard</Nav.Link>  
                <Nav.Link as={Link} to="/doctor/patients">My Patients</Nav.Link>
                <Nav.Link as={Link} to="/appointmentList">Appointments</Nav.Link>
                <Nav.Link as={Link} to="/doctor/profile">Profile</Nav.Link>  
              </>
            )}

            {/* Render navigation links for 'guest' role */}
            {userRole === 'guest' && (
              <>
                <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
                <Nav.Link as={Link} to="/scheduleAppointment">Make an appointment</Nav.Link>
                <Nav.Link as={Link} to="/partners/login-signup">Partner Login/Signup</Nav.Link>
              </>
            )}
          </Nav>

          {/* Render Login/Signup or Logout link based on userRole */}
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
  );
}

// Export the component as default
export default Index;
