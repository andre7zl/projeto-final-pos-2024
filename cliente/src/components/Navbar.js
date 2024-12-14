import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">Minha API</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/usuarios">Usuários</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/postagens">Postagens</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
