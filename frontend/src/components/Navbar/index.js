import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'

function index() {
  return (
    <>
    <Navbar bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand as={Link} to="/">MedRes</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/doctor">Doctor</Nav.Link>
        <Nav.Link as={Link} to="/appointment">Appointment</Nav.Link>
      </Nav>
      <Nav className='justify-content-end'>
        <NavDropdown title='Patient Portal' id='basic-nav-dropdown'>
          <NavDropdown.Item as={Link} to='/login'>Login</NavDropdown.Item>
          <NavDropdown.Item as={Link} to='/signup'>Signup</NavDropdown.Item>
        </NavDropdown>

      </Nav>
    </Container>
  </Navbar>
  </>
  )
}

export default index