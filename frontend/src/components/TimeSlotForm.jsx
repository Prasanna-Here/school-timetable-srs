import React, { useEffect, useState } from "react";
import api from "../api";

export default function TimeSlotForm({ onSave, initialData=null, onCancel }){
  const [day,setDay]=useState("MONDAY");
  const [start,setStart]=useState("");
  const [end,setEnd]=useState("");

  useEffect(()=> {
    if(initialData){ setDay(initialData.dayOfWeek || "MONDAY"); setStart(initialData.startTime || ""); setEnd(initialData.endTime || ""); }
    else { setDay("MONDAY"); setStart(""); setEnd(""); }
    return () => {}; // Cleanup function for React 19
  }, [initialData]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const body = { dayOfWeek: day, startTime: start, endTime: end };
      if(initialData && initialData.id) await api.put(`/timeslots/${initialData.id}`, body);
      else await api.post("/timeslots", body);
      onSave();
    } catch(err) { alert("Save failed"); }
  };

  return (
    <form onSubmit={submit} style={{marginBottom:12}}>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8}}>
        <select className="input" value={day} onChange={e=>setDay(e.target.value)}>
          <option>MONDAY</option><option>TUESDAY</option><option>WEDNESDAY</option>
          <option>THURSDAY</option><option>FRIDAY</option><option>SATURDAY</option>
        </select>
        <input className="input" placeholder="Start (HH:MM:SS)" value={start} onChange={e=>setStart(e.target.value)} />
        <input className="input" placeholder="End (HH:MM:SS)" value={end} onChange={e=>setEnd(e.target.value)} />
      </div>
      <div style={{marginTop:8}}>
        <button className="btn btn-primary" type="submit">{initialData ? "Update" : "Add"} TimeSlot</button>
        {initialData && <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
