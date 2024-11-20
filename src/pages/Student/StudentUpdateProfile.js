import React, { useContext, useState } from "react";
import { Form, Button, Container, Tab, Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import { StudentContext } from "../../context/StudentContext";
import BASE_URL from "../../config";
import { useNavigate } from "react-router-dom";
import NavbarComponent from '../../components/NavbarComponent';
import { FaUserAlt, FaUserEdit, FaImage } from 'react-icons/fa'; 

const StudentUpdateProfile = () => {
  const { student, setStudent } = useContext(StudentContext); 
  const [formData, setFormData] = useState({
    first_name: student.first_name,
    last_name: student.last_name,
    email: student.email,
    contact_number: student.contact_number,
    gender: student.gender,
    blood_group: student.blood_group,
    dob: student.dob,
    address: student.address,
    profile_pic: null,
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      const response = await axios.put(
        `${BASE_URL}/api/student/update/${student.id}/`,
        formData
      );

      console.log("API Response:", response); 

     
      if (response.status === 200 && response.data && response.data.student) {
       
        alert("Profile updated successfully!");

   
        const updatedStudent = response.data.student;

     
        setStudent((prevStudent) => ({
          ...prevStudent,  
          ...updatedStudent,  
        }));

        
        sessionStorage.setItem("student", JSON.stringify(updatedStudent));

       
        navigate("/student-dashboard");
      } else {
        
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      
      if (error.response) {
        
        alert("Error: " + (error.response.data.message || "Please try again."));
      } else if (error.request) {
        
        alert("Network error: No response from server.");
      } else {
        
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile_pic: file });
  };

  return (
    <>
     
      <NavbarComponent onLogout={() => navigate('/')} />

      <Container className="mt-5 p-5">
        <h1 className="text-center">Update Profile</h1>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="first">
                <FaUserAlt className="me-2" /> Basic Information
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">
                <FaUserEdit className="me-2" /> Personal Details
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">
                <FaImage className="me-2" /> Address & Profile Picture
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
           
            <Tab.Pane eventKey="first">
              <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group controlId="first_name" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="last_name" className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="contact_number" className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Tab.Pane>

            
            <Tab.Pane eventKey="second">
              <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group controlId="gender" className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="blood_group" className="mb-3">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Control
                    type="text"
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="dob" className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Tab.Pane>

           
            <Tab.Pane eventKey="third">
              <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group controlId="address" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="profile_pic" className="mb-3">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="profile_pic"
                    onChange={handleImageChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
                <Button
                  variant="secondary"
                  className="ms-3"
                  onClick={() => navigate("/student-dashboard")}
                >
                  Cancel
                </Button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </>
  );
};

export default StudentUpdateProfile;
