import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Meu App</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/users"
              >
                Usuários
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/posts"
              >
                Postagens
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/todos"
              >
                Tarefas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/albums"
              >
                Álbuns
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/photos"
              >
                Fotos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/comments"
              >
                Comentários
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;