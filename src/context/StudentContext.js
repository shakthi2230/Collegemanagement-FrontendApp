import React, { createContext, useState, useEffect } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [student, setStudent] = useState(() => {
        const savedStudent = localStorage.getItem("student");
        return savedStudent ? JSON.parse(savedStudent) : null;
    });

    const login = async (email, password) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/student/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setStudent(data.student);
                localStorage.setItem("student", JSON.stringify(data.student));
                return { success: true };
            } else {
                alert(data.message || "Login failed");
                return { success: false };
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Something went wrong!");
            return { success: false };
        }
    };

    const logout = () => {
        setStudent(null);
        localStorage.removeItem("student");
    };

    useEffect(() => {
        console.log("Student data:", student);
    }, [student]);

    return (
        <StudentContext.Provider value={{ student,setStudent, login, logout }}>
            {children}
        </StudentContext.Provider>
    );
};
