import React, { useEffect, useState } from "react";
import api from "../api";

export default function UserForm({ onSave, initialData=null, onCancel }){
  const [classes,setClasses]=useState([]);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("STUDENT");
  const [classId,setClassId]=useState("");

  useEffect(()=> {
    api.get("/classes").then(r=>setClasses(r.data)).catch(()=>setClasses([]));
    return () => {}; // Cleanup function for React 19
  }, []);

  useEffect(()=>{
    if(initialData){
      setName(initialData.name || "");
      setEmail(initialData.email || "");
      setRole(initialData.role || "STUDENT");
      setClassId(initialData.schoolClass?.id || "");
      setPassword("");
    } else {
      setName(""); setEmail(""); setPassword(""); setRole("STUDENT"); setClassId("");
    }
    return () => {}; // Cleanup function for React 19
  }, [initialData]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, role };
      // only set password on create or if provided
      if(password) body.password = password;
      if(role === "STUDENT") body.schoolClass = classId ? { id: Number(classId) } : null;
      else body.schoolClass = null;

      if(initialData && initialData.id){
        await api.put(`/users/${initialData.id}`, body);
        alert("Updated");
      } else {
        // for creating user via /users - if your backend requires /auth/register, change endpoint
        await api.post("/users", body);
        alert("Created");
      }
      onSave();
    } catch (err) {
      alert("Save failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{marginBottom:12}}>
      <form onSubmit={submit}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
          <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password (leave blank to keep)" value={password} onChange={e=>setPassword(e.target.value)} />
          <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="STUDENT">STUDENT</option>
            <option value="TEACHER">TEACHER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          {role === "STUDENT" && (
            <select className="input" value={classId} onChange={e=>setClassId(e.target.value)}>
              <option value="">Select Class</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          )}
        </div>

        <div style={{marginTop:8}}>
          <button className="btn btn-primary" type="submit">{initialData ? "Update" : "Add"} User</button>
          {initialData && <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>}
        </div>
      </form>
    </div>
  );
}
