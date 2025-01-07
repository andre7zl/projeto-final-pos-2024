import React, { useEffect, useState } from 'react';
import api from '../api/api';
import UserForm from './UserForm';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    api.get('/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleEdit = (userId) => {
    api.get(`/users/${userId}/`)
      .then(response => {
        setEditingUser(response.data);
      })
      .catch(error => console.error('Error fetching user:', error));
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      api.delete(`/users/${userId}/`)
        .then(() => {
          setUsers(users.filter(user => user.id !== userId));
        })
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  const handleSave = () => {
    setEditingUser(null);
    api.get('/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  return (
    <div className="container">
      <h1>Users List</h1>
      <button onClick={() => setEditingUser({})} className="btn btn-success mb-3">
        Create User
      </button>
      <div>
        {users.map(user => (
          <div key={user.id} className="d-flex justify-content-between mb-2">
            <span>{user.name}</span>
            <div>
              <button onClick={() => handleEdit(user.id)} className="btn btn-primary mr-2">Edit</button>
              <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingUser !== null && (
        <UserForm userToEdit={editingUser} onSave={handleSave} />
      )}
    </div>
  );
};

export default UsersPage;
