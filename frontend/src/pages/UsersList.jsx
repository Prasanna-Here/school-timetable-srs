import React, { useEffect, useState } from "react";
import api from "../api";
import UserForm from "../components/UserForm";

export default function UsersList(){
  const [users,setUsers] = useState([]);
  const [editing,setEditing] = useState(null);

  const load = () => {
    api.get("/users").then(r=>setUsers(r.data)).catch(()=>alert("Failed to load users"));
  };

  useEffect(()=>{
    load();
    return () => {}; // Cleanup function for React 19
  },[]);

  const remove = async (id) => {
    if(!window.confirm("Delete user?")) return;
    try { await api.delete(`/users/${id}`); load(); }
    catch { alert("Delete failed"); }
  };

  return (
    <div className="container fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-subtitle">Manage user accounts and permissions</p>
        </div>
        <div className="page-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => setEditing({})}
          >
            + Add User
          </button>
        </div>
      </div>

      {editing && (
        <div className="form-card">
          <div className="form-header">
            <h3 className="form-title">
              {editing.id ? 'Edit User' : 'Add New User'}
            </h3>
            <p className="form-subtitle">
              {editing.id ? 'Update user details' : 'Create a new user account'}
            </p>
          </div>
          <UserForm 
            onSave={() => { setEditing(null); load(); }} 
            initialData={editing} 
            onCancel={() => setEditing(null)} 
          />
        </div>
      )}

      <div className="content-card">
        {users.length === 0 ? (
          <div className="empty-state">
            <h3>No Users Found</h3>
            <p>Start by adding your first user using the form above.</p>
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => setEditing({})}
            >
              Add First User
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Class</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td><span className="badge badge-primary">{u.id}</span></td>
                    <td><strong>{u.name}</strong></td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${
                        u.role === 'ADMIN' ? 'badge-danger' : 
                        u.role === 'TEACHER' ? 'badge-warning' : 
                        'badge-success'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td>{u.schoolClass?.name || <span className="text-muted">-</span>}</td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn btn-secondary" 
                          onClick={() => setEditing(u)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-danger" 
                          onClick={() => remove(u.id)}
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
