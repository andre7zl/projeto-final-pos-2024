import React, { useState, useEffect } from 'react';
import api from '../api/api';

const PhotoForm = ({ photoToEdit, onSave }) => {
  const [photo, setPhoto] = useState({
    title: '',
    url: '',
    thumbnail_url: '',
    album: '',
  });
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (photoToEdit) {
      setPhoto(photoToEdit);
    }

    api.get('/albums/')
      .then(response => setAlbums(response.data))
      .catch(error => console.error('Error fetching albums:', error));
  }, [photoToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhoto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (photo.id) {
      api.put(`/photos/${photo.id}/`, photo)
        .then(() => onSave())
        .catch(error => console.error('Error updating photo:', error));
    } else {
      api.post('/photos/', photo)
        .then(() => onSave())
        .catch(error => console.error('Error creating photo:', error));
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{photo.id ? 'Edit Photo' : 'Create Photo'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={photo.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="url" className="form-label">URL</label>
            <input
              type="url"
              id="url"
              name="url"
              className="form-control"
              value={photo.url}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="thumbnail_url" className="form-label">Thumbnail URL</label>
            <input
              type="url"
              id="thumbnail_url"
              name="thumbnail_url"
              className="form-control"
              value={photo.thumbnail_url}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="album" className="form-label">Album</label>
            <select
              id="album"
              name="album"
              className="form-select"
              value={photo.album}
              onChange={handleChange}
              required
            >
              <option value="">Select an album</option>
              {albums.map(album => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {photo.id ? 'Update Photo' : 'Create Photo'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhotoForm;
