import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // proxy will handle this in development
});

export default api;