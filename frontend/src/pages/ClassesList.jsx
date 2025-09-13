import React, { useEffect, useState } from "react";
import api from "../api";
import ClassForm from "../components/ClassForm";

export default function ClassesList(){
  const [items,setItems]=useState([]);
  const [editing,setEditing]=useState(null);
  const load = ()=> api.get("/classes").then(r=>setItems(r.data)).catch(()=>alert("Load failed"));
  useEffect(()=>{
    load();
    return () => {}; // Cleanup function for React 19
  },[]);
  const remove = async (id)=>{ if(!confirm("Delete class?")) return; try{ await api.delete(`/classes/${id}`); load(); } catch { alert("Delete failed"); } };

  return (
    <div className="container fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Classes</h1>
          <p className="page-subtitle">Manage school classes and student capacity</p>
        </div>
        <div className="page-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => setEditing({})}
          >
            + Add Class
          </button>
        </div>
      </div>

      {editing && (
        <div className="form-card">
          <div className="form-header">
            <h3 className="form-title">
              {editing.id ? 'Edit Class' : 'Add New Class'}
            </h3>
            <p className="form-subtitle">
              {editing.id ? 'Update class details' : 'Create a new class entry'}
            </p>
          </div>
          <ClassForm 
            onSave={() => { setEditing(null); load(); }} 
            initialData={editing} 
            onCancel={() => setEditing(null)} 
          />
        </div>
      )}

      <div className="content-card">
        {items.length === 0 ? (
          <div className="empty-state">
            <h3>No Classes Found</h3>
            <p>Start by adding your first class using the form above.</p>
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => setEditing({})}
            >
              Add First Class
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Capacity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(c => (
                  <tr key={c.id}>
                    <td><span className="badge badge-primary">{c.id}</span></td>
                    <td><strong>{c.name}</strong></td>
                    <td>
                      <span className="badge badge-success">
                        {c.capacity} students
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn btn-secondary" 
                          onClick={() => setEditing(c)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-danger" 
                          onClick={() => remove(c.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
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
