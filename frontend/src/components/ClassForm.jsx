import React, { useEffect, useState } from "react";
import api from "../api";

export default function ClassForm({ onSave, initialData=null, onCancel }){
  const [name,setName]=useState("");
  const [capacity,setCapacity]=useState("");

  useEffect(()=> {
    if(initialData){ setName(initialData.name || ""); setCapacity(initialData.capacity ?? ""); }
    else { setName(""); setCapacity(""); }
    return () => {}; // Cleanup function for React 19
  }, [initialData]);

  const submit = async (e) => {
    e.preventDefault();
    try{
      const body = { name, capacity: Number(capacity) };
      if(initialData && initialData.id) await api.put(`/classes/${initialData.id}`, body);
      else await api.post("/classes", body);
      onSave();
    }catch(err){ alert("Save failed"); }
  };

  return (
    <form onSubmit={submit} style={{marginBottom:12}}>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
        <input className="input" placeholder="Class name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Capacity" type="number" value={capacity} onChange={e=>setCapacity(e.target.value)} />
      </div>
      <div style={{marginTop:8}}>
        <button className="btn btn-primary" type="submit">{initialData ? "Update" : "Add"} Class</button>
        {initialData && <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
