import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config'; // For API calls

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('dob', dob);
    formData.append('password', password);
    formData.append('gender', gender);
    formData.append('blood_group', bloodGroup);
    formData.append('contact_number', contactNumber);
    formData.append('address', address);
    if (profilePic) formData.append('profile_pic', profilePic);

    try {
      const response = await axios.post(`${BASE_URL}/api/student/register/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });

      // Handle success response
      setSuccessMessage(response.data.message);
      // Optionally, redirect to another page
      setTimeout(() => {
        navigate('/faculty-dashboard'); // Redirect to the dashboard
      }, 2000);
    } catch (error) {
      // Handle error response
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h3>Register Student</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="dob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="bloodGroup">
          <Form.Label>Blood Group</Form.Label>
          <Form.Control
            type="text"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="contactNumber">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="profilePic">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register Student
        </Button>
      </Form>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
    </div>
  );
};

export default StudentRegistration;
