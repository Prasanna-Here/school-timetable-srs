import React, { useEffect, useState } from "react";
import api from "../api";
import RoomForm from "../components/RoomForm";

export default function RoomsList(){
  const [rooms,setRooms]=useState([]);
  const [editing,setEditing]=useState(null);
  const load = ()=> api.get("/rooms").then(r=>setRooms(r.data)).catch(()=>alert("Load failed"));
  useEffect(()=>{
    load();
    return () => {}; // Cleanup function for React 19
  },[]);
  const remove = async (id)=>{ if(!confirm("Delete room?")) return; try{ await api.delete(`/rooms/${id}`); load(); } catch { alert("Delete failed"); } };

  return (
    <div className="container fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Rooms</h1>
          <p className="page-subtitle">Manage classroom and facility locations</p>
        </div>
        <div className="page-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => setEditing({})}
          >
            + Add Room
          </button>
        </div>
      </div>

      {editing && (
        <div className="form-card">
          <div className="form-header">
            <h3 className="form-title">
              {editing.id ? 'Edit Room' : 'Add New Room'}
            </h3>
            <p className="form-subtitle">
              {editing.id ? 'Update room details' : 'Create a new room entry'}
            </p>
          </div>
          <RoomForm 
            onSave={() => { setEditing(null); load(); }} 
            initialData={editing} 
            onCancel={() => setEditing(null)} 
          />
        </div>
      )}

      <div className="content-card">
        {rooms.length === 0 ? (
          <div className="empty-state">
            <h3>No Rooms Found</h3>
            <p>Start by adding your first room using the form above.</p>
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => setEditing({})}
            >
              Add First Room
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map(r => (
                  <tr key={r.id}>
                    <td><span className="badge badge-primary">{r.id}</span></td>
                    <td><strong>{r.name}</strong></td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn btn-secondary" 
                          onClick={() => setEditing(r)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-danger" 
                          onClick={() => remove(r.id)}
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
