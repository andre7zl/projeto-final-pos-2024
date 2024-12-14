import React, { useState } from 'react';
import { api } from '../../api'; // Caminho corrigido

function FormUsuario({ onSave }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoUsuario = { nome, email };

    api.createUsuario(novoUsuario).then(() => {
      onSave();
      setNome('');
      setEmail('');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nome</label>
        <input
          type="text"
          className="form-control"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Salvar
      </button>
    </form>
  );
}

export default FormUsuario;
