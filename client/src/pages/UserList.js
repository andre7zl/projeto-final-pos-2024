import React, { useEffect, useState } from 'react';
import api from '../api/api';

const UserList = ({ onEdit, onDelete }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users/')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email}){' '}
            <button onClick={() => onEdit(user)}>Editar</button>
            <button onClick={() => onDelete(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
