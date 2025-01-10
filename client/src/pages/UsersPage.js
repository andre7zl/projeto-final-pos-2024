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
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  const handleEdit = (userId) => {
    api.get(`/users/${userId}/`)
      .then(response => {
        setEditingUser(response.data);
      })
      .catch(error => console.error('Erro ao buscar usuário:', error));
  };

  const handleDelete = (userId) => {
    if (window.confirm('Tem certeza de que deseja excluir este usuário?')) {
      api.delete(`/users/${userId}/`)
        .then(() => {
          setUsers(users.filter(user => user.id !== userId));
        })
        .catch(error => console.error('Erro ao excluir usuário:', error));
    }
  };

  const handleSave = () => {
    setEditingUser(null);
    api.get('/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Erro ao buscar usuários:', error));
  };

  return (
    <div className="container">
      <h1>Lista de Usuários</h1>
      <button onClick={() => setEditingUser({})} className="btn btn-success mb-3">
        Criar Usuário
      </button>
      <div>
        {users.map(user => (
          <div key={user.id} className="d-flex justify-content-between mb-2">
            <span>{user.name}</span>
            <div>
              <button onClick={() => handleEdit(user.id)} className="btn btn-primary me-2">Editar</button>
              <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Excluir</button>
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
