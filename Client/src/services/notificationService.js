import api from './api';
import { socketService } from './socketService';

export const notificationService = {
  getNotifications: (params) => api.get('/notifications', { params }),
  markAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  deleteNotification: (notificationId) => api.delete(`/notifications/${notificationId}`),
  
  // Subscribe to real-time notifications
  subscribeToNotifications: (userId, callback) => {
    return socketService.subscribeToNotifications(userId, callback);
  },

  // Update notification preferences
  updatePreferences: (preferences) => api.put('/notifications/preferences', preferences)
};