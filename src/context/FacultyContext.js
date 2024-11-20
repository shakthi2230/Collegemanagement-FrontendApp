import React, { createContext, useState, useEffect } from "react";
import BASE_URL from '../config';

export const FacultyContext = createContext();

export const FacultyProvider = ({ children }) => {
    
    const [faculty, setFaculty] = useState(() => {

        const savedFaculty = sessionStorage.getItem("faculty");

        return savedFaculty ? JSON.parse(savedFaculty) : null;
    });

    const login = async (email, password) => {
        try {
            const response = await fetch(`${BASE_URL}/api/faculty/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setFaculty(data.faculty);
                // Save faculty data to sessionStorage
                sessionStorage.setItem("faculty", JSON.stringify(data.faculty));
                return { success: true };
            } else {
                alert(data.message || "Invalid email or password");
                return { success: false };
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Something went wrong!");
            return { success: false };
        }
    };

    const logout = () => {
        setFaculty(null);
        // Remove faculty data from sessionStorage
        sessionStorage.removeItem("faculty");
    };

    useEffect(() => {
        // Debugging: Log faculty data
        console.log("Faculty data in context:", faculty);
    }, [faculty]);

    return (
        <FacultyContext.Provider value={{ faculty, login, logout, setFaculty }}>
            {children}
        </FacultyContext.Provider>
    );
};
