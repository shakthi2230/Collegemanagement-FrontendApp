import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FacultyContext } from '.././context/FacultyContext';

const FacultyNavbar = () => {
    const [isStudentDropdownOpen, setStudentDropdownOpen] = useState(false);
    const [isSubjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(FacultyContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" style={{ padding: '0.5rem 1rem' }}>
            <Container>
               
                <Navbar.Brand href="/faculty-dashboard" className="me-auto">
                    Faculty Dashboard
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="w-100 d-flex justify-content-between align-items-center">
                        
                        <div className="d-flex flex-grow-1 justify-content-around">
                            <Nav.Link href="/faculty-dashboard">My Profile</Nav.Link>
                            <Nav.Item
                                className="dropdown"
                                onMouseEnter={() => setStudentDropdownOpen(true)}
                                onMouseLeave={() => setStudentDropdownOpen(false)}
                            >
                                <Nav.Link
                                    href="#"
                                    className="dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded={isStudentDropdownOpen ? 'true' : 'false'}
                                >
                                    Student Management
                                </Nav.Link>
                                <ul
                                    className={`dropdown-menu dropdown-menu-dark ${
                                        isStudentDropdownOpen ? 'show' : ''
                                    }`}
                                >
                                    <li>
                                        <Nav.Link href="/student-list" className="dropdown-item">
                                            View All Students
                                        </Nav.Link>
                                    </li>
                                    <li>
                                        <Nav.Link href="/register-student" className="dropdown-item">
                                            Add New Student
                                        </Nav.Link>
                                    </li>
                                </ul>
                            </Nav.Item>
                            <Nav.Item
                                className="dropdown"
                                onMouseEnter={() => setSubjectDropdownOpen(true)}
                                onMouseLeave={() => setSubjectDropdownOpen(false)}
                            >
                                <Nav.Link
                                    href="#"
                                    className="dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded={isSubjectDropdownOpen ? 'true' : 'false'}
                                >
                                    Subject Management
                                </Nav.Link>
                                <ul
                                    className={`dropdown-menu dropdown-menu-dark ${
                                        isSubjectDropdownOpen ? 'show' : ''
                                    }`}
                                >
                                    <li>
                                        <Nav.Link href="/assignments-register" className="dropdown-item">
                                            Register New Assignment
                                        </Nav.Link>
                                    </li>
                                    <li>
                                        <Nav.Link href="/faculty-assignments" className="dropdown-item">
                                            View Assignments
                                        </Nav.Link>
                                    </li>
                                </ul>
                            </Nav.Item>
                        </div>

                        
                        <Nav.Link
                            onClick={handleLogout}
                            className='outline-light'
                            style={{ color: '', marginLeft: 'auto' }}
                        >
                            <Button variant="outline-light" >Logout</Button>

                        </Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default FacultyNavbar;
