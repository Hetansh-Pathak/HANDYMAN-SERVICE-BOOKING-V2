import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Layout({ children, title = 'Handyman Service Booking' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'booking',
        title: 'New Booking Request',
        message: 'Rajesh Kumar requested plumbing service',
        time: '2 min ago',
        read: false,
        avatar: '👨‍🔧'
      },
      {
        id: 2,
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment of ₹500 received from Priya Singh',
        time: '1 hour ago',
        read: false,
        avatar: '💰'
      },
      {
        id: 3,
        type: 'review',
        title: 'New Review',
        message: 'Amit Sharma left you a 5-star review',
        time: '3 hours ago',
        read: true,
        avatar: '⭐'
      },
      {
        id: 4,
        type: 'message',
        title: 'New Message',
        message: 'Customer inquiry about electrical work',
        time: '5 hours ago',
        read: true,
        avatar: '💬'
      }
    ]
    setNotifications(mockNotifications)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking': return '📋'
      case 'payment': return '💰'
      case 'review': return '⭐'
      case 'message': return '💬'
      default: return '🔔'
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Find trusted plumbers, carpenters & electricians in your city" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={headerStyle}>
        <nav style={navStyle}>
          <div className="container" style={navContainerStyle}>
            <Link href="/" style={logoStyle}>
              🔧 HandyFix
            </Link>
            
            <div style={desktopMenuStyle}>
              <Link href="/" style={navLinkStyle}>Home</Link>
              <Link href="/services" style={navLinkStyle}>Services</Link>
              <Link href="/providers" style={navLinkStyle}>Find Providers</Link>
              <Link href="/about" style={navLinkStyle}>About</Link>
              <Link href="/contact" style={navLinkStyle}>Contact</Link>
            </div>

            <div style={rightSectionStyle}>
              {/* Notification Tab */}
              <div style={notificationContainerStyle}>
                <button 
                  style={notificationBtnStyle}
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <span style={notificationIconStyle}>🔔</span>
                  {unreadCount > 0 && (
                    <span style={notificationBadgeStyle}>
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div style={notificationDropdownStyle}>
                    <div style={notificationHeaderStyle}>
                      <h3 style={notificationTitleStyle}>Notifications</h3>
                      {unreadCount > 0 && (
                        <button 
                          style={markAllReadBtnStyle}
                          onClick={markAllAsRead}
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div style={notificationListStyle}>
                      {notifications.length === 0 ? (
                        <div style={emptyNotificationsStyle}>
                          <span style={emptyIconStyle}>🔔</span>
                          <p>No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map(notification => (
                          <div 
                            key={notification.id} 
                            style={{
                              ...notificationItemStyle,
                              ...(notification.read ? readNotificationStyle : unreadNotificationStyle)
                            }}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div style={notificationAvatarStyle}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div style={notificationContentStyle}>
                              <div style={notificationItemTitleStyle}>
                                {notification.title}
                              </div>
                              <div style={notificationMessageStyle}>
                                {notification.message}
                              </div>
                              <div style={notificationTimeStyle}>
                                {notification.time}
                              </div>
                            </div>
                            {!notification.read && (
                              <div style={unreadDotStyle}></div>
                            )}
                          </div>
                        ))
                      )}
                    </div>

                    <div style={notificationFooterStyle}>
                      <Link href="/notifications" style={viewAllLinkStyle}>
                        View All Notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div style={quickActionsStyle}>
                <Link href="/emergency" style={emergencyBtnStyle} title="Emergency Service">
                  🚨
                </Link>
              </div>

              {/* Auth Links */}
              <div style={authLinksStyle}>
                <Link href="/auth/login" className="btn btn-outline" style={loginBtnStyle}>Login</Link>
                <Link href="/auth/register" className="btn btn-primary">Sign Up</Link>
              </div>
            </div>

            <button 
              style={mobileMenuBtnStyle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>

          {isMenuOpen && (
            <div style={mobileMenuStyle}>
              <Link href="/" style={mobileNavLinkStyle}>Home</Link>
              <Link href="/services" style={mobileNavLinkStyle}>Services</Link>
              <Link href="/providers" style={mobileNavLinkStyle}>Find Providers</Link>
              <Link href="/about" style={mobileNavLinkStyle}>About</Link>
              <Link href="/contact" style={mobileNavLinkStyle}>Contact</Link>
              <hr style={{margin: '16px 0', border: '1px solid #eee'}} />
              <div style={mobileNotificationStyle}>
                <span>🔔 Notifications ({unreadCount})</span>
              </div>
              <Link href="/emergency" style={mobileNavLinkStyle}>🚨 Emergency</Link>
              <hr style={{margin: '16px 0', border: '1px solid #eee'}} />
              <Link href="/auth/login" style={mobileNavLinkStyle}>Login</Link>
              <Link href="/auth/register" style={mobileNavLinkStyle}>Sign Up</Link>
            </div>
          )}
        </nav>
      </header>

      <main style={mainStyle}>
        {children}
      </main>

      <footer style={footerStyle}>
        <div className="container">
          <div style={footerContentStyle}>
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>🔧 HandyFix</h4>
              <p style={footerTextStyle}>Connect with trusted local service providers for all your home and office needs.</p>
              <div style={socialLinksStyle}>
                <a href="#" style={socialLinkStyle}>📘</a>
                <a href="#" style={socialLinkStyle}>📷</a>
                <a href="#" style={socialLinkStyle}>🐦</a>
                <a href="#" style={socialLinkStyle}>💼</a>
              </div>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Services</h4>
              <ul style={footerListStyle}>
                <li><Link href="/services/plumbing" style={footerLinkStyle}>Plumbing</Link></li>
                <li><Link href="/services/electrical" style={footerLinkStyle}>Electrical</Link></li>
                <li><Link href="/services/carpentry" style={footerLinkStyle}>Carpentry</Link></li>
                <li><Link href="/services/ac-repair" style={footerLinkStyle}>AC Repair</Link></li>
              </ul>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Company</h4>
              <ul style={footerListStyle}>
                <li><Link href="/about" style={footerLinkStyle}>About Us</Link></li>
                <li><Link href="/contact" style={footerLinkStyle}>Contact</Link></li>
                <li><Link href="/privacy" style={footerLinkStyle}>Privacy Policy</Link></li>
                <li><Link href="/terms" style={footerLinkStyle}>Terms of Service</Link></li>
              </ul>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Support</h4>
              <ul style={footerListStyle}>
                <li><Link href="/help" style={footerLinkStyle}>Help Center</Link></li>
                <li><Link href="/contact" style={footerLinkStyle}>Customer Support</Link></li>
                <li><a href="tel:+911234567890" style={footerLinkStyle}>📞 +91 12345 67890</a></li>
                <li><a href="mailto:support@handyfix.com" style={footerLinkStyle}>✉️ support@handyfix.com</a></li>
              </ul>
            </div>
          </div>
          
          <div style={footerBottomStyle}>
            <p>&copy; 2024 HandyFix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

// Enhanced Styles
const headerStyle = {
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  borderBottom: '1px solid #e9ecef'
}

const navStyle = {
  padding: '0'
}

const navContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 20px',
  minHeight: '48px'
}

const logoStyle = {
  fontSize: '28px',
  fontWeight: '800',
  textDecoration: 'none',
  background: 'linear-gradient(135deg, #007bff, #0056b3)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  transition: 'all 0.3s ease',
  padding: '8px 12px',
  borderRadius: '8px'
}

const desktopMenuStyle = {
  display: 'flex',
  gap: '12px',
  '@media (maxWidth: 768px)': {
    display: 'none'
  }
}

const navLinkStyle = {
  textDecoration: 'none',
  color: '#495057',
  fontWeight: '600',
  fontSize: '16px',
  padding: '6px 16px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  position: 'relative',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  whiteSpace: 'nowrap'
}

const rightSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}

const notificationContainerStyle = {
  position: 'relative'
}

const notificationBtnStyle = {
  position: 'relative',
  background: 'rgba(0, 123, 255, 0.1)',
  border: '2px solid rgba(0, 123, 255, 0.2)',
  borderRadius: '50%',
  width: '44px',
  height: '44px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease'
}

const notificationIconStyle = {
  fontSize: '20px',
  color: '#007bff'
}

const notificationBadgeStyle = {
  position: 'absolute',
  top: '-6px',
  right: '-6px',
  background: 'linear-gradient(135deg, #dc3545, #c82333)',
  color: 'white',
  borderRadius: '12px',
  padding: '2px 6px',
  fontSize: '10px',
  fontWeight: '700',
  minWidth: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'pulse 2s infinite'
}

const notificationDropdownStyle = {
  position: 'absolute',
  top: '100%',
  right: '0',
  width: '360px',
  maxHeight: '400px',
  background: 'white',
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  border: '1px solid #e9ecef',
  marginTop: '12px',
  overflow: 'hidden',
  zIndex: 1000
}

const notificationHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px 16px',
  borderBottom: '1px solid #f1f3f4'
}

const notificationTitleStyle = {
  margin: 0,
  fontSize: '18px',
  fontWeight: '700',
  color: '#2c3e50'
}

const markAllReadBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#007bff',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '4px',
  transition: 'background 0.3s ease'
}

const notificationListStyle = {
  maxHeight: '280px',
  overflowY: 'auto'
}

const emptyNotificationsStyle = {
  padding: '40px 20px',
  textAlign: 'center',
  color: '#6c757d'
}

const emptyIconStyle = {
  fontSize: '32px',
  marginBottom: '12px',
  display: 'block',
  opacity: '0.5'
}

const notificationItemStyle = {
  display: 'flex',
  gap: '12px',
  padding: '16px 24px',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
  borderBottom: '1px solid #f8f9fa',
  position: 'relative'
}

const readNotificationStyle = {
  background: 'transparent'
}

const unreadNotificationStyle = {
  background: 'rgba(0, 123, 255, 0.03)',
  borderLeft: '4px solid #007bff'
}

const notificationAvatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  flexShrink: 0
}

