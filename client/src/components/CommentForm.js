import React, { useState, useEffect } from 'react';
import api from '../api/api';

const CommentForm = ({ commentToEdit, onSave }) => {
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
    post: '',
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (commentToEdit) {
      setComment(commentToEdit);
    }

    api.get('/posts/')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Erro ao buscar posts:', error));
  }, [commentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.id) {
      api.put(`/comments/${comment.id}/`, comment)
        .then(() => onSave())
        .catch((error) => console.error('Erro ao atualizar comentário:', error));
    } else {
      api.post('/comments/', comment)
        .then(() => onSave())
        .catch((error) => console.error('Erro ao criar comentário:', error));
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{comment.id ? 'Editar Comentário' : 'Criar Comentário'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={comment.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={comment.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="body" className="form-label">Conteúdo</label>
            <textarea
              id="body"
              name="body"
              className="form-control"
              value={comment.body}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="post" className="form-label">Postagem</label>
            <select
              id="post"
              name="post"
              className="form-select"
              value={comment.post}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma postagem</option>
              {posts.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.title}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {comment.id ? 'Atualizar Comentário' : 'Criar Comentário'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
