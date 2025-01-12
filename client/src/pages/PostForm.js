import React, { useState, useEffect } from 'react';
import api from '../api/api';

const initialState = {
  title: '',
  body: '',
  user: '',
};

const PostForm = ({ postToEdit, onSave }) => {
  const [post, setPost] = useState(initialState);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (postToEdit && postToEdit.id) {
      setPost(postToEdit);
    } else {
      setPost(initialState);
    }
  }, [postToEdit]);

  useEffect(() => {
    api.get('/users/')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Erro ao buscar usuários:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (post.id) {
      api.put(`/posts/${post.id}/`, post)
        .then(() => {
          setPost(initialState);
          onSave();
        })
        .catch((error) => console.error('Erro ao atualizar a postagem:', error));
    } else {
      api.post('/posts/', post)
        .then(() => {
          setPost(initialState);
          onSave();
        })
        .catch((error) => console.error('Erro ao criar a postagem:', error));
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{post.id ? 'Editar Postagem' : 'Criar Postagem'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={post.title}
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
              value={post.body}
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
              value={post.user}
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
          <button type="submit" className="btn btn-primary">
            {post.id ? 'Atualizar' : 'Criar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
