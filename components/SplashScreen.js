import { useState, useEffect } from 'react'

export default function SplashScreen({ onComplete = () => {} }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Auto-hide splash screen after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div style={splashContainerStyle}>
      <div style={splashContentStyle}>
        {/* Logo */}
        <div style={logoContainerStyle}>
          <div style={logoStyle}>🔧</div>
        </div>

        {/* Brand Name */}
        <h1 style={brandNameStyle}>HandyFix</h1>
        <p style={taglineStyle}>Professional Home Services</p>

        {/* Loading Animation */}
        <div style={loaderContainerStyle}>
          <div style={spinnerStyle}></div>
        </div>

        {/* Loading Text */}
        <p style={loadingTextStyle}>Loading...</p>
      </div>

      {/* Gradient Background */}
      <div style={gradientBgStyle}></div>
    </div>
  )
}

// ==================== STYLES ====================

const splashContainerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  animation: 'fadeInUp 0.3s ease forwards'
}

const splashContentStyle = {
  textAlign: 'center',
  position: 'relative',
  zIndex: 10,
  animation: 'scaleIn 0.5s ease forwards'
}

const logoContainerStyle = {
  marginBottom: '24px',
  animation: 'slideUp 0.6s ease-out'
}

const logoStyle = {
  fontSize: '64px',
  display: 'block',
  marginBottom: '8px',
  animation: 'bounce 0.8s ease 0.3s infinite'
}

const brandNameStyle = {
  fontSize: '36px',
  fontWeight: '700',
  color: '#111111',
  margin: '0 0 8px',
  animation: 'slideUp 0.6s ease-out 0.1s both'
}

const taglineStyle = {
  fontSize: '14px',
  color: '#555555',
  margin: '0 0 32px',
  fontWeight: '500',
  animation: 'slideUp 0.6s ease-out 0.2s both'
}

const loaderContainerStyle = {
  marginBottom: '24px',
  display: 'flex',
  justifyContent: 'center',
  animation: 'slideUp 0.6s ease-out 0.3s both'
}

const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '3px solid #E8EAED',
  borderTopColor: '#0A66FF',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
}

const loadingTextStyle = {
  fontSize: '14px',
  color: '#888888',
  margin: 0,
  fontWeight: '500',
  animation: 'slideUp 0.6s ease-out 0.4s both'
}

const gradientBgStyle = {
  position: 'absolute',
  top: 0,
  right: -100,
  width: '300px',
  height: '300px',
  background: 'radial-gradient(circle, rgba(10, 102, 255, 0.1) 0%, transparent 70%)',
  borderRadius: '50%',
  pointerEvents: 'none'
}
