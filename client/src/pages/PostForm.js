import React, { useState, useEffect } from 'react';
import api from '../api/api';

const PostForm = ({ postToEdit, onSave }) => {
  const [post, setPost] = useState({
    title: '',
    body: '',
    user: '',
  });
  const [users, setUsers] = useState([]); // Lista de usuários

  useEffect(() => {
    if (postToEdit) {
      setPost(postToEdit);
    }

    // Buscar a lista de usuários
    api.get('/users/')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, [postToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post.id) {
      api.put(`/posts/${post.id}/`, post)
        .then(() => onSave())
        .catch((error) => console.error('Error updating post:', error));
    } else {
      api.post('/posts/', post)
        .then(() => onSave())
        .catch((error) => console.error('Error creating post:', error));
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{post.id ? 'Edit Post' : 'Create Post'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
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
            <label htmlFor="body" className="form-label">Body</label>
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
            <label htmlFor="user" className="form-label">User</label>
            <select
              id="user"
              name="user"
              className="form-select"
              value={post.user}
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
          <button type="submit" className="btn btn-primary">
            {post.id ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
