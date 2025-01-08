import React, { useState, useEffect } from 'react';
import api from '../api/api';

const ToDoForm = ({ todoToEdit, onSave }) => {
  const [todo, setToDo] = useState({
    title: '',
    user: '',
    completed: false,
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (todoToEdit) {
      setToDo(todoToEdit);
    }

    api.get('/users/')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, [todoToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setToDo((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.id) {
      api.put(`/todos/${todo.id}/`, todo)
        .then(() => onSave())
        .catch((error) => console.error('Error updating ToDo:', error));
    } else {
      api.post('/todos/', todo)
        .then(() => onSave())
        .catch((error) => console.error('Error creating ToDo:', error));
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{todo.id ? 'Edit ToDo' : 'Create ToDo'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
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
            <label htmlFor="user" className="form-label">User</label>
            <select
              id="user"
              name="user"
              className="form-select"
              value={todo.user}
              onChange={handleChange}
              required
            >
              <option value="">Select a user</option>
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
            <label htmlFor="completed" className="form-check-label">Completed</label>
          </div>
          <button type="submit" className="btn btn-primary">
            {todo.id ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ToDoForm;
