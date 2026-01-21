import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { useRouter } from 'next/router'

export default function Layout({ children, title = 'HandyFix - Find Trusted Service Providers' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const { getCartCount } = useCart()
  const { user } = useUser()
  const router = useRouter()
  const cartCount = getCartCount()

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'booking',
        title: 'New Booking Request',
        message: 'You have a new service request',
        time: '2 min ago',
        read: false,
        avatar: '📋'
      },
      {
        id: 2,
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment processed successfully',
        time: '1 hour ago',
        read: false,
        avatar: '💰'
      },
      {
        id: 3,
        type: 'review',
        title: 'New Review',
        message: 'You received a 5-star review',
        time: '3 hours ago',
        read: true,
        avatar: '⭐'
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

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Find trusted plumbers, carpenters & electricians in your city" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={headerStyle}>
        <nav style={navContainerStyle} className="container">
          <Link href="/" style={logoStyle}>
            🔧 HandyFix
          </Link>
          
          <div style={desktopMenuStyle}>
            <Link href="/" style={navLinkStyle}>Home</Link>
            <Link href="/services" style={navLinkStyle}>Services</Link>
            <Link href="/providers" style={navLinkStyle}>Providers</Link>
            <Link href="/about" style={navLinkStyle}>About</Link>
            <Link href="/contact" style={navLinkStyle}>Contact</Link>
          </div>

          <div style={rightSectionStyle}>
            {/* Notification Dropdown */}
            <div style={notificationContainerStyle}>
              <button 
                style={notificationBtnStyle}
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                aria-label="Notifications"
              >
                🔔
                {unreadCount > 0 && (
                  <span style={notificationBadgeStyle}>{unreadCount > 9 ? '9+' : unreadCount}</span>
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
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          style={{
                            ...notificationItemStyle,
                            ...(notification.read ? {} : unreadNotificationStyle)
                          }}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div style={notificationAvatarStyle}>{notification.avatar}</div>
                          <div style={notificationContentStyle}>
                            <div style={notificationItemTitleStyle}>{notification.title}</div>
                            <div style={notificationMessageStyle}>{notification.message}</div>
                            <div style={notificationTimeStyle}>{notification.time}</div>
                          </div>
                          {!notification.read && <div style={unreadDotStyle}></div>}
                        </div>
                      ))
                    )}
                  </div>

                  <div style={notificationFooterStyle}>
                    <Link href="/notifications" style={viewAllLinkStyle}>
                      View All Notifications →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <button
              style={cartBtnStyle}
              onClick={() => {
                if (!user) {
                  router.push(`/auth/login?redirect=${encodeURIComponent('/cart')}`)
                } else {
                  router.push('/cart')
                }
              }}
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              🛒
              {cartCount > 0 && (
                <span style={cartBadgeStyle}>{cartCount > 9 ? '9+' : cartCount}</span>
              )}
            </button>

            {/* Emergency Button */}
            <Link href="/emergency" style={emergencyBtnStyle} title="Emergency Services">
              🚨
            </Link>

            {/* Auth Links */}
            <div style={authLinksStyle}>
              <Link href="/auth/login" style={loginBtnStyle}>Log In</Link>
              <Link href="/auth/register" style={signUpBtnStyle}>Sign Up</Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            style={mobileMenuBtnStyle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div style={mobileMenuStyle}>
            <Link href="/" style={mobileNavLinkStyle}>Home</Link>
            <Link href="/services" style={mobileNavLinkStyle}>Services</Link>
            <Link href="/providers" style={mobileNavLinkStyle}>Providers</Link>
            <Link href="/about" style={mobileNavLinkStyle}>About</Link>
            <Link href="/contact" style={mobileNavLinkStyle}>Contact</Link>
            <div style={mobileDividerStyle}></div>
            <Link href="/emergency" style={mobileNavLinkStyle}>🚨 Emergency Services</Link>
            <div style={mobileDividerStyle}></div>
            <Link href="/auth/login" style={mobileNavLinkStyle}>Log In</Link>
            <Link href="/auth/register" style={mobileSignUpStyle}>Sign Up</Link>
          </div>
        )}
      </header>

      <main style={mainStyle}>
        {children}
      </main>

      <footer style={footerStyle}>
        <div className="container">
          <div style={footerContentStyle}>
            <div style={footerSectionStyle}>
              <h3 style={footerHeadingStyle}>🔧 HandyFix</h3>
              <p style={footerTextStyle}>
                Connect with trusted, verified service providers for all your home and office needs.
              </p>
              <div style={socialLinksStyle}>
                <a href="#" style={socialLinkStyle} title="Facebook">f</a>
                <a href="#" style={socialLinkStyle} title="Instagram">📷</a>
                <a href="#" style={socialLinkStyle} title="Twitter">𝕏</a>
                <a href="#" style={socialLinkStyle} title="LinkedIn">in</a>
              </div>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Services</h4>
              <ul style={footerListStyle}>
                <li><Link href="/services/plumbing" style={footerLinkStyle}>Plumbing</Link></li>
                <li><Link href="/services/electrical" style={footerLinkStyle}>Electrical</Link></li>
                <li><Link href="/services/carpentry" style={footerLinkStyle}>Carpentry</Link></li>
                <li><Link href="/services/ac-repair" style={footerLinkStyle}>AC Repair</Link></li>
                <li><Link href="/services/cleaning" style={footerLinkStyle}>Cleaning</Link></li>
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
                <li><Link href="/contact" style={footerLinkStyle}>Get Support</Link></li>
                <li><a href="tel:+911234567890" style={footerLinkStyle}>📞 +91-1234-567890</a></li>
                <li><a href="mailto:support@handyfix.com" style={footerLinkStyle}>✉️ support@handyfix.com</a></li>
              </ul>
            </div>
          </div>
          
          <div style={footerBottomStyle}>
            <p>&copy; 2024 HandyFix. All rights reserved. | Trusted by thousands of Indians</p>
          </div>
        </div>
      </footer>
    </>
  )
}

