import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StudentNavbar = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Student Dashboard</Navbar.Brand>
        <Nav className="d-flex flex-grow-1 justify-content-around">
          <Nav.Link onClick={() => navigate('/studentupdateprofile')}>Update Profile</Nav.Link>
          <Nav.Link onClick={() => navigate('/assignmentslist')}>Subject Works</Nav.Link>
          <Button variant="outline-light" onClick={onLogout}>Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default StudentNavbar;
