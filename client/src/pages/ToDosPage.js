import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ToDoForm from './ToDoForm';

const ToDosPage = () => {
  const [todos, setToDos] = useState([]);
  const [editingToDo, setEditingToDo] = useState(null);

  useEffect(() => {
    api.get('/todos/')
      .then(response => setToDos(response.data))
      .catch(error => console.error('Error fetching ToDos:', error));
  }, []);

  const handleEdit = (todoId) => {
    api.get(`/todos/${todoId}/`)
      .then(response => setEditingToDo(response.data))
      .catch(error => console.error('Error fetching ToDo:', error));
  };

  const handleDelete = (todoId) => {
    if (window.confirm('Are you sure you want to delete this ToDo?')) {
      api.delete(`/todos/${todoId}/`)
        .then(() => setToDos(todos.filter(todo => todo.id !== todoId)))
        .catch(error => console.error('Error deleting ToDo:', error));
    }
  };

  const handleSave = () => {
    setEditingToDo(null);
    api.get('/todos/')
      .then(response => setToDos(response.data))
      .catch(error => console.error('Error fetching ToDos:', error));
  };

  return (
    <div className="container">
      <h1>ToDos List</h1>
      <button onClick={() => setEditingToDo({ title: '', user: '', completed: false })} className="btn btn-success mb-3">
        Create ToDo
      </button>
      <div>
        {todos.map(todo => (
          <div key={todo.id} className="d-flex justify-content-between mb-2">
            <span>{todo.title} - {todo.completed ? 'Completed' : 'Pending'}</span>
            <div>
              <button onClick={() => handleEdit(todo.id)} className="btn btn-primary mr-2">Edit</button>
              <button onClick={() => handleDelete(todo.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingToDo !== null && (
        <ToDoForm todoToEdit={editingToDo} onSave={handleSave} />
      )}
    </div>
  );
};

export default ToDosPage;
