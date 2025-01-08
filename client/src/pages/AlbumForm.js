import React, { useState, useEffect } from 'react';
import api from '../api/api';

const AlbumForm = ({ albumToEdit, onSave }) => {
  const [album, setAlbum] = useState({
    title: '',
    user: '',
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (albumToEdit) {
      setAlbum(albumToEdit);
    }

    api.get('/users/')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, [albumToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (album.id) {
      api.put(`/albums/${album.id}/`, album)
        .then(() => onSave())
        .catch(error => console.error('Error updating album:', error));
    } else {
      api.post('/albums/', album)
        .then(() => onSave())
        .catch(error => console.error('Error creating album:', error));
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{album.id ? 'Edit Album' : 'Create Album'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={album.title}
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
              value={album.user}
              onChange={handleChange}
              required
            >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.username})
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {album.id ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlbumForm;
