import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Container, Button, Alert, Image, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../../config';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [profilePic, setProfilePic] = useState(null); // State for the profile picture
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
    setUpdatedStudent(student); // Initialize with current student data
    setProfilePic(null); // Reset profile picture on edit
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent({ ...updatedStudent, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]); // Update the profile picture state
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

      // If there's a new profile picture, append it to the form data
      if (profilePic) {
        formData.append('profile_pic', profilePic);
      }

      // Send the PUT request with the FormData
      await axios.put(`${BASE_URL}/api/student/update/${selectedStudent.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowModal(false);
      fetchStudents(); // Refresh the student list after update
    } catch (error) {
      setError('Failed to update student data. Please try again.');
    }
  };

  const handleDeleteStudent = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      try {
        await axios.delete(`${BASE_URL}/api/students/${id}/delete/`);
        fetchStudents(); // Refresh the student list after deletion
      } catch (error) {
        setError('Failed to delete student. Please try again.');
      }
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Student List</h1>
      <Button variant="secondary" onClick={() => navigate('/faculty-dashboard')} className="mb-3">
        Back to Dashboard
      </Button>

      {error && <Alert variant="danger">{error}</Alert>}

      {students.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
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
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={student.profile_pic}
                    alt="Profile"
                    roundedCircle
                    width={50}
                    height={50}
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
                  <Button variant="primary" onClick={() => handleEditClick(student)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteStudent(student.id)}
                    className="ml-2"
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

      {/* Edit Student Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={updatedStudent.first_name || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={updatedStudent.last_name || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updatedStudent.email || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={updatedStudent.dob || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={updatedStudent.gender || ''}
                onChange={handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="bloodGroup">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                type="text"
                name="blood_group"
                value={updatedStudent.blood_group || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="contactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contact_number"
                value={updatedStudent.contact_number || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={updatedStudent.address || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Profile Picture Field */}
            <Form.Group controlId="profilePic">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="profile_pic"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
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
  );
};

export default StudentList;
