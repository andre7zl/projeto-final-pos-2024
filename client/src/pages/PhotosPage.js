import React, { useState, useEffect } from 'react';
import api from '../api/api';
import PhotoForm from './PhotoForm';

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);
  const [editingPhoto, setEditingPhoto] = useState(null);

  useEffect(() => {
    api.get('/photos/')
      .then(response => setPhotos(response.data))
      .catch(error => console.error('Erro ao buscar fotos:', error));
  }, []);

  const handleEdit = (photoId) => {
    api.get(`/photos/${photoId}/`)
      .then(response => setEditingPhoto(response.data))
      .catch(error => console.error('Erro ao buscar foto:', error));
  };

  const handleDelete = (photoId) => {
    if (window.confirm('Você tem certeza de que deseja excluir esta foto?')) {
      api.delete(`/photos/${photoId}/`)
        .then(() => setPhotos(photos.filter(photo => photo.id !== photoId)))
        .catch(error => console.error('Erro ao excluir a foto:', error));
    }
  };

  const handleSave = () => {
    setEditingPhoto(null);
    api.get('/photos/')
      .then(response => setPhotos(response.data))
      .catch(error => console.error('Erro ao buscar fotos:', error));
  };

  return (
    <div className="container">
      <h1>Lista de Fotos</h1>
      <button onClick={() => setEditingPhoto({})} className="btn btn-success mb-3">
        Criar Foto
      </button>
      <div>
        {photos.map(photo => (
          <div key={photo.id} className="d-flex justify-content-between mb-2">
            <span>{photo.title}</span>
            <div>
              <button onClick={() => handleEdit(photo.id)} className="btn btn-primary me-2">Editar</button>
              <button onClick={() => handleDelete(photo.id)} className="btn btn-danger">Excluir</button>
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
