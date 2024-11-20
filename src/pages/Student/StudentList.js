import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Container, Button, Alert, Image, Modal, Form } from 'react-bootstrap';
import { Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../../config';
import NavbarComponent from '../../components/NavbarComponent';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
    } else {
      fetchStudents();
    }
  }, [navigate]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/students/`);
      setStudents(response.data);
    } catch (error) {
      setError('Failed to fetch student data. Please try again.');
    }
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setUpdatedStudent(student);
    setProfilePic(null);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent({ ...updatedStudent, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleUpdateStudent = async () => {
    try {
      const formData = new FormData();
      formData.append('first_name', updatedStudent.first_name);
      formData.append('last_name', updatedStudent.last_name);
      formData.append('email', updatedStudent.email);
      formData.append('dob', updatedStudent.dob);
      formData.append('gender', updatedStudent.gender);
      formData.append('blood_group', updatedStudent.blood_group);
      formData.append('contact_number', updatedStudent.contact_number);
      formData.append('address', updatedStudent.address);

      if (profilePic) {
        formData.append('profile_pic', profilePic);
      }

      await axios.put(`${BASE_URL}/api/student/update/${selectedStudent.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setShowModal(false);
      fetchStudents();
    } catch (error) {
      setError('Failed to update student data. Please try again.');
    }
  };

  const handleDeleteStudent = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      try {
        await axios.delete(`${BASE_URL}/api/students/${id}/delete/`);
        fetchStudents();
      } catch (error) {
        setError('Failed to delete student. Please try again.');
      }
    }
  };

  return (
    <>
      
      <NavbarComponent onLogout={() => navigate('/')} />

      <Container className="mt-5 pt-5">
        <h3 className="text-center mb-4">Students List</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        {students.length > 0 ? (
          <Table className="table-hover responsive ">
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>Profile</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Blood Group</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student.id}
                  className="shadow-sm bg-white mb-2 rounded align-middle"
                  style={{
                    marginBottom: '1rem',
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}
                >
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      src={student.profile_pic}
                      alt="Profile"
                      roundedCircle
                      width={50}
                      height={50}
                      className="border"
                    />
                  </td>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.email}</td>
                  <td>{student.dob}</td>
                  <td>{student.gender}</td>
                  <td>{student.blood_group}</td>
                  <td>{student.contact_number}</td>
                  <td>{student.address}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEditClick(student)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteStudent(student.id)}
                      className="ms-2"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        ) : (
          <p>No students found.</p>
        )}

        
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey="general" id="edit-student-tabs" className="mb-3">
              
              <Tab eventKey="general" title="General Info">
                <Form>
                  <Form.Group controlId="firstName" className="mt-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={updatedStudent.first_name || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="lastName" className="mt-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={updatedStudent.last_name || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Form>
              </Tab>

             
              <Tab eventKey="contact" title="Contact Info">
                <Form>
                  <Form.Group controlId="email" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={updatedStudent.email || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="contactNumber" className="mt-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="contact_number"
                      value={updatedStudent.contact_number || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Form>
              </Tab>

             
              <Tab eventKey="other" title="Other Details">
                <Form>
                  <Form.Group controlId="dob" className="mt-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={updatedStudent.dob || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="gender" className="mt-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={updatedStudent.gender || ''}
                      onChange={handleInputChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="profilePic" className="mt-3">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                      type="file"
                      name="profile_pic"
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                </Form>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateStudent}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default StudentList;
