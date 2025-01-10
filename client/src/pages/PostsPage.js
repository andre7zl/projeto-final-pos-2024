import React, { useEffect, useState } from 'react';
import api from '../api/api';
import PostForm from './PostForm';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    api.get('/posts/')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Erro ao buscar posts:', error));
  }, []);

  const handleEdit = (postId) => {
    api.get(`/posts/${postId}/`)
      .then(response => setEditingPost(response.data))
      .catch(error => console.error('Erro ao buscar post:', error));
  };

  const handleDelete = (postId) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      api.delete(`/posts/${postId}/`)
        .then(() => setPosts(posts.filter(post => post.id !== postId)))
        .catch(error => console.error('Erro ao excluir post:', error));
    }
  };

  const handleSave = () => {
    setEditingPost(null);
    api.get('/posts/')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Erro ao buscar posts:', error));
  };

  return (
    <div className="container">
      <h1>Lista de Posts</h1>
      <button onClick={() => setEditingPost({})} className="btn btn-success mb-3">
        Criar Post
      </button>
      <div>
        {posts.map(post => (
          <div key={post.id} className="d-flex justify-content-between mb-2">
            <span>{post.title}</span>
            <div>
              <button onClick={() => handleEdit(post.id)} className="btn btn-primary me-2">Editar</button>
              <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Excluir</button>
            </div>
          </div>
        ))}
      </div>

      {editingPost !== null && (
        <PostForm postToEdit={editingPost} onSave={handleSave} />
      )}
    </div>
  );
};

export default PostsPage;
