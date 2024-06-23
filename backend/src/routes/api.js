import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Asegúrate de que esta es la URL correcta de tu backend
});

export default api;