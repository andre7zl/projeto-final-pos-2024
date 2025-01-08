import React, { useState, useEffect } from 'react';
import api from '../api/api';

const UserForm = ({ userToEdit, onSave }) => {
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
  });

  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.id) {
      api.put(`/users/${user.id}/`, user)
        .then(() => onSave())
        .catch((error) => console.error('Error updating user:', error));
    } else {
      api.post('/users/', user)
        .then(() => onSave())
        .catch((error) => console.error('Error creating user:', error));
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{user.id ? 'Edit User' : 'Create User'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={user.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="website" className="form-label">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              className="form-control"
              value={user.website}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {user.id ? 'Update User' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
