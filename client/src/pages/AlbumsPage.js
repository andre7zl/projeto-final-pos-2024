import React, { useState, useEffect } from 'react';
import api from '../api/api';
import AlbumForm from './AlbumForm';

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [editingAlbum, setEditingAlbum] = useState(null);

  useEffect(() => {
    api.get('/albums/')
      .then(response => setAlbums(response.data))
      .catch(error => console.error('Error fetching albums:', error));
  }, []);

  const handleEdit = (albumId) => {
    api.get(`/albums/${albumId}/`)
      .then(response => setEditingAlbum(response.data))
      .catch(error => console.error('Error fetching album:', error));
  };

  const handleDelete = (albumId) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      api.delete(`/albums/${albumId}/`)
        .then(() => setAlbums(albums.filter(album => album.id !== albumId)))
        .catch(error => console.error('Error deleting album:', error));
    }
  };

  const handleSave = () => {
    setEditingAlbum(null);
    api.get('/albums/')
      .then(response => setAlbums(response.data))
      .catch(error => console.error('Error fetching albums:', error));
  };

  return (
    <div className="container">
      <h1>Albums List</h1>
      <button onClick={() => setEditingAlbum({})} className="btn btn-success mb-3">
        Create Album
      </button>
      <div>
        {albums.map(album => (
          <div key={album.id} className="d-flex justify-content-between mb-2">
            <span>{album.title}</span>
            <div>
              <button onClick={() => handleEdit(album.id)} className="btn btn-primary me-2">Edit</button>
              <button onClick={() => handleDelete(album.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingAlbum !== null && (
        <AlbumForm albumToEdit={editingAlbum} onSave={handleSave} />
      )}
    </div>
  );
};

export default AlbumsPage;
