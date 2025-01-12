import React, { useState, useEffect } from 'react';
import api from '../api/api';

const initialState = {
  title: '',
  user: '',
  completed: false,
};

const ToDoForm = ({ todoToEdit, onSave }) => {
  const [todo, setToDo] = useState(initialState);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (todoToEdit && todoToEdit.id) {
      setToDo(todoToEdit);
    } else {
      setToDo(initialState);
    }
  }, [todoToEdit]);

  useEffect(() => {
    api.get('/users/')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Erro ao buscar usuários:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setToDo((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.id) {
      api.put(`/todos/${todo.id}/`, todo)
        .then(() => {
          setToDo(initialState);
          onSave();
        })
        .catch((error) => console.error('Erro ao atualizar ToDo:', error));
    } else {
      api.post('/todos/', todo)
        .then(() => {
          setToDo(initialState);
          onSave();
        })
        .catch((error) => console.error('Erro ao criar ToDo:', error));
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{todo.id ? 'Editar ToDo' : 'Criar ToDo'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={todo.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="user" className="form-label">Usuário</label>
            <select
              id="user"
              name="user"
              className="form-select"
              value={todo.user}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um usuário</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.username})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              className="form-check-input"
              checked={todo.completed}
              onChange={handleChange}
            />
            <label htmlFor="completed" className="form-check-label">Concluído</label>
          </div>
          <button type="submit" className="btn btn-primary">
            {todo.id ? 'Atualizar' : 'Criar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ToDoForm;
