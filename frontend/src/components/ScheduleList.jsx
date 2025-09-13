import React, { useEffect, useState } from "react";
import api from "../api";
import ScheduleForm from "./ScheduleForm";

function ScheduleList() {
  const [schedules, setSchedules] = useState([]);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const loadSchedules = () => {
    let url = "/schedules"; // Default for ADMIN or unknown roles
    if (role === "STUDENT") {
      url = `/schedules/student/${userId}`;
    } else if (role === "TEACHER") {
      url = `/schedules/teacher/${userId}`;
    }

    api.get(url)
      .then(res => setSchedules(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadSchedules();
  }, [role, userId]); // Re-run when role or userId changes

  const handleDelete = (id) => {
    if (window.confirm("Delete this schedule?")) {
      api.delete(`/schedules/${id}`)
        .then(() => loadSchedules())
        .catch(() => alert("❌ Error deleting schedule"));
    }
  };

  return (
    <div className="container">
      <h2>Schedules</h2>
      {role !== "STUDENT" && <ScheduleForm onSave={loadSchedules} /> }

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Class</th>
            <th>Subject</th>
            <th>Teacher</th>
            <th>Room</th>
            <th>Time Slot</th>
            {role !== "STUDENT" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {schedules.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.className}</td>
              <td>{s.subjectName}</td>
              <td>{s.teacherName}</td>
              <td>{s.roomName}</td>
              <td>{s.timeSlot}</td>
              {role !== "STUDENT" && (
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleList;
