// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context Providers
import { FacultyProvider } from "./context/FacultyContext";
import { StudentProvider } from "./context/StudentContext";

// Faculty Pages and Components
import FacultyLogin from "./pages/Faculty/FacultyLogin";
import FacultyDashboard from "./pages/Faculty/FacultyDashboard";
import FacultyUpdate from "./pages/Faculty/FacultyUpdate";
import FacultyAssignments from "./pages/Faculty/FacultyAssignmentListView";
import AssignmentsRegister from "./pages/Faculty/FacultyAssignmentregister";
import PrivateRoute from "./components/PrivateRoute";

// Student Pages and Components
import StudentLoginPage from "./pages/Student/StudentLogin";
import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentUpdateProfile from "./pages/Student/StudentUpdateProfile";
import StudentRegistration from "./pages/Student/StudentRegistration";
import StudentList from "./pages/Student/StudentList";
import AssignmentList from "./pages/Student/AssignmentList";
import PrivateStudentRoute from "./components/PrivateStudentRoute";

// Home Page
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <StudentProvider>
        <FacultyProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/faculty-login" element={<FacultyLogin />} />
            <Route path="/student-login" element={<StudentLoginPage />} />

            {/* Faculty Protected Routes */}
            <Route
              path="/faculty-dashboard"
              element={
                <PrivateRoute>
                  <FacultyDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/faculty-update"
              element={
                <PrivateRoute>
                  <FacultyUpdate />
                </PrivateRoute>
              }
            />
            <Route
              path="/faculty-assignments"
              element={
                <PrivateRoute>
                  <FacultyAssignments />
                </PrivateRoute>
              }
            />
            <Route
              path="/assignments-register"
              element={
                <PrivateRoute>
                  <AssignmentsRegister />
                </PrivateRoute>
              }
            />

            {/* Student Protected Routes */}
            <Route
              path="/student-dashboard"
              element={
                <PrivateStudentRoute>
                  <StudentDashboard />
                </PrivateStudentRoute>
              }
            />
            <Route
              path="/register-student"
              element={
                <PrivateRoute>
                  <StudentRegistration />
                </PrivateRoute>
              }
            />
            <Route
              path="/student-list"
              element={
                <PrivateRoute>
                  <StudentList />
                </PrivateRoute>
              }
            />
            <Route
              path="/studentupdateprofile"
              element={
                <PrivateStudentRoute>
                  <StudentUpdateProfile />
                </PrivateStudentRoute>
              }
            />
            <Route
              path="/assignmentslist"
              element={
                <PrivateStudentRoute>
                  <AssignmentList />
                </PrivateStudentRoute>
              }
            />
          </Routes>
        </FacultyProvider>
      </StudentProvider>
    </Router>
  );
};

export default App;