const notificationContentStyle = {
  flex: 1,
  minWidth: 0
}

const notificationItemTitleStyle = {
  fontWeight: '600',
  fontSize: '14px',
  color: '#2c3e50',
  marginBottom: '4px'
}

const notificationMessageStyle = {
  fontSize: '13px',
  color: '#6c757d',
  lineHeight: '1.4',
  marginBottom: '4px'
}

const notificationTimeStyle = {
  fontSize: '11px',
  color: '#adb5bd'
}

const unreadDotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#007bff',
  flexShrink: 0,
  marginTop: '6px'
}

const notificationFooterStyle = {
  padding: '16px 24px',
  borderTop: '1px solid #f1f3f4',
  textAlign: 'center',
  background: '#f8f9fa'
}

const viewAllLinkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '600'
}

const quickActionsStyle = {
  display: 'flex',
  gap: '8px'
}

const emergencyBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  background: 'rgba(220, 53, 69, 0.1)',
  border: '2px solid rgba(220, 53, 69, 0.2)',
  borderRadius: '50%',
  textDecoration: 'none',
  fontSize: '16px',
  transition: 'all 0.3s ease',
  animation: 'pulse 3s infinite'
}

const messagesBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  background: 'rgba(40, 167, 69, 0.1)',
  border: '2px solid rgba(40, 167, 69, 0.2)',
  borderRadius: '50%',
  textDecoration: 'none',
  fontSize: '16px',
  transition: 'all 0.3s ease'
}

