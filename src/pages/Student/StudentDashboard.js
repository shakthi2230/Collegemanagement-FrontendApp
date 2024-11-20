import React, { useContext } from "react";
import { StudentContext } from "../../context/StudentContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaLanguage, FaPhone } from "react-icons/fa";
import BASE_URL from '../../config';
import StudentNavbar from "../../components/StudentNavbar";

const StudentDashboard = () => {
  const { student, logout } = useContext(StudentContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
     
      <StudentNavbar onLogout={handleLogout} />

      <Container className="mt-5">
        <Row>
          
          <Col md={3} className="d-flex flex-column align-items-start">
            <div className="text-center mb-4">
              <img
                src={`${BASE_URL}/${student.profile_pic}`}
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <h5>{student.first_name} {student.last_name}</h5>
              <p className="text-muted">{student.email}</p>
            </div>
           
            
          </Col>

         
          <Col md={9}>
            <h4 className="mb-4">Personal Information</h4>
            <p className="text-muted mb-4">
              Manage your personal information, including phone numbers and email address where you
              can be contacted.
            </p>
            <Row className="g-3">
              <Col md={6}>
                <div className="p-3 bg-white rounded shadow-sm">
                  <h6 className="text-muted">Name</h6>
                  <p className="mb-0">{student.first_name} {student.last_name}</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="p-3 bg-white rounded shadow-sm">
                  <h6 className="text-muted">Date of Birth</h6>
                  <p className="mb-0"><FaCalendarAlt className="me-2" /> {student.dob}</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="p-3 bg-white rounded shadow-sm">
                  <h6 className="text-muted">Country/Region</h6>
                  <p className="mb-0"><FaMapMarkerAlt className="me-2" /> {student.address}</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="p-3 bg-white rounded shadow-sm">
                  <h6 className="text-muted">Language</h6>
                  <p className="mb-0"><FaLanguage className="me-2" /> English (UK)</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="p-3 bg-white rounded shadow-sm">
                  <h6 className="text-muted">Contactable At</h6>
                  <p className="mb-0"><FaPhone className="me-2" /> {student.contact_number}</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="p-3 bg-white rounded shadow-sm">
                  <h6 className="text-muted">Email</h6>
                  <p className="mb-0"><FaEnvelope className="me-2" /> {student.email}</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentDashboard;
