import React, { useEffect, useState } from "react";
import api from "../api";
import SubjectForm from "../components/SubjectForm";

export default function SubjectsList(){
  const [items,setItems]=useState([]);
  const [editing,setEditing]=useState(null);
  const load = ()=> api.get("/subjects").then(r=>setItems(r.data)).catch(()=>alert("Load failed"));
  useEffect(()=>{
    load();
    return () => {}; // Cleanup function for React 19
  },[]);
  const remove = async (id)=>{ if(!confirm("Delete subject?")) return; try{ await api.delete(`/subjects/${id}`); load(); } catch { alert("Delete failed"); } };

  return (
    <div className="container fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Subjects</h1>
          <p className="page-subtitle">Manage academic subjects and course codes</p>
        </div>
        <div className="page-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => setEditing({})}
          >
            + Add Subject
          </button>
        </div>
      </div>

      {editing && (
        <div className="form-card">
          <div className="form-header">
            <h3 className="form-title">
              {editing.id ? 'Edit Subject' : 'Add New Subject'}
            </h3>
            <p className="form-subtitle">
              {editing.id ? 'Update subject details' : 'Create a new subject entry'}
            </p>
          </div>
          <SubjectForm 
            onSave={() => { setEditing(null); load(); }} 
            initialData={editing} 
            onCancel={() => setEditing(null)} 
          />
        </div>
      )}

      <div className="content-card">
        {items.length === 0 ? (
          <div className="empty-state">
            <h3>No Subjects Found</h3>
            <p>Start by adding your first subject using the form above.</p>
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => setEditing({})}
            >
              Add First Subject
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(s => (
                  <tr key={s.id}>
                    <td><span className="badge badge-primary">{s.id}</span></td>
                    <td><strong>{s.name}</strong></td>
                    <td><span className="badge badge-success">{s.code}</span></td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn btn-secondary" 
                          onClick={() => setEditing(s)}
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
