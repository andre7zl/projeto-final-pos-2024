import React, { useState, useEffect } from 'react';
import api from '../api/api';
import PhotoForm from './PhotoForm';

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);
  const [editingPhoto, setEditingPhoto] = useState(null);

  useEffect(() => {
    api.get('/photos/')
      .then(response => setPhotos(response.data))
      .catch(error => console.error('Error fetching photos:', error));
  }, []);

  const handleEdit = (photoId) => {
    api.get(`/photos/${photoId}/`)
      .then(response => setEditingPhoto(response.data))
      .catch(error => console.error('Error fetching photo:', error));
  };

  const handleDelete = (photoId) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      api.delete(`/photos/${photoId}/`)
        .then(() => setPhotos(photos.filter(photo => photo.id !== photoId)))
        .catch(error => console.error('Error deleting photo:', error));
    }
  };

  const handleSave = () => {
    setEditingPhoto(null);
    api.get('/photos/')
      .then(response => setPhotos(response.data))
      .catch(error => console.error('Error fetching photos:', error));
  };

  return (
    <div className="container">
      <h1>Photos List</h1>
      <button onClick={() => setEditingPhoto({})} className="btn btn-success mb-3">
        Create Photo
      </button>
      <div>
        {photos.map(photo => (
          <div key={photo.id} className="d-flex justify-content-between mb-2">
            <span>{photo.title}</span>
            <div>
              <button onClick={() => handleEdit(photo.id)} className="btn btn-primary me-2">Edit</button>
              <button onClick={() => handleDelete(photo.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingPhoto !== null && (
        <PhotoForm photoToEdit={editingPhoto} onSave={handleSave} />
      )}
    </div>
  );
};

export default PhotosPage;
