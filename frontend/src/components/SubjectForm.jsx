import React, { useEffect, useState } from "react";
import api from "../api";

export default function SubjectForm({ onSave, initialData=null, onCancel }){
  const [name,setName]=useState("");
  const [code,setCode]=useState("");

  useEffect(()=> {
    if(initialData){ setName(initialData.name||""); setCode(initialData.code||""); }
    else { setName(""); setCode(""); }
    return () => {}; // Cleanup function for React 19
  }, [initialData]);

  const submit = async (e) => {
    e.preventDefault();
    try{
      const body = { name, code };
      if(initialData && initialData.id) await api.put(`/subjects/${initialData.id}`, body);
      else await api.post("/subjects", body);
      onSave();
    }catch(err){ alert("Save failed"); }
  };

  return (
    <form onSubmit={submit} style={{marginBottom:12}}>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
        <input className="input" placeholder="Subject name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Code e.g. MATH101" value={code} onChange={e=>setCode(e.target.value)} />
      </div>
      <div style={{marginTop:8}}>
        <button className="btn btn-primary" type="submit">{initialData ? "Update" : "Add"} Subject</button>
        {initialData && <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
