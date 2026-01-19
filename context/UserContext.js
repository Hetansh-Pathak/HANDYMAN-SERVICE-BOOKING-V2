import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const [isClient, setIsClient] = useState(false)

  // Mock data - replace with actual API calls
  useEffect(() => {
    setIsClient(true)
    
    // Check for stored user session
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const storedUser = localStorage.getItem('handyfix_user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          loadNotifications(userData.id)
        }
      }
    } catch (error) {
      console.warn('localStorage access error:', error)
    }
    
    setLoading(false)
  }, [])

  const login = async (userData) => {
    // Mock login - replace with actual API call
    const userWithId = {
      ...userData,
      id: Date.now(), // Mock ID
      createdAt: new Date().toISOString()
    }
    
    setUser(userWithId)
    
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('handyfix_user', JSON.stringify(userWithId))
      }
    } catch (error) {
      console.warn('localStorage save error:', error)
    }
    
    await loadNotifications(userWithId.id)
    return userWithId
  }

  const logout = () => {
    setUser(null)
    setNotifications([])
    
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.removeItem('handyfix_user')
      }
    } catch (error) {
      console.warn('localStorage remove error:', error)
    }
  }

  const updateProfile = async (updatedData) => {
    // Mock update - replace with actual API call
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('handyfix_user', JSON.stringify(updatedUser))
      }
    } catch (error) {
      console.warn('localStorage update error:', error)
    }
    
    return updatedUser
  }

  const loadNotifications = async (userId) => {
    // Mock notifications - replace with actual API call
    const mockNotifications = [
      {
        id: 1,
        type: 'booking',
        title: 'New Booking Request',
        message: 'You have a new booking request from Priya Sharma',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionUrl: '/dashboard/provider'
      },
      {
        id: 2,
        type: 'booking_confirmed',
        title: 'Booking Confirmed',
        message: 'Your booking with Rajesh Kumar has been confirmed',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionUrl: '/dashboard/user'
      }
    ]
    
    setNotifications(mockNotifications.filter(n => n.userId === userId || !n.userId))
  }

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    )
  }

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false
    }
    setNotifications(prev => [newNotification, ...prev])
    
    // Show browser notification if supported
    try {
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico'
        })
      }
    } catch (error) {
      console.warn('Notification API error:', error)
    }
  }

  const requestNotificationPermission = () => {
    try {
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission()
      }
    } catch (error) {
      console.warn('Notification permission error:', error)
    }
  }

  const value = {
    user,
    loading,
    notifications,
    login,
    logout,
    updateProfile,
    loadNotifications,
    markNotificationAsRead,
    addNotification,
    requestNotificationPermission,
    isCustomer: user?.userType === 'customer',
    isProvider: user?.userType === 'provider',
    isAdmin: user?.role === 'admin'
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
