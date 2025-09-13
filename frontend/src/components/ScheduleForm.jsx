import React, { useState, useEffect } from "react";
import api from "../api";

function ScheduleForm({ onSave }) {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const [form, setForm] = useState({
    schoolClass: { id: "" },
    subject: { id: "" },
    teacher: { id: "" },
    room: { id: "" },
    timeSlot: { id: "" },
  });

  useEffect(() => {
    api.get("/classes").then(res => setClasses(res.data));
    api.get("/subjects").then(res => setSubjects(res.data));
    api.get("/users").then(res => setTeachers(res.data.filter(u => u.role === "TEACHER")));
    api.get("/rooms").then(res => setRooms(res.data));
    api.get("/timeslots").then(res => setTimeSlots(res.data));
    return () => {}; // Cleanup function for React 19
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: { id: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/schedules", form)
      .then(() => {
        alert("✅ Schedule created!");
        onSave();
      })
      .catch(err => alert("❌ Error: " + err.response?.data));
  };

  return (
    <div className="container">
      <h3>Add Schedule</h3>
      <form onSubmit={handleSubmit}>
        <select name="schoolClass" onChange={handleChange}>
          <option value="">Select Class</option>
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select name="subject" onChange={handleChange}>
          <option value="">Select Subject</option>
          {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <select name="teacher" onChange={handleChange}>
          <option value="">Select Teacher</option>
          {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>

        <select name="room" onChange={handleChange}>
          <option value="">Select Room</option>
          {rooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>

        <select name="timeSlot" onChange={handleChange}>
          <option value="">Select Time Slot</option>
          {timeSlots.map(t => (
            <option key={t.id} value={t.id}>
              {t.dayOfWeek} {t.startTime} - {t.endTime}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default ScheduleForm;
