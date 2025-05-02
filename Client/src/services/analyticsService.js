import api from './api';

export const analyticsService = {
  getWorkspaceAnalytics: () => api.get('/analytics/workspace'),
  getProjectAnalytics: (projectId, params) => api.get(`/analytics/project/${projectId}`, { params }),
  getUserAnalytics: (userId, params) => api.get(`/analytics/user/${userId}`, { params }),
  getTeamAnalytics: (teamId, params) => api.get(`/analytics/team/${teamId}`, { params })
};
