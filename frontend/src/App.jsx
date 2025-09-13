import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScheduleList from "./pages/ScheduleList";
import UsersList from "./pages/UsersList";
import ClassesList from "./pages/ClassesList";
import SubjectsList from "./pages/SubjectsList";
import RoomsList from "./pages/RoomsList";
import TimeSlotsList from "./pages/TimeSlotsList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is properly authenticated
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    
    
    // Only consider authenticated if we have all required data
    if (token && role && userId) {
      setIsAuthenticated(true);
    } else {
      // Clear any partial data
      localStorage.clear();
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Loading...</h1>
            <p className="auth-subtitle">Please wait while we verify your access</p>
          </div>
        </div>
      </div>
    );
  }
  
  
  return (
    <>
      {/* Only show NavBar for authenticated users */}
      {isAuthenticated && <NavBar />}
      
      <Routes>
        {/* Root path - redirect based on authentication status */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Navigate to="/schedules" replace /> : <Navigate to="/login" replace />
          } 
        />
        
        {/* Public routes - no NavBar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected pages - with NavBar */}
        <Route path="/schedules" element={<ProtectedRoute><ScheduleList/></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><UsersList/></ProtectedRoute>} />
        <Route path="/classes" element={<ProtectedRoute><ClassesList/></ProtectedRoute>} />
        <Route path="/subjects" element={<ProtectedRoute><SubjectsList/></ProtectedRoute>} />
        <Route path="/rooms" element={<ProtectedRoute><RoomsList/></ProtectedRoute>} />
        <Route path="/timeslots" element={<ProtectedRoute><TimeSlotsList/></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
