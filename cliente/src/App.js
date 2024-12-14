import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListaUsuarios from './components/Usuarios/ListaUsuarios';
import FormUsuario from './components/Usuarios/FormUsuario';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/usuarios" element={<ListaUsuarios />} />
          <Route path="/usuarios/novo" element={<FormUsuario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
