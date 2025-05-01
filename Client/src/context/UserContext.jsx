import { createContext, useContext, useState, useEffect } from 'react'
import { socketService } from '../services/socketService';

const UserContext = createContext()

const initialUserState = {
  _id: null,
  name: '',
  email: '',
  role: '',
  department: '',
  bio: '',
  avatar: null,
  status: 'offline'
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : initialUserState
  })

  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem('notifications')
    return savedNotifications ? JSON.parse(savedNotifications) : []
  })

  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'))

  // Initialize socket connection when user logs in
  useEffect(() => {
    let cleanup = () => {};

    const initializeSocket = async () => {
      if (token && user._id) {
        try {
          await socketService.connect(token);
          setIsAuthenticated(true);
          
          // Subscribe to personal notifications
          const notificationHandler = (notification) => {
            addNotification(notification);
          };
          
          const unsubscribe = await socketService.subscribeToNotifications(user._id, notificationHandler);
          cleanup = () => {
            if (typeof unsubscribe === 'function') {
              unsubscribe();
            }
            socketService.disconnect();
          };
        } catch (error) {
          console.error('Socket initialization error:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    initializeSocket();

    return () => cleanup();
  }, [token, user._id]);

  // Persist user data
  useEffect(() => {
    if (user._id) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  // Persist notifications
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }, [notifications])

  const login = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    setIsAuthenticated(true)
    localStorage.setItem('token', authToken)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('userId', userData._id)
  }

  const logout = () => {
    setUser(initialUserState)
    setToken(null)
    setIsAuthenticated(false)
    setNotifications([])
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    localStorage.removeItem('notifications')
    socketService.disconnect()
  }

  const updateUser = (userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }))
  }

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const addNotification = (notification) => {
    setNotifications(prev => [
      { 
        id: Date.now(), 
        read: false, 
        timestamp: new Date().toISOString(),
        ...notification 
      },
      ...prev
    ])
  }

  const value = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    updateUser,
    notifications,
    markNotificationAsRead,
    addNotification,
    unreadCount: notifications.filter(n => !n.read).length
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}