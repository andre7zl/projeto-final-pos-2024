import React, { useState, useEffect } from 'react';
import api from '../api/api';

const initialState = {
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
};

const UserForm = ({ userToEdit, onSave }) => {
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    if (userToEdit && userToEdit.id) {
      setUser(userToEdit);
    } else {
      setUser(initialState);
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
        .then(() => {
          setUser(initialState); // Reset after save
          onSave();
        })
        .catch((error) => console.error('Erro ao atualizar usuário:', error));
    } else {
      api.post('/users/', user)
        .then(() => {
          setUser(initialState); // Reset after save
          onSave();
        })
        .catch((error) => console.error('Erro ao criar usuário:', error));
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{user.id ? 'Editar Usuário' : 'Criar Usuário'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nome</label>
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
            <label htmlFor="username" className="form-label">Usuário</label>
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
            <label htmlFor="phone" className="form-label">Telefone</label>
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
            <label htmlFor="website" className="form-label">Site</label>
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
            {user.id ? 'Atualizar Usuário' : 'Criar Usuário'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
