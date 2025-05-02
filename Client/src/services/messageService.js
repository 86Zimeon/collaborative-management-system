import api from './api';

export const messageService = {
  getChats: () => api.get('/messages/chats'),
  
  getChatMessages: (chatId) => api.get(`/messages/chat/${chatId}`),
  
  sendMessage: (chatId, data) => api.post(`/messages/chat/${chatId}`, data),
  
  createChat: (userId) => api.post('/messages/chats', { userId }),
  
  deleteMessage: (messageId) => api.delete(`/messages/${messageId}`)
};