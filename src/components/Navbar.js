import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Nnavbar from 'react-bootstrap/Navbar';

function Navbar() {
  return (
    <>
      <Nnavbar bg="primary" data-bs-theme="dark">
        <Container>
          <Nnavbar.Brand as={Link} to="/">Navbar</Nnavbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/doctor">Doctor</Nav.Link>
            <Nav.Link as={Link} to="/patient">Features</Nav.Link>
            <Nav.Link as={Link} to="/appointment">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Nnavbar>
    </>
  )
}

export default Navbar