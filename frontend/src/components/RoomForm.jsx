import React, { useEffect, useState } from "react";
import api from "../api";

export default function RoomForm({ onSave, initialData=null, onCancel }){
  const [name,setName]=useState("");

  useEffect(()=> {
    if(initialData) setName(initialData.name || "");
    else setName("");
    return () => {}; // Cleanup function for React 19
  }, [initialData]);

  const submit = async (e) => {
    e.preventDefault();
    try{
      const body = { name };
      if(initialData && initialData.id) await api.put(`/rooms/${initialData.id}`, body);
      else await api.post("/rooms", body);
      onSave();
    }catch(err){ alert("Save failed"); }
  };

  return (
    <form onSubmit={submit} style={{marginBottom:12}}>
      <input className="input" placeholder="Room name" value={name} onChange={e=>setName(e.target.value)} />
      <div style={{marginTop:8}}>
        <button className="btn btn-primary" type="submit">{initialData ? "Update" : "Add"} Room</button>
        {initialData && <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
