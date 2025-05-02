import { useEffect } from 'react';
import { socketService } from '../services/socketService';

export function useRealtime(event, room, callback, options = {}) {
  const { skip = false } = options;

  useEffect(() => {
    if (skip) return;

    // Join the room
    if (room) {
      socketService.joinRoom(room);
    }

    // Listen for events
    socketService.on(event, callback);

    return () => {
      if (room) {
        socketService.leaveRoom(room);
      }
      socketService.off(event, callback);
    };
  }, [event, room, callback, skip]);
}