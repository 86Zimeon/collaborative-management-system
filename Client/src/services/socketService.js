import io from 'socket.io-client';

class SocketService {
  socket = null;

  connect(token) {
    if (this.socket) return;

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Ensure the API URL is correctly set from environment variables
    this.socket = io(apiUrl, {
      auth: { token },
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('Connected to chat server');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event, callback) {
    this.socket?.on(event, callback);
  }

  off(event, callback) {
    this.socket?.off(event, callback);
  }

  emit(event, data) {
    this.socket?.emit(event, data);
  }

  joinRoom(room) {
    this.socket?.emit('join_room', room);
  }

  leaveRoom(room) {
    this.socket?.emit('leave_room', room);
  }

  subscribeToNotifications(userId, callback) {
    if (!this.socket) return;
    this.joinRoom(`notifications:${userId}`);
    this.on('new_notification', callback);
    return () => {
      this.leaveRoom(`notifications:${userId}`);
      this.off('new_notification', callback);
    };
  }

  emitTyping(chatId, isTyping) {
    this.emit('typing', { chatId, isTyping });
  }

  notifyStatusChange(status) {
    this.emit('status_change', { status });
  }
}

export const socketService = new SocketService();