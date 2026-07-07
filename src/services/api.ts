import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const gameService = {
  getAll: () => apiClient.get('/games').then(res => res.data),
  getById: (id: number) => apiClient.get(`/games/${id}`).then(res => res.data),
  create: (data: any) => apiClient.post('/games', data).then(res => res.data),
  update: (id: number, data: any) => apiClient.put(`/games/${id}`, data).then(res => res.data),
  delete: (id: number) => apiClient.delete(`/games/${id}`).then(res => res.data),
};

export const userService = {
  getAll: () => apiClient.get('/users').then(res => res.data),
  getById: (id: number) => apiClient.get(`/users/${id}`).then(res => res.data),
  update: (id: number, data: any) => apiClient.put(`/users/${id}`, data).then(res => res.data),
  delete: (id: number) => apiClient.delete(`/users/${id}`).then(res => res.data),
};

export const tournamentService = {
  getAll: () => apiClient.get('/tournaments').then(res => res.data),
  getById: (id: number) => apiClient.get(`/tournaments/${id}`).then(res => res.data),
  create: (data: any) => apiClient.post('/tournaments', data).then(res => res.data),
  update: (id: number, data: any) => apiClient.put(`/tournaments/${id}`, data).then(res => res.data),
  delete: (id: number) => apiClient.delete(`/tournaments/${id}`).then(res => res.data),
};

export const uploadService = {
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => res.data);
  }
};
