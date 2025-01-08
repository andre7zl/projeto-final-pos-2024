import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ToDosPage from './pages/ToDosPage';
import UsersPage from './pages/UsersPage';
import PostsPage from './pages/PostsPage';
import CommentsPage from './pages/CommentsPage';
import AlbumsPage from './pages/AlbumsPage';
import PhotosPage from './pages/PhotosPage';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>      
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
