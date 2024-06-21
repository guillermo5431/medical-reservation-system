import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function index() {
  return (
    <>
    <Navbar bg="primary" data-bs-theme="dark">
    <Container>
      <Nnavbar.Brand as={Link} to="/">Navbar</Nnavbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/doctor">Doctor</Nav.Link>
        <Nav.Link as={Link} to="/patient">Features</Nav.Link>
        <Nav.Link as={Link} to="/appointment">Pricing</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  </>
  )
}

export default index