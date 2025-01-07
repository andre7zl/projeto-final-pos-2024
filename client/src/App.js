import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UsersPage from './pages/UsersPage';
import PostsPage from './pages/PostsPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h1>Welcome to CRUD App</h1>} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
