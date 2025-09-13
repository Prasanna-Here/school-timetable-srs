import React, { useEffect, useState } from "react";
import api from "../api";

export default function ScheduleForm({ onSave, initialData = null, onCancel }) {
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
    timeSlot: { id: "" }
  });

  useEffect(() => {
    api.get("/classes").then(r => setClasses(r.data)).catch(()=>setClasses([]));
    api.get("/subjects").then(r => setSubjects(r.data)).catch(()=>setSubjects([]));
    api.get("/rooms").then(r => setRooms(r.data)).catch(()=>setRooms([]));
    api.get("/timeslots").then(r => setTimeSlots(r.data)).catch(()=>setTimeSlots([]));
    // users endpoint may be admin-only; adjust as needed
    api.get("/users").then(r => setTeachers(r.data.filter(u => u.role === "TEACHER"))).catch(()=>setTeachers([]));
  }, []);

  // if initialData provided, set form for edit
  useEffect(() => {
    if (initialData) {
      setForm({
        schoolClass: { id: initialData.schoolClassId || initialData.schoolClass?.id || "" },
        subject:     { id: initialData.subjectId || initialData.subject?.id || "" },
        teacher:     { id: initialData.teacherId || initialData.teacher?.id || "" },
        room:        { id: initialData.roomId || initialData.room?.id || "" },
        timeSlot:    { id: initialData.timeSlotId || initialData.timeSlot?.id || "" }
      });
    } else {
      setForm({
        schoolClass: { id: "" },
        subject:     { id: "" },
        teacher:     { id: "" },
        room:        { id: "" },
        timeSlot:    { id: "" }
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: { id: value ? Number(value) : "" } }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (initialData && initialData.id) {
        // update
        await api.put(`/schedules/${initialData.id}`, {
          id: initialData.id,
          schoolClass: { id: form.schoolClass.id },
          subject: { id: form.subject.id },
          teacher: { id: form.teacher.id },
          room: { id: form.room.id },
          timeSlot: { id: form.timeSlot.id }
        });
        alert("Updated");
      } else {
        // create
        await api.post("/schedules", {
          schoolClass: { id: form.schoolClass.id },
          subject: { id: form.subject.id },
          teacher: { id: form.teacher.id },
          room: { id: form.room.id },
          timeSlot: { id: form.timeSlot.id }
        });
        alert("Created");
      }
      onSave();
    } catch (err) {
      console.error(err);
      alert("Save failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <form onSubmit={submit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <select name="schoolClass" value={form.schoolClass.id || ""} onChange={handleChange} className="input">
            <option value="">Select Class</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select name="subject" value={form.subject.id || ""} onChange={handleChange} className="input">
            <option value="">Select Subject</option>
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <select name="teacher" value={form.teacher.id || ""} onChange={handleChange} className="input">
            <option value="">Select Teacher</option>
            {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>

          <select name="room" value={form.room.id || ""} onChange={handleChange} className="input">
            <option value="">Select Room</option>
            {rooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>

          <select name="timeSlot" value={form.timeSlot.id || ""} onChange={handleChange} className="input">
            <option value="">Select Time Slot</option>
            {timeSlots.map(t => (
              <option key={t.id} value={t.id}>
                {t.dayOfWeek} {t.startTime} - {t.endTime}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 8 }}>
          <button className="btn btn-primary" type="submit">{initialData ? "Update" : "Add"} Schedule</button>
          {initialData && <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>}
        </div>
      </form>
    </div>
  );
}
