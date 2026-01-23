import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { useRouter } from 'next/router'
import styles from '../styles/layout.module.css'

export default function Layout({ children, title = 'HandyFix - Find Trusted Service Providers' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { getCartCount } = useCart()
  const { user, logout } = useUser()
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

      <header className={styles.navbar}>
        <nav className={styles.navContainer}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            🔧 HandyFix
          </Link>

          {/* Desktop Navigation Links */}
          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/services" className={styles.navLink}>Services</Link>
            <Link href="/providers" className={styles.navLink}>Providers</Link>
            <Link href="/about" className={styles.navLink}>About</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
          </div>

          {/* Right Section - Icons & Buttons */}
          <div className={styles.rightSection}>
            {/* Notification Dropdown */}
            <div className={styles.notificationContainer}>
              <button
                className={styles.iconBtn}
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                aria-label="Notifications"
              >
                🔔
                {unreadCount > 0 && (
                  <span className={styles.badge}>{unreadCount > 9 ? '9+' : unreadCount}</span>
                )}
              </button>

              {isNotificationOpen && (
                <div className={styles.notificationDropdown}>
                  <div className={styles.notificationHeader}>
                    <h3 className={styles.notificationTitle}>Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        className={styles.markReadBtn}
                        onClick={markAllAsRead}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className={styles.notificationList}>
                    {notifications.length === 0 ? (
                      <div className={styles.emptyNotifications}>
                        <span className={styles.emptyIcon}>🔔</span>
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className={styles.notificationAvatar}>{notification.avatar}</div>
                          <div className={styles.notificationContent}>
                            <div className={styles.notificationItemTitle}>{notification.title}</div>
                            <div className={styles.notificationMessage}>{notification.message}</div>
                            <div className={styles.notificationTime}>{notification.time}</div>
                          </div>
                          {!notification.read && <div className={styles.unreadDot}></div>}
                        </div>
                      ))
                    )}
                  </div>

                  <div className={styles.notificationFooter}>
                    <Link href="/notifications" className={styles.viewAllLink}>
                      View All Notifications →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <button
              className={styles.iconBtn}
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
                <span className={styles.badge}>{cartCount > 9 ? '9+' : cartCount}</span>
              )}
            </button>

            {/* Profile Icon / User Menu */}
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  className={styles.iconBtn}
                  title="Profile"
                  aria-label="Profile"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  style={{ fontSize: '18px', fontWeight: 'bold' }}
                >
                  👤
                </button>

                {isProfileOpen && (
                  <div className={styles.notificationDropdown} style={{ width: '200px', right: 0 }}>
                    <div className={styles.notificationHeader} style={{ borderBottom: 'none', paddingBottom: '12px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111111' }}>
                        {user.name || user.email}
                      </h3>
                      <p style={{ fontSize: '12px', color: '#888888', margin: '4px 0 0 0' }}>
                        {user.userType === 'provider' ? 'Service Provider' : 'Customer'}
                      </p>
                    </div>

                    <div style={{ padding: '12px 0', borderTop: '1px solid #E8EAED' }}>
                      {user.userType === 'customer' && (
                        <Link href="/dashboard/user" className={styles.notificationItem} style={{ display: 'block', padding: '12px 16px', textDecoration: 'none', color: '#555555' }}>
                          📊 My Dashboard
                        </Link>
                      )}
                      {user.userType === 'provider' && (
                        <Link href="/dashboard/provider" className={styles.notificationItem} style={{ display: 'block', padding: '12px 16px', textDecoration: 'none', color: '#555555' }}>
                          📊 Provider Dashboard
                        </Link>
                      )}
                      <Link href="/dashboard/user" className={styles.notificationItem} style={{ display: 'block', padding: '12px 16px', textDecoration: 'none', color: '#555555' }}>
                        ⚙️ Account Settings
                      </Link>
                    </div>

                    <div style={{ padding: '8px 0', borderTop: '1px solid #E8EAED' }}>
                      <button
                        onClick={() => {
                          logout()
                          setIsProfileOpen(false)
                          router.push('/')
                        }}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          color: '#DC3545',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        🚪 Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.authLinksContainer}>
                <Link href="/auth/login" className={styles.loginBtn}>Log In</Link>
                <Link href="/auth/register" className={styles.signUpBtn}>Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <Link href="/" className={styles.mobileNavLink}>Home</Link>
            <Link href="/services" className={styles.mobileNavLink}>Services</Link>
            <Link href="/providers" className={styles.mobileNavLink}>Providers</Link>
            <Link href="/about" className={styles.mobileNavLink}>About</Link>
            <Link href="/contact" className={styles.mobileNavLink}>Contact</Link>
            <div className={styles.mobileDivider}></div>
            <button className={`${styles.mobileNavLink} ${styles.iconBtn}`} title="Notifications">🔔 Notifications</button>
            <button className={`${styles.mobileNavLink} ${styles.iconBtn}`} title="Cart">🛒 Cart</button>
            <div className={styles.mobileDivider}></div>
            {user ? (
              <>
                <div style={{ padding: '12px 16px', color: '#111111', fontWeight: '600' }}>
                  {user.name || user.email}
                </div>
                {user.userType === 'customer' && (
                  <Link href="/dashboard/user" className={styles.mobileNavLink}>📊 My Dashboard</Link>
                )}
                {user.userType === 'provider' && (
                  <Link href="/dashboard/provider" className={styles.mobileNavLink}>📊 Provider Dashboard</Link>
                )}
                <Link href="/dashboard/user" className={styles.mobileNavLink}>⚙️ Account Settings</Link>
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                    router.push('/')
                  }}
                  className={styles.mobileNavLink}
                  style={{ color: '#DC3545' }}
                >
                  🚪 Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className={styles.mobileNavLink}>Log In</Link>
                <Link href="/auth/register" className={styles.mobileSignUp}>Sign Up</Link>
              </>
            )}
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
