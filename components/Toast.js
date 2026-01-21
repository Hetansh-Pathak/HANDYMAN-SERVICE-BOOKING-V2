import { useState, useCallback, useEffect } from 'react'

const ToastContext = require('react').createContext()

export function useToast() {
  const context = require('react').useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now()
    const newToast = {
      id,
      message,
      type // 'success', 'error', 'info', 'warning'
    }

    setToasts(prev => [...prev, newToast])

    // Auto-remove toast after duration
    if (duration) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const value = {
    showToast,
    removeToast,
    toasts
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div style={containerStyle}>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id)}
          index={index}
        />
      ))}
    </div>
  )
}

function Toast({ toast, onRemove, index }) {
  const [isLeaving, setIsLeaving] = useState(false)

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(onRemove, 200)
  }

  const typeStyles = {
    success: successToastStyle,
    error: errorToastStyle,
    info: infoToastStyle,
    warning: warningToastStyle
  }

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ️',
    warning: '⚠️'
  }

  return (
    <div
      style={{
        ...toastStyle,
        ...typeStyles[toast.type],
        animation: isLeaving ? 'slideUp 0.2s ease forwards' : 'slideUp 0.3s ease backwards',
        transform: `translateY(${index * 80}px)`
      }}
    >
      <div style={toastContentStyle}>
        <span style={iconStyle}>{icons[toast.type]}</span>
        <p style={messageStyle}>{toast.message}</p>
        <button style={closeButtonStyle} onClick={handleClose}>×</button>
      </div>
    </div>
  )
}

// ==================== STYLES ====================

const containerStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 9998,
  pointerEvents: 'none'
}

const toastStyle = {
  background: 'white',
  borderRadius: '12px',
  padding: '16px 20px',
  marginBottom: '12px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
  border: '1px solid #E8EAED',
  maxWidth: '360px',
  pointerEvents: 'auto',
  position: 'relative',
  overflow: 'hidden'
}

const successToastStyle = {
  borderLeftColor: '#00B894',
  borderLeftWidth: '4px',
  background: 'rgba(0, 184, 148, 0.02)'
}

const errorToastStyle = {
  borderLeftColor: '#DC3545',
  borderLeftWidth: '4px',
  background: 'rgba(220, 53, 69, 0.02)'
}

const infoToastStyle = {
  borderLeftColor: '#0A66FF',
  borderLeftWidth: '4px',
  background: 'rgba(10, 102, 255, 0.02)'
}

const warningToastStyle = {
  borderLeftColor: '#FFA500',
  borderLeftWidth: '4px',
  background: 'rgba(255, 165, 0, 0.02)'
}

const toastContentStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}

const iconStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  flexShrink: 0
}

const messageStyle = {
  margin: 0,
  fontSize: '14px',
  color: '#111111',
  fontWeight: '500',
  flex: 1
}

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '20px',
  color: '#888888',
  cursor: 'pointer',
  padding: '0 4px',
  marginLeft: '8px',
  flexShrink: 0,
  transition: 'color 0.2s ease'
}

export default ToastProvider
