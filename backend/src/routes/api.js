import axios from 'axios';

const api = axios.create({
  baseURL: 'https://frontend-enfermeria.onrender.com/api', // Asegúrate de que esta es la URL correcta de tu backend
});

export default api;