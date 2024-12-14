import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const api = {
  getUsuarios: () => axios.get(`${API_URL}usuarios/`),
  createUsuario: (data) => axios.post(`${API_URL}usuarios/`, data),
  updateUsuario: (id, data) => axios.put(`${API_URL}usuarios/${id}/`, data),
  deleteUsuario: (id) => axios.delete(`${API_URL}usuarios/${id}/`),

  getPostagens: () => axios.get(`${API_URL}postagens/`),
  createPostagem: (data) => axios.post(`${API_URL}postagens/`, data),
  updatePostagem: (id, data) => axios.put(`${API_URL}postagens/${id}/`, data),
  deletePostagem: (id) => axios.delete(`${API_URL}postagens/${id}/`),
};
