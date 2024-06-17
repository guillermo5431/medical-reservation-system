import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import navbar from 'react-bootstrap/Navbar';

function Navbar() {
  return (
    <>
      <navbar bg="primary" data-bs-theme="dark">
        <Container>
          <navbar.Brand as={Link} to="/">Navbar</navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/doctor">Doctor</Nav.Link>
            <Nav.Link as={Link} to="/patient">Features</Nav.Link>
            <Nav.Link as={Link} to="/appointment">Pricing</Nav.Link>
          </Nav>
        </Container>
      </navbar>
    </>
  )
}

export default Navbar