/* ==================== NAVBAR STYLES ==================== */
const headerStyle = {
  background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
  borderBottom: '1px solid #E8EAED',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.95)'
}

const navContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 0',
  minHeight: '56px',
  gap: '20px'
}

const logoStyle = {
  fontSize: '22px',
  fontWeight: '800',
  color: '#0A66FF',
  textDecoration: 'none',
  padding: '8px 16px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'linear-gradient(135deg, #0A66FF 0%, #0052CC 100%)',
  color: 'white',
  borderRadius: '10px',
  boxShadow: '0 4px 15px rgba(10, 102, 255, 0.3)'
}

const logoStyle_hover = {
  transform: 'scale(1.05)',
  boxShadow: '0 6px 20px rgba(10, 102, 255, 0.4)'
}

const desktopMenuStyle = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center'
}

const navLinkStyle = {
  color: '#555555',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '14px',
  padding: '8px 14px',
  borderRadius: '6px',
  transition: 'all 0.2s ease',
  position: 'relative',
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
  background: 'transparent',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  padding: '8px',
  position: 'relative',
  transition: 'transform 0.2s ease'
}

const notificationBadgeStyle = {
  position: 'absolute',
  top: '0px',
  right: '0px',
  background: '#DC3545',
  color: 'white',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '10px',
  fontWeight: '700'
}

const notificationDropdownStyle = {
  position: 'absolute',
  top: '100%',
  right: '0',
  width: '360px',
  maxHeight: '420px',
  background: 'white',
  borderRadius: '12px',
  border: '1px solid #E8EAED',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
  marginTop: '8px',
  overflow: 'hidden',
  zIndex: 1000
}

const notificationHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
  borderBottom: '1px solid #E8EAED'
}

const notificationTitleStyle = {
  margin: 0,
  fontSize: '16px',
  fontWeight: '700',
  color: '#111111'
}

const markAllReadBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#0A66FF',
  fontSize: '12px',
  fontWeight: '600',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '4px',
  transition: 'background 0.2s ease'
}

const notificationListStyle = {
  maxHeight: '280px',
  overflowY: 'auto'
}

const emptyNotificationsStyle = {
  padding: '40px 20px',
  textAlign: 'center',
  color: '#888888'
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
  padding: '14px 16px',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
  borderBottom: '1px solid #F7F9FC',
  position: 'relative'
}

const unreadNotificationStyle = {
  background: '#E8F3FF'
}

const notificationAvatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: '#F7F9FC',
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
  fontSize: '13px',
  color: '#111111',
  marginBottom: '2px'
}

