import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { useUser } from '../../context/UserContext'
import { useRouter } from 'next/router'

export default function CustomerDashboard() {
  const { user, loading, logout } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [bookings, setBookings] = useState([])
  const [savedProviders, setSavedProviders] = useState([])
  const [bookingStatusFilter, setBookingStatusFilter] = useState('all')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  // Mock bookings data
  const mockBookings = [
    {
      id: 'HF123456',
      service: 'Plumbing',
      provider: 'Rajesh Kumar',
      status: 'completed',
      date: '2024-01-15',
      time: '10:00 AM',
      amount: '₹500',
      rating: 5,
      review: 'Excellent service!',
      address: 'Sector 7, Gurugram'
    },
    {
      id: 'HF123457',
      service: 'Electrical',
      provider: 'Amit Sharma',
      status: 'pending',
      date: '2024-01-20',
      time: '02:00 PM',
      amount: '₹600',
      rating: null,
      review: null,
      address: 'DLF Phase 3, Gurugram'
    },
    {
      id: 'HF123458',
      service: 'Carpentry',
      provider: 'Vikram Patel',
      status: 'in-progress',
      date: '2024-01-18',
      time: '11:00 AM',
      amount: '₹800',
      rating: null,
      review: null,
      address: 'Sector 46, Gurugram'
    },
    {
      id: 'HF123459',
      service: 'Cleaning',
      provider: 'Priya Singh',
      status: 'cancelled',
      date: '2024-01-10',
      time: '03:00 PM',
      amount: '₹300',
      rating: null,
      review: null,
      address: 'Sector 12, Gurugram'
    }
  ]

  const mockSavedProviders = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      service: 'Plumbing',
      rating: 4.8,
      jobs: 245,
      image: '👨‍🔧'
    },
    {
      id: 2,
      name: 'Priya Singh',
      service: 'Cleaning',
      rating: 4.7,
      jobs: 189,
      image: '👩‍💼'
    }
  ]

  useEffect(() => {
    setBookings(mockBookings)
    setSavedProviders(mockSavedProviders)
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }

  // Filter bookings based on status
  const getFilteredBookings = () => {
    if (bookingStatusFilter === 'all') {
      return bookings
    }
    return bookings.filter(booking => booking.status === bookingStatusFilter)
  }

  // Get status icon and color
  const getStatusDetails = (status) => {
    switch (status) {
      case 'completed':
        return { icon: '✅', color: '#00B894', label: 'Completed' }
      case 'pending':
        return { icon: '⏳', color: '#FFA500', label: 'Pending' }
      case 'in-progress':
        return { icon: '🔄', color: '#0A66FF', label: 'In Progress' }
      case 'cancelled':
        return { icon: '❌', color: '#DC3545', label: 'Cancelled' }
      default:
        return { icon: '❓', color: '#888888', label: 'Unknown' }
    }
  }

  const filteredBookings = getFilteredBookings()

  if (loading || !user) {
    return (
      <Layout title="Dashboard">
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <p>Loading dashboard...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Customer Dashboard - HandyFix">
      <div style={dashboardContainerStyle}>
        {/* Sidebar */}
        <div style={sidebarStyle}>
          <div style={profileSectionStyle}>
            <div style={profileAvatarStyle}>
              👤
            </div>
            <div>
              <h3 style={profileNameStyle}>{user.name}</h3>
              <p style={profileEmailStyle}>{user.email}</p>
              <span style={profileBadgeStyle}>Customer</span>
            </div>
          </div>

          <nav style={navStyle}>
            {[
              { id: 'overview', icon: '📊', label: 'Overview' },
              { id: 'bookings', icon: '📅', label: 'My Bookings' },
              { id: 'saved', icon: '❤️', label: 'Saved Providers' },
              { id: 'profile', icon: '⚙️', label: 'Profile Settings' },
              { id: 'payments', icon: '💳', label: 'Payment Methods' },
              { id: 'support', icon: '💬', label: 'Support' }
            ].map(item => (
              <button
                key={item.id}
                style={{
                  ...navItemStyle,
                  ...(activeTab === item.id ? activeNavItemStyle : {})
                }}
                onClick={() => setActiveTab(item.id)}
              >
                <span style={navIconStyle}>{item.icon}</span>
                {item.label}
              </button>
            ))}

            <button
              style={logoutBtnStyle}
              onClick={handleLogout}
            >
              <span style={navIconStyle}>🚪</span>
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div style={mainContentStyle}>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div style={headerStyle}>
                <h1 style={titleStyle}>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
                <p style={subtitleStyle}>Here's your dashboard overview</p>
              </div>

              {/* Stats Cards */}
              <div style={statsGridStyle}>
                <div style={statCardStyle}>
                  <div style={statIconStyle}>📅</div>
                  <h3 style={statLabelStyle}>Total Bookings</h3>
                  <p style={statValueStyle}>12</p>
                  <p style={statSubtextStyle}>Across all services</p>
                </div>
                <div style={statCardStyle}>
                  <div style={statIconStyle}>✅</div>
                  <h3 style={statLabelStyle}>Completed</h3>
                  <p style={statValueStyle}>10</p>
                  <p style={statSubtextStyle}>Successfully completed</p>
                </div>
                <div style={statCardStyle}>
                  <div style={statIconStyle}>⭐</div>
                  <h3 style={statLabelStyle}>Avg Rating</h3>
                  <p style={statValueStyle}>4.8</p>
                  <p style={statSubtextStyle}>From providers</p>
                </div>
                <div style={statCardStyle}>
                  <div style={statIconStyle}>💰</div>
                  <h3 style={statLabelStyle}>Total Spent</h3>
                  <p style={statValueStyle}>₹8,500</p>
                  <p style={statSubtextStyle}>On services</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={quickActionsStyle}>
                <h2 style={sectionTitleStyle}>Quick Actions</h2>
                <div style={quickActionBtnsStyle}>
                  <Link href="/services" style={quickActionBtnStyle}>
                    <span style={quickActionIconStyle}>🔍</span>
                    <div>
                      <div style={quickActionLabelStyle}>Find Service</div>
                      <div style={quickActionDescStyle}>Browse providers</div>
                    </div>
                  </Link>
                  <button style={quickActionBtnStyle} onClick={() => setActiveTab('bookings')}>
                    <span style={quickActionIconStyle}>📅</span>
                    <div>
                      <div style={quickActionLabelStyle}>My Bookings</div>
                      <div style={quickActionDescStyle}>View all bookings</div>
                    </div>
                  </button>
                  <button style={quickActionBtnStyle} onClick={() => setActiveTab('saved')}>
                    <span style={quickActionIconStyle}>❤️</span>
                    <div>
                      <div style={quickActionLabelStyle}>Saved</div>
                      <div style={quickActionDescStyle}>Favorite providers</div>
                    </div>
                  </button>
                  <button style={quickActionBtnStyle} onClick={() => setActiveTab('profile')}>
                    <span style={quickActionIconStyle}>⚙️</span>
                    <div>
                      <div style={quickActionLabelStyle}>Settings</div>
                      <div style={quickActionDescStyle}>Account settings</div>
                    </div>
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '60px' }}>
                <h2 style={sectionTitleStyle}>Recent Bookings</h2>
                {bookings.slice(0, 3).map(booking => (
                  <div key={booking.id} style={bookingCardStyle}>
                    <div style={bookingHeaderStyle}>
                      <div>
                        <h3 style={bookingServiceStyle}>{booking.service}</h3>
                        <p style={bookingProviderStyle}>Provider: {booking.provider}</p>
                      </div>
                      <span style={{
                        ...statusBadgeStyle,
                        ...(booking.status === 'completed' ? completedStatusStyle : pendingStatusStyle)
                      }}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div style={bookingDetailsStyle}>
                      <span>📅 {booking.date}</span>
                      <span>🕐 {booking.time}</span>
                      <span>💰 {booking.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              <div style={headerStyle}>
                <h1 style={titleStyle}>My Bookings</h1>
                <Link href="/services" className="btn btn-primary">
                  + New Booking
                </Link>
              </div>

              {/* Filters */}
              <div style={filterContainerStyle}>
                {['all', 'pending', 'in-progress', 'completed', 'cancelled'].map(status => (
                  <button
                    key={status}
                    style={{
                      ...filterBtnStyle,
                      ...(bookingStatusFilter === status ? activeFilterBtnStyle : {})
                    }}
                    onClick={() => setBookingStatusFilter(status)}
                  >
                    {status === 'all' ? '📋 All Bookings' : `${getStatusDetails(status).icon} ${getStatusDetails(status).label}`}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '40px' }}>
                {filteredBookings.length === 0 ? (
                  <div style={emptyStateStyle}>
                    <div style={emptyIconStyle}>📭</div>
                    <h3 style={emptyTitleStyle}>No {bookingStatusFilter === 'all' ? '' : bookingStatusFilter} bookings</h3>
                    <p style={emptyMessageStyle}>
                      {bookingStatusFilter === 'all'
                        ? "You don't have any bookings yet. Start by booking a service!"
                        : `You don't have any ${bookingStatusFilter} bookings.`}
                    </p>
                    <Link href="/services" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
                      Browse Services
                    </Link>
                  </div>
                ) : (
                  filteredBookings.map(booking => {
                    const statusDetails = getStatusDetails(booking.status)
                    return (
                      <div key={booking.id} style={bookingDetailCardStyle}>
                        <div style={bookingDetailHeaderStyle}>
                          <div>
                            <h3 style={bookingServiceStyle}>{booking.service}</h3>
                            <p style={bookingBookingIdStyle}>Booking ID: {booking.id}</p>
                          </div>
                          <span style={{
                            ...statusBadgeStyle,
                            background: statusDetails.color
                          }}>
                            {statusDetails.icon} {statusDetails.label}
                          </span>
                        </div>

                        <div style={bookingInfoGridStyle}>
                          <div>
                            <p style={bookingInfoLabelStyle}>Provider</p>
                            <p style={bookingInfoValueStyle}>{booking.provider}</p>
                          </div>
                          <div>
                            <p style={bookingInfoLabelStyle}>Date & Time</p>
                            <p style={bookingInfoValueStyle}>{booking.date} at {booking.time}</p>
                          </div>
                          <div>
                            <p style={bookingInfoLabelStyle}>Amount</p>
                            <p style={bookingInfoValueStyle}>{booking.amount}</p>
                          </div>
                        </div>

                        {booking.status === 'completed' && (
                          <div style={reviewSectionStyle}>
                            <p style={reviewLabelStyle}>Rating: {booking.rating}/5 ⭐</p>
                            <p style={reviewTextStyle}>"{booking.review}"</p>
                          </div>
                        )}

                        <div style={actionButtonsStyle}>
                          <button style={primaryActionStyle}>View Details</button>
                          {booking.status === 'pending' && (
                            <>
                              <button style={secondaryActionStyle}>Reschedule</button>
                              <button style={cancelActionStyle}>Cancel</button>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )}

          {/* Saved Providers Tab */}
          {activeTab === 'saved' && (
            <div>
              <div style={headerStyle}>
                <h1 style={titleStyle}>Saved Providers</h1>
              </div>

              <div className="grid grid-2" style={{ marginTop: '40px' }}>
                {savedProviders.map(provider => (
                  <div key={provider.id} style={providerCardStyle}>
                    <div style={providerHeaderStyle}>
                      <div style={providerImageStyle}>
                        {provider.image}
                      </div>
                      <div>
                        <h3 style={providerNameStyle}>{provider.name}</h3>
                        <p style={providerServiceStyle}>{provider.service}</p>
                      </div>
                    </div>
                    <div style={providerStatsStyle}>
                      <span>⭐ {provider.rating}</span>
                      <span>🎯 {provider.jobs} jobs</span>
                    </div>
                    <div style={providerActionsStyle}>
                      <button style={primaryActionStyle}>Book Now</button>
                      <button style={secondaryActionStyle}>View Profile</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Settings Tab */}
          {activeTab === 'profile' && (
            <div>
              <div style={headerStyle}>
                <h1 style={titleStyle}>Profile Settings</h1>
              </div>

              <div style={formCardStyle}>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" defaultValue={user.name} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" defaultValue={user.email} disabled />
                  </div>
                </div>

                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" defaultValue={user.phone} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input type="text" className="form-input" defaultValue={user.city} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Address</label>
                  <textarea className="form-input" rows="3" defaultValue={user.address}></textarea>
                </div>

                <div style={preferencesStyle}>
                  <h3 style={preferencesLabelStyle}>Notification Preferences</h3>
                  <label style={checkboxLabelStyle}>
                    <input type="checkbox" defaultChecked />
                    Email Notifications
                  </label>
                  <label style={checkboxLabelStyle}>
                    <input type="checkbox" defaultChecked />
                    SMS Notifications
                  </label>
                  <label style={checkboxLabelStyle}>
                    <input type="checkbox" defaultChecked />
                    Push Notifications
                  </label>
                </div>

                <button className="btn btn-primary" style={{ marginTop: '24px' }}>
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

// Styles
const dashboardContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '250px 1fr',
  minHeight: 'calc(100vh - 60px)',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
}

const sidebarStyle = {
  background: 'white',
  borderRight: '1px solid #e0e0e0',
  padding: '24px',
  height: '100vh',
  overflowY: 'auto',
  position: 'sticky',
  top: '60px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
}

const profileSectionStyle = {
  display: 'flex',
  gap: '16px',
  marginBottom: '32px',
  padding: '16px',
  background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eef9 100%)',
  borderRadius: '12px'
}

const profileAvatarStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #007bff, #0056b3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  color: 'white'
}

const profileNameStyle = {
  margin: '0',
  fontSize: '16px',
  fontWeight: '600',
  color: '#1a1a1a'
}

const profileEmailStyle = {
  margin: '0',
  fontSize: '12px',
  color: '#7f8c8d'
}

const profileBadgeStyle = {
  display: 'inline-block',
  padding: '4px 12px',
  background: '#e8f4fd',
  color: '#0056b3',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: '600',
  marginTop: '4px'
}

const navStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}

const navItemStyle = {
  width: '100%',
  padding: '12px 16px',
  background: 'transparent',
  border: 'none',
  borderRadius: '8px',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  color: '#495057',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}

const activeNavItemStyle = {
  background: 'linear-gradient(135deg, #007bff, #0056b3)',
  color: 'white'
}

const navIconStyle = {
  fontSize: '16px'
}

const logoutBtnStyle = {
  ...navItemStyle,
  marginTop: '24px',
  borderTop: '1px solid #e0e0e0',
  paddingTop: '20px',
  color: '#dc3545'
}

const mainContentStyle = {
  padding: '40px',
  overflowY: 'auto',
  height: '100vh'
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '40px'
}

const titleStyle = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#1a1a1a',
  margin: '0'
}

const subtitleStyle = {
  color: '#7f8c8d',
  fontSize: '14px',
  margin: '0'
}

const statCardStyle = {
  background: 'white',
  padding: '24px',
  borderRadius: '12px',
  textAlign: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  border: '1px solid #e0e0e0'
}

const statIconStyle = {
  fontSize: '32px',
  marginBottom: '12px',
  display: 'block'
}

const statLabelStyle = {
  margin: '0',
  fontSize: '14px',
  color: '#7f8c8d',
  fontWeight: '500'
}

const statValueStyle = {
  margin: '8px 0 0',
  fontSize: '28px',
  fontWeight: '700',
  color: '#007bff'
}

const sectionTitleStyle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#1a1a1a',
  marginBottom: '20px'
}

const bookingCardStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '12px',
  marginBottom: '16px',
  border: '1px solid #e0e0e0',
  transition: 'all 0.3s ease'
}

const bookingHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '16px'
}

const bookingServiceStyle = {
  margin: '0',
  fontSize: '18px',
  fontWeight: '600',
  color: '#1a1a1a'
}

const bookingProviderStyle = {
  margin: '4px 0 0',
  fontSize: '14px',
  color: '#7f8c8d'
}

const statusBadgeStyle = {
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'capitalize'
}

const completedStatusStyle = {
  background: '#d4edda',
  color: '#155724'
}

const pendingStatusStyle = {
  background: '#fff3cd',
  color: '#856404'
}

const bookingDetailsStyle = {
  display: 'flex',
  gap: '24px',
  fontSize: '14px',
  color: '#495057'
}

const bookingDetailCardStyle = {
  background: 'white',
  padding: '24px',
  borderRadius: '12px',
  marginBottom: '20px',
  border: '1px solid #e0e0e0'
}

const bookingDetailHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '24px',
  paddingBottom: '20px',
  borderBottom: '1px solid #e0e0e0'
}

const bookingBookingIdStyle = {
  margin: '4px 0 0',
  fontSize: '12px',
  color: '#7f8c8d'
}

const bookingInfoGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '24px',
  marginBottom: '24px'
}

const bookingInfoLabelStyle = {
  margin: '0',
  fontSize: '12px',
  color: '#7f8c8d',
  textTransform: 'uppercase'
}

const bookingInfoValueStyle = {
  margin: '4px 0 0',
  fontSize: '16px',
  fontWeight: '600',
  color: '#2c3e50'
}

const reviewSectionStyle = {
  background: '#f0f8ff',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '24px',
  borderLeft: '4px solid #007bff'
}

const reviewLabelStyle = {
  margin: '0',
  fontSize: '14px',
  fontWeight: '600',
  color: '#2c3e50'
}

const reviewTextStyle = {
  margin: '8px 0 0',
  fontSize: '14px',
  color: '#495057',
  fontStyle: 'italic'
}

const actionButtonsStyle = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap'
}

const primaryActionStyle = {
  padding: '10px 20px',
  background: 'linear-gradient(135deg, #007bff, #0056b3)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '14px',
  transition: 'all 0.3s ease'
}

const secondaryActionStyle = {
  padding: '10px 20px',
  background: '#e8f4fd',
  color: '#007bff',
  border: '1px solid #007bff',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '14px',
  transition: 'all 0.3s ease'
}

const cancelActionStyle = {
  padding: '10px 20px',
  background: '#ffe0e0',
  color: '#dc3545',
  border: '1px solid #dc3545',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '14px',
  transition: 'all 0.3s ease'
}

const providerCardStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '12px',
  border: '1px solid #e0e0e0',
  transition: 'all 0.3s ease'
}

const providerHeaderStyle = {
  display: 'flex',
  gap: '16px',
  marginBottom: '16px',
  alignItems: 'center'
}

const providerImageStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #f0f4ff, #e8eef9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px'
}

const providerNameStyle = {
  margin: '0',
  fontSize: '16px',
  fontWeight: '600',
  color: '#2c3e50'
}

const providerServiceStyle = {
  margin: '4px 0 0',
  fontSize: '12px',
  color: '#007bff'
}

const providerStatsStyle = {
  display: 'flex',
  gap: '16px',
  marginBottom: '16px',
  padding: '12px 0',
  borderTop: '1px solid #e0e0e0',
  borderBottom: '1px solid #e0e0e0',
  fontSize: '14px',
  color: '#495057'
}

const providerActionsStyle = {
  display: 'flex',
  gap: '12px'
}

const formCardStyle = {
  background: 'white',
  padding: '32px',
  borderRadius: '12px',
  border: '1px solid #e0e0e0',
  maxWidth: '600px'
}

const preferencesStyle = {
  marginTop: '24px',
  paddingTop: '24px',
  borderTop: '1px solid #e0e0e0'
}

const preferencesLabelStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2c3e50',
  marginBottom: '16px'
}

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px',
  cursor: 'pointer',
  color: '#495057'
}

// Filter styles
const filterContainerStyle = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
  marginTop: '20px',
  marginBottom: '20px'
}

const filterBtnStyle = {
  padding: '10px 16px',
  background: 'white',
  border: '1px solid #E8EAED',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  color: '#555555',
  transition: 'all 0.2s ease'
}

const activeFilterBtnStyle = {
  background: '#0A66FF',
  color: 'white',
  border: '1px solid #0A66FF'
}

// Empty state styles
const emptyStateStyle = {
  textAlign: 'center',
  padding: '60px 20px',
  background: 'white',
  borderRadius: '12px',
  border: '1px solid #E8EAED'
}

const emptyIconStyle = {
  fontSize: '64px',
  marginBottom: '16px'
}

const emptyTitleStyle = {
  fontSize: '22px',
  fontWeight: '600',
  color: '#111111',
  margin: '0 0 8px'
}

const emptyMessageStyle = {
  fontSize: '14px',
  color: '#555555',
  margin: '0'
}

// New stats grid style
const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
  marginTop: '40px',
  marginBottom: '40px'
}

const statSubtextStyle = {
  fontSize: '12px',
  color: '#888888',
  margin: '4px 0 0',
  fontWeight: '500'
}

// Quick actions styles
const quickActionsStyle = {
  marginTop: '60px',
  marginBottom: '40px'
}

const quickActionBtnsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '16px'
}

const quickActionBtnStyle = {
  padding: '20px',
  background: 'linear-gradient(135deg, #FFFFFF 0%, #F7F9FC 100%)',
  border: '2px solid #E8EAED',
  borderRadius: '12px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  textDecoration: 'none'
}

const quickActionIconStyle = {
  fontSize: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const quickActionLabelStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#111111',
  margin: '0'
}

const quickActionDescStyle = {
  fontSize: '12px',
  color: '#888888',
  margin: '4px 0 0'
}
