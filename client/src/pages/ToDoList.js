import React from 'react';

const ToDoList = ({ todos, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>User</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.user}</td>
              <td>{todo.completed ? 'Yes' : 'No'}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(todo)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
