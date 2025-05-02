import api from './api';

export const teamService = {
  // Team CRUD operations
  getTeams: (params) => api.get('/teams', { params }),
  getTeam: (id) => api.get(`/teams/${id}`),
  createTeam: (data) => api.post('/teams', data),
  updateTeam: (id, data) => api.put(`/teams/${id}`, data),
  deleteTeam: (id) => api.delete(`/teams/${id}`),

  // Team membership
  requestToJoin: (teamId) => api.post(`/teams/${teamId}/join`),
  handleJoinRequest: (teamId, requestId, action) => api.post(`/teams/${teamId}/join-requests/${requestId}`, { action }),
  leaveTeam: (teamId) => api.post('/teams/leave', { teamId }),
  getMembers: (teamId) => api.get(`/teams/${teamId}/members`),

  // Team settings
  updateSettings: (teamId, settings) => api.put(`/teams/${teamId}/settings`, settings),
  getTeamActivity: (teamId) => api.get(`/teams/${teamId}/activity`),
};