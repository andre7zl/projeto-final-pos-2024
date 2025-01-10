import React from 'react';

const ToDoList = ({ todos, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Usuário</th>
            <th>Concluído</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.user}</td>
              <td>{todo.completed ? 'Sim' : 'Não'}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(todo)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
