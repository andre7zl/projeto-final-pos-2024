import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ToDoForm from './ToDoForm';

const ToDosPage = () => {
  const [todos, setToDos] = useState([]);
  const [editingToDo, setEditingToDo] = useState(null);

  useEffect(() => {
    api.get('/todos/')
      .then(response => setToDos(response.data))
      .catch(error => console.error('Erro ao buscar ToDos:', error));
  }, []);

  const handleEdit = (todoId) => {
    api.get(`/todos/${todoId}/`)
      .then(response => setEditingToDo(response.data))
      .catch(error => console.error('Erro ao buscar ToDo:', error));
  };

  const handleDelete = (todoId) => {
    if (window.confirm('Tem certeza de que deseja excluir este ToDo?')) {
      api.delete(`/todos/${todoId}/`)
        .then(() => setToDos(todos.filter(todo => todo.id !== todoId)))
        .catch(error => console.error('Erro ao excluir ToDo:', error));
    }
  };

  const handleSave = () => {
    setEditingToDo(null);
    api.get('/todos/')
      .then(response => setToDos(response.data))
      .catch(error => console.error('Erro ao buscar ToDos:', error));
  };

  return (
    <div className="container">
      <h1>Lista de ToDos</h1>
      <button onClick={() => setEditingToDo({ title: '', user: '', completed: false })} className="btn btn-success mb-3">
        Criar ToDo
      </button>
      <div>
        {todos.map(todo => (
          <div key={todo.id} className="d-flex justify-content-between mb-2">
            <span>{todo.title} - {todo.completed ? 'Concluído' : 'Pendente'}</span>
            <div>
              <button onClick={() => handleEdit(todo.id)} className="btn btn-primary me-2">Editar</button>
              <button onClick={() => handleDelete(todo.id)} className="btn btn-danger">Excluir</button>
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
