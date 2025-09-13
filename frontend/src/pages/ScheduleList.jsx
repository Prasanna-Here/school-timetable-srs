import React, { useEffect, useState } from "react";
import api from "../api";
import ScheduleForm from "../components/ScheduleForm";

export default function ScheduleList() {
  const [schedules, setSchedules] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    const userClassId = localStorage.getItem("userClassId");
    
    // If user is a teacher, fetch only their schedules
    if (role === "TEACHER" && userId) {
      api.get(`/schedules/teacher/${userId}`)
        .then(res => setSchedules(res.data))
        .catch(err => {
          console.error("Error loading teacher schedules:", err);
          alert("Error loading your schedules");
        });
    } 
    // If user is a student, fetch only their class schedules
    else if (role === "STUDENT" && userId) {
      api.get(`/schedules/student/${userId}`)
        .then(res => setSchedules(res.data))
        .catch(err => {
          console.error("Error loading class schedules:", err);
          alert("Error loading your class schedules");
        });
    } 
    // For admin, show all schedules
    else if (role === "ADMIN") {
      api.get("/schedules")
        .then(res => setSchedules(res.data))
        .catch(err => {
          console.error("Error loading schedules:", err);
          alert("Error loading schedules");
        });
    }
  };

  useEffect(() => {
    load();
    return () => {}; // Cleanup function for React 19
  }, []);

  const onSave = () => {
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete schedule?")) return;
    try {
      await api.delete(`/schedules/${id}`);
      load();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="container fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            {localStorage.getItem("role") === "TEACHER" ? "My Teaching Schedules" : 
             localStorage.getItem("role") === "STUDENT" ? "My Class Schedule" : 
             "Schedules"}
          </h1>
          <p className="page-subtitle">
            {localStorage.getItem("role") === "TEACHER" 
              ? "View your teaching schedules" 
              : localStorage.getItem("role") === "STUDENT"
              ? "View your class timetable"
              : "Manage school timetable and class schedules"
            }
          </p>
        </div>
        {localStorage.getItem("role") === "ADMIN" && (
          <div className="page-actions">
            <button 
              className="btn btn-primary" 
              onClick={() => setEditing({})}
            >
              + Add Schedule
            </button>
          </div>
        )}
      </div>

      {editing && localStorage.getItem("role") === "ADMIN" && (
        <div className="form-card">
          <div className="form-header">
            <h3 className="form-title">
              {editing.id ? 'Edit Schedule' : 'Add New Schedule'}
            </h3>
            <p className="form-subtitle">
              {editing.id ? 'Update schedule details' : 'Create a new schedule entry'}
            </p>
          </div>
          <ScheduleForm 
            onSave={onSave} 
            initialData={editing} 
            onCancel={() => setEditing(null)} 
          />
        </div>
      )}

      <div className="content-card">
        {schedules.length === 0 ? (
          <div className="empty-state">
            <h3>
              {localStorage.getItem("role") === "TEACHER" 
                ? "No Teaching Schedules Found" 
                : localStorage.getItem("role") === "STUDENT"
                ? "No Class Schedule Found"
                : "No Schedules Found"
              }
            </h3>
            <p>
              {localStorage.getItem("role") === "TEACHER" 
                ? "You don't have any teaching schedules assigned yet. Contact your administrator." 
                : localStorage.getItem("role") === "STUDENT"
                ? "Your class schedule hasn't been created yet. Contact your administrator."
                : "Start by creating your first schedule using the form above."
              }
            </p>
            {localStorage.getItem("role") === "ADMIN" && (
              <button 
                className="btn btn-primary mt-3" 
                onClick={() => setEditing({})}
              >
                Create First Schedule
              </button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Room</th>
                  <th>Time</th>
                  {localStorage.getItem("role") === "ADMIN" && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {schedules.map(s => (
                  <tr key={s.id}>
                    <td><span className="badge badge-primary">{s.id}</span></td>
                    <td><strong>{s.className}</strong></td>
                    <td><span className="badge badge-success">{s.subjectName}</span></td>
                    <td>{s.teacherName}</td>
                    <td><span className="badge badge-warning">{s.roomName}</span></td>
                    <td><strong>{s.timeSlot}</strong></td>
                    {localStorage.getItem("role") === "ADMIN" && (
                      <td>
                        <div className="table-actions">
                          <button 
                            className="btn btn-secondary" 
                            onClick={() => setEditing({
                              id: s.id,
                              schoolClassId: s.classId,
                              subjectId: s.subjectId,
                              teacherId: s.teacherId,
                              roomId: s.roomId,
                              timeSlotId: s.timeSlotId
                            })}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-danger" 
                            onClick={() => remove(s.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
