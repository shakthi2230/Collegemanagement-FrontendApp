import React, { useState } from 'react';
import { Form, Button, Alert, Container ,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';
import NavbarComponent from '../../components/NavbarComponent';

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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

 
  const isStep1Valid = firstName && lastName && email && dob && password;
  const isStep2Valid = gender && bloodGroup && contactNumber && address;
  const isStep3Valid = profilePic; 

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          'Content-Type': 'multipart/form-data',
        },
      });
      // setSuccessMessage(response.data.message);
      alert(response.data.message)
      setTimeout(() => {
        navigate('/student-list');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      <NavbarComponent onLogout={() => navigate('/')} />

      <Container className="d-flex justify-content-center align-items-center min-vh-100 p-5">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5} className="bg-light p-4 rounded shadow-sm">
          <h3 className="text-center mb-4">Register Student</h3>
          <Form onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <>
                <Form.Group controlId="firstName" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="lastName" className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="dob" className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={!isStep1Valid}
                  className="w-100"
                >
                  Next
                </Button>
              </>
            )}

            
            {step === 2 && (
              <>
                <Form.Group controlId="gender" className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="bloodGroup" className="mb-3">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Control
                    type="text"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="contactNumber" className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="address" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="secondary" onClick={handlePrev} className="me-3">
                  Previous
                </Button>
                <Button variant="primary" onClick={handleNext} disabled={!isStep2Valid}>
                  Next
                </Button>
              </>
            )}

           
            {step === 3 && (
              <>
                <Form.Group controlId="profilePic" className="mb-3">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                    required
                  />
                </Form.Group>
                <Button variant="secondary" onClick={handlePrev} className="me-3">
                  Previous
                </Button>
                <Button variant="success" type="submit" disabled={!isStep3Valid}>
                  Register
                </Button>
              </>
            )}
          </Form>

     
          {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default StudentRegistration;
