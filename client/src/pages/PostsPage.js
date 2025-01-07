import React, { useEffect, useState } from 'react';
import api from '../api/api';
import PostForm from './PostForm';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    api.get('/posts/')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleEdit = (postId) => {
    api.get(`/posts/${postId}/`)
      .then(response => setEditingPost(response.data))
      .catch(error => console.error('Error fetching post:', error));
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      api.delete(`/posts/${postId}/`)
        .then(() => setPosts(posts.filter(post => post.id !== postId)))
        .catch(error => console.error('Error deleting post:', error));
    }
  };

  const handleSave = () => {
    setEditingPost(null);
    api.get('/posts/')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  };

  return (
    <div className="container">
      <h1>Posts List</h1>
      <button onClick={() => setEditingPost({})} className="btn btn-success mb-3">
        Create Post
      </button>
      <div>
        {posts.map(post => (
          <div key={post.id} className="d-flex justify-content-between mb-2">
            <span>{post.title}</span>
            <div>
              <button onClick={() => handleEdit(post.id)} className="btn btn-primary mr-2">Edit</button>
              <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Delete</button>
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
