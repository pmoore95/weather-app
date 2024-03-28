import axios from 'axios';

const API_VERSION = 'v1';

export const apiClient = axios.create({
  baseURL: `http://localhost:3000/api/${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
});