import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import navbar from 'react-bootstrap/Navbar';

function Navbar() {
  return (
    <>
      <navbar bg="primary" data-bs-theme="dark">
        <Container>
          <navbar.Brand href="#home">Navbar</navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </navbar>
    </>
  )
}

export default Navbar