const notificationMessageStyle = {
  fontSize: '12px',
  color: '#555555',
  lineHeight: '1.4',
  marginBottom: '4px'
}

const notificationTimeStyle = {
  fontSize: '11px',
  color: '#888888'
}

const unreadDotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#0A66FF',
  flexShrink: 0,
  marginTop: '6px'
}

const notificationFooterStyle = {
  padding: '12px 16px',
  borderTop: '1px solid #E8EAED',
  textAlign: 'center',
  background: '#F7F9FC'
}

const viewAllLinkStyle = {
  color: '#0A66FF',
  textDecoration: 'none',
  fontSize: '13px',
  fontWeight: '600',
  transition: 'color 0.2s ease'
}

const cartBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  background: 'transparent',
  border: 'none',
  borderRadius: '50%',
  fontSize: '18px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  position: 'relative',
  padding: '0'
}

const cartBadgeStyle = {
  position: 'absolute',
  top: '-4px',
  right: '-4px',
  background: '#DC3545',
  color: 'white',
  borderRadius: '50%',
  width: '22px',
  height: '22px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
  fontWeight: '700',
  minWidth: '22px'
}

const emergencyBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  background: 'rgba(220, 53, 69, 0.1)',
  border: 'none',
  borderRadius: '50%',
  fontSize: '16px',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  animation: 'pulse 2s infinite'
}

const authLinksStyle = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  paddingLeft: '12px',
  borderLeft: '1px solid #E8EAED'
}

const loginBtnStyle = {
  color: '#0A66FF',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '14px',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap'
}

const signUpBtnStyle = {
  background: '#0A66FF',
  color: 'white',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '14px',
  padding: '10px 20px',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  display: 'inline-block',
  whiteSpace: 'nowrap'
}

const mobileMenuBtnStyle = {
  display: 'none',
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#555555',
  padding: '8px',
  transition: 'color 0.2s ease'
}

const mobileMenuStyle = {
  display: 'none',
  flexDirection: 'column',
  background: 'white',
  padding: '16px 20px',
  borderTop: '1px solid #E8EAED'
}

const mobileNavLinkStyle = {
  padding: '12px 0',
  textDecoration: 'none',
  color: '#555555',
  fontWeight: '500',
  fontSize: '15px',
  transition: 'color 0.2s ease',
  display: 'block'
}

const mobileSignUpStyle = {
  padding: '12px 0',
  textDecoration: 'none',
  color: '#0A66FF',
  fontWeight: '600',
  fontSize: '15px',
  transition: 'color 0.2s ease',
  display: 'block'
}

const mobileDividerStyle = {
  height: '1px',
  background: '#E8EAED',
  margin: '12px 0'
}

const mainStyle = {
  minHeight: 'calc(100vh - 300px)'
}

/* ==================== FOOTER STYLES ==================== */
const footerStyle = {
  background: '#FFFFFF',
  borderTop: '1px solid #E8EAED',
  marginTop: '80px',
  color: '#555555'
}

const footerContentStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '48px',
  padding: '60px 0 40px'
}

const footerSectionStyle = {
  animation: 'fadeInUp 0.6s ease-out'
}

const footerHeadingStyle = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#111111',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '16px'
}

const footerTextStyle = {
  fontSize: '14px',
  color: '#555555',
  lineHeight: '1.6',
  marginBottom: '16px'
}

const socialLinksStyle = {
  display: 'flex',
  gap: '12px'
}

const socialLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  background: '#F7F9FC',
  borderRadius: '50%',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '600',
  color: '#0A66FF',
  transition: 'all 0.2s ease'
}

const footerListStyle = {
  listStyle: 'none'
}

const footerLinkStyle = {
  color: '#555555',
  textDecoration: 'none',
  lineHeight: '2',
  fontSize: '13px',
  transition: 'color 0.2s ease',
  display: 'block'
}

const footerBottomStyle = {
  borderTop: '1px solid #E8EAED',
  paddingTop: '24px',
  paddingBottom: '24px',
  textAlign: 'center',
  color: '#888888',
  fontSize: '13px'
}

/* Mobile Menu Styles */
if (typeof window !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @media (max-width: 768px) {
      ${desktopMenuStyle}::style {
        display: none !important;
      }
    }
  `
}
