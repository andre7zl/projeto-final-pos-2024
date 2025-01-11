import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ToDosPage from './pages/ToDosPage';
import UsersPage from './pages/UsersPage';
import PostsPage from './pages/PostsPage';
import CommentsPage from './pages/CommentsPage';
import AlbumsPage from './pages/AlbumsPage';
import PhotosPage from './pages/PhotosPage';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1>Projeto Milgrau APP</h1>
      <p><strong>Autores:</strong> André Ivo Silva Rezende & Ranilton costa de lima</p>
      <p>React e Django REST Framework</p>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<Home />} />
        
        {/* Outras páginas */}
        <Route path="/users" element={<UsersPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/todos" element={<ToDosPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/photos" element={<PhotosPage />} />
        <Route path="/comments" element={<CommentsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
