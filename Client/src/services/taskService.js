import api from './api';

export const taskService = {
  getTasks: (params) => api.get('/tasks', { params }),
  getTask: (id) => api.get(`/tasks/${id}`),
  createTask: (data) => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  startTimeTracking: (id) => api.post(`/tasks/${id}/time/start`),
  stopTimeTracking: (id) => api.post(`/tasks/${id}/time/stop`),
  addComment: (id, data) => api.post(`/tasks/${id}/comments`, data),
  updateSubtask: (id, data) => api.put(`/tasks/${id}/subtasks`, data)
};