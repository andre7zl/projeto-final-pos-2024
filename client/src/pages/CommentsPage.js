import React, { useEffect, useState } from 'react';
import api from '../api/api';
import CommentForm from '../components/CommentForm';

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    api.get('/comments/')
      .then(response => setComments(response.data))
      .catch(error => console.error('Erro ao buscar comentários:', error));
  }, []);

  const handleEdit = (commentId) => {
    api.get(`/comments/${commentId}/`)
      .then(response => setEditingComment(response.data))
      .catch(error => console.error('Erro ao buscar comentário:', error));
  };

  const handleDelete = (commentId) => {
    if (window.confirm('Tem certeza de que deseja excluir este comentário?')) {
      api.delete(`/comments/${commentId}/`)
        .then(() => setComments(comments.filter(comment => comment.id !== commentId)))
        .catch(error => console.error('Erro ao excluir comentário:', error));
    }
  };

  const handleSave = () => {
    setEditingComment(null);
    api.get('/comments/')
      .then(response => setComments(response.data))
      .catch(error => console.error('Erro ao buscar comentários:', error));
  };

  return (
    <div className="container">
      <h1>Lista de Comentários</h1>
      <button onClick={() => setEditingComment({})} className="btn btn-success mb-3">
        Criar Comentário
      </button>
      <div>
        {comments.map(comment => (
          <div key={comment.id} className="d-flex justify-content-between mb-2">
            <div>
              <strong>{comment.name}</strong> <br />
              <small>{comment.email}</small> <br />
              <p>{comment.body}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(comment.id)} className="btn btn-primary me-2">Editar</button>
              <button onClick={() => handleDelete(comment.id)} className="btn btn-danger">Excluir</button>
            </div>
          </div>
        ))}
      </div>

      {editingComment !== null && (
        <CommentForm commentToEdit={editingComment} onSave={handleSave} />
      )}
    </div>
  );
};

export default CommentsPage;
