import axios from 'axios';

const API_BASE_URL = 'http://172.26.70.105:3000/';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
