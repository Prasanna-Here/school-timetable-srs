import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    // Clear all user data
    localStorage.clear();
    
    // Force page reload to update authentication state
    window.location.href = "/";
  };


  // Only render NavBar if user is properly authenticated
  if (!token || !role) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">School Timetable</Link>

        {/* Only show schedules link for all authenticated users */}
        <Link to="/schedules">
          {role === "STUDENT" ? "My Schedule" : 
           role === "TEACHER" ? "My Schedules" : 
           "Schedules"}
        </Link>

        {/* Only show admin links for ADMIN role */}
        {role === "ADMIN" && (
          <>
            <Link to="/users">Users</Link>
            <Link to="/classes">Classes</Link>
            <Link to="/subjects">Subjects</Link>
            <Link to="/rooms">Rooms</Link>
            <Link to="/timeslots">TimeSlots</Link>
          </>
        )}
      </div>

      <div className="nav-right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
