import React, { useEffect, useState } from "react";
import api from "../api";
import TimeSlotForm from "../components/TimeSlotForm";

export default function TimeSlotsList(){
  const [items,setItems]=useState([]);
  const [editing,setEditing]=useState(null);
  const load = ()=> api.get("/timeslots").then(r=>setItems(r.data)).catch(()=>alert("Load failed"));
  useEffect(()=>{
    load();
    return () => {}; // Cleanup function for React 19
  },[]);
  const remove = async (id)=>{ if(!confirm("Delete timeslot?")) return; try{ await api.delete(`/timeslots/${id}`); load(); } catch { alert("Delete failed"); } };

  return (
    <div className="container fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Time Slots</h1>
          <p className="page-subtitle">Manage class periods and time schedules</p>
        </div>
        <div className="page-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => setEditing({})}
          >
            + Add Time Slot
          </button>
        </div>
      </div>

      {editing && (
        <div className="form-card">
          <div className="form-header">
            <h3 className="form-title">
              {editing.id ? 'Edit Time Slot' : 'Add New Time Slot'}
            </h3>
            <p className="form-subtitle">
              {editing.id ? 'Update time slot details' : 'Create a new time slot entry'}
            </p>
          </div>
          <TimeSlotForm 
            onSave={() => { setEditing(null); load(); }} 
            initialData={editing} 
            onCancel={() => setEditing(null)} 
          />
        </div>
      )}

      <div className="content-card">
        {items.length === 0 ? (
          <div className="empty-state">
            <h3>No Time Slots Found</h3>
            <p>Start by adding your first time slot using the form above.</p>
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => setEditing({})}
            >
              Add First Time Slot
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Day</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(t => (
                  <tr key={t.id}>
                    <td><span className="badge badge-primary">{t.id}</span></td>
                    <td><span className="badge badge-warning">{t.dayOfWeek}</span></td>
                    <td><strong>{t.startTime}</strong></td>
                    <td><strong>{t.endTime}</strong></td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn btn-secondary" 
                          onClick={() => setEditing(t)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-danger" 
                          onClick={() => remove(t.id)}
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