const authLinksStyle = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center'
}

const loginBtnStyle = {
  fontSize: '14px',
  padding: '8px 16px',
  fontWeight: '600',
  borderRadius: '8px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(0, 123, 255, 0.3)',
  transition: 'all 0.3s ease'
}

const mobileMenuBtnStyle = {
  display: 'none',
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#495057',
  '@media (maxWidth: 768px)': {
    display: 'block'
  }
}

const mobileMenuStyle = {
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(20px)',
  padding: '24px',
  borderTop: '1px solid #e9ecef',
  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
  gap: '8px'
}

const mobileNavLinkStyle = {
  padding: '14px 20px',
  textDecoration: 'none',
  color: '#495057',
  fontWeight: '600',
  fontSize: '16px',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  background: 'rgba(248, 249, 250, 0.5)',
  border: '1px solid rgba(233, 236, 239, 0.3)'
}

const mobileNotificationStyle = {
  padding: '12px 0',
  color: '#007bff',
  fontWeight: '600',
  fontSize: '16px'
}

const mainStyle = {
  minHeight: 'calc(100vh - 200px)'
}

const footerStyle = {
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  color: 'white',
  marginTop: '80px'
}

const footerContentStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '40px',
  padding: '60px 0 40px'
}

const footerSectionStyle = {}

const footerHeadingStyle = {
  marginBottom: '20px',
  fontSize: '18px',
  fontWeight: '600'
}

const footerTextStyle = {
  color: '#bdc3c7',
  lineHeight: '1.6',
  marginBottom: '20px'
}

const socialLinksStyle = {
  display: 'flex',
  gap: '12px'
}

const socialLinkStyle = {
  display: 'inline-block',
  width: '36px',
  height: '36px',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '50%',
  textAlign: 'center',
  lineHeight: '36px',
  textDecoration: 'none',
  fontSize: '18px',
  transition: 'all 0.3s ease'
}

const footerListStyle = {
  listStyle: 'none'
}

const footerLinkStyle = {
  color: '#bdc3c7',
  textDecoration: 'none',
  lineHeight: '2',
  transition: 'color 0.3s ease'
}

const footerBottomStyle = {
  borderTop: '1px solid #34495e',
  paddingTop: '30px',
  paddingBottom: '30px',
  textAlign: 'center',
  color: '#bdc3c7'
}

// Add CSS animations (client-side only)
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  const animations = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }
  `

  try {
    // Only add animation styles if not already present
    if (!document.querySelector('style[data-pulse-animation]')) {
      const style = document.createElement('style')
      style.setAttribute('data-pulse-animation', 'true')
      style.textContent = animations
      if (document.head) {
        document.head.appendChild(style)
      }
    }
  } catch (error) {
    console.warn('Animation style injection error:', error)
  }
}
