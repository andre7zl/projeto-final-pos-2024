import React, { useState, useEffect } from 'react';
import api from '../api/api';

const UserForm = ({ userToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: ''
  });

  useEffect(() => {
    if (userToEdit && userToEdit.id) {
      setFormData({
        id: userToEdit.id,
        name: userToEdit.name,
        username: userToEdit.username,
        email: userToEdit.email,
        phone: userToEdit.phone,
        website: userToEdit.website
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id) {
      api.patch(`/users/${formData.id}/`, formData)
        .then(response => {
          onSave();
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      api.post('/users/', formData)
        .then(response => {
          onSave();
        })
        .catch(error => console.error('Error creating user:', error));
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <h2>{formData.id ? 'Edit User' : 'Create User'}</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="website" className="form-label">Website</label>
          <input
            type="url"
            className="form-control"
            id="website"
            name="website"
            placeholder="Enter website URL"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {formData.id ? 'Update User' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
