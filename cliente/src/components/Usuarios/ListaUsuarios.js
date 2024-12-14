import React, { useEffect, useState } from 'react';
import { api } from '../../api'; // Caminho corrigido

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  // Função para carregar usuários
  const carregarUsuarios = () => {
    api.getUsuarios()
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error('Erro ao carregar usuários:', error));
  };

  // UseEffect para carregar usuários na montagem do componente
  useEffect(() => {
    carregarUsuarios();
  }, []);

  // Função para deletar um usuário
  const deletarUsuario = (id) => {
    api.deleteUsuario(id)
      .then(() => {
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      })
      .catch((error) => console.error('Erro ao deletar usuário:', error));
  };

  return (
    <div className="container mt-3">
      <h2>Usuários</h2>
      <ul className="list-group">
        {usuarios.length > 0 ? (
          usuarios.map((usuario) => (
            <li key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center">
              {usuario.nome}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deletarUsuario(usuario.id)}
              >
                Deletar
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item">Nenhum usuário encontrado.</li>
        )}
      </ul>
    </div>
  );
}

export default ListaUsuarios;
