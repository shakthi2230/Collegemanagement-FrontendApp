import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FacultyContext } from '.././context/FacultyContext';
import NavDropdown from 'react-bootstrap/NavDropdown';

const FacultyNavbar = () => {
    // const [isStudentDropdownOpen, setStudentDropdownOpen] = useState(false);
    // const [isSubjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const {logout} = useContext(FacultyContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (

        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/faculty-dashboard">Faculty Dashboard</Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">

                    <Nav className="w-100 d-flex justify-content-around align-items-center">

                        <Nav.Link onClick={() => navigate('/faculty-dashboard')}> Profile</Nav.Link>

                        <NavDropdown title=" Student Management" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/student-list">View All Students</NavDropdown.Item>
                            <NavDropdown.Item href="/register-student">Add New Student</NavDropdown.Item>                                                
                        </NavDropdown>

                        <NavDropdown title="  Subject Management" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/assignments-register">Register New Assignment</NavDropdown.Item>
                            <NavDropdown.Item href="/faculty-assignments">View All Students</NavDropdown.Item>                                                
                        </NavDropdown>
                       
                        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default FacultyNavbar;
