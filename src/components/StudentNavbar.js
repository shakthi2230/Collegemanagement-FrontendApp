import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StudentNavbar = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/student-dashboard">Student Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="w-100 d-flex justify-content-around align-items-center">
            <Nav.Link onClick={() => navigate('/student-dashboard')}> Profile</Nav.Link>
            <Nav.Link onClick={() => navigate('/studentupdateprofile')}>Update Profile</Nav.Link>
            <Nav.Link onClick={() => navigate('/assignmentslist')}>Subject Works</Nav.Link>
            <Button variant="outline-light" onClick={onLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default StudentNavbar;
