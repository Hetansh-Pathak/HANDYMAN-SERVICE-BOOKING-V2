import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { useUser } from '../../context/UserContext'
import { useRouter } from 'next/router'

export default function ProviderDashboard() {
  const { user, loading, logout } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    if (!loading && (!user || user.userType !== 'provider')) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  // Mock bookings data
  const mockBookings = [
    {
      id: 'HF123456',
      customer: 'Sarah Johnson',
      service: 'Plumbing',
      status: 'completed',
      date: '2024-01-15',
      time: '10:00 AM',
      amount: '₹500',
      rating: 5,
      review: 'Excellent work!'
    },
    {
      id: 'HF123457',
      customer: 'Michael Chen',
      service: 'Plumbing',
      status: 'pending',
      date: '2024-01-20',
      time: '02:00 PM',
      amount: '₹600',
      rating: null,
      review: null
    }
  ]

  useEffect(() => {
    setBookings(mockBookings)
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }

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
    <Layout title="Provider Dashboard - HandyFix">
      <div style={dashboardContainerStyle}>
        {/* Sidebar */}
        <div style={sidebarStyle}>
          <div style={profileSectionStyle}>
            <div style={profileAvatarStyle}>
              👨‍🔧
            </div>
            <div>
              <h3 style={profileNameStyle}>{user.name}</h3>
              <p style={profileServiceStyle}>{user.service} Expert</p>
              {user.approved && <span style={approvedBadgeStyle}>✓ Verified</span>}
            </div>
          </div>

          <nav style={navStyle}>
            {[
              { id: 'overview', icon: '📊', label: 'Overview' },
              { id: 'bookings', icon: '📅', label: 'Bookings' },
              { id: 'earnings', icon: '💰', label: 'Earnings' },
              { id: 'profile', icon: '⚙️', label: 'Profile' },
              { id: 'services', icon: '🔧', label: 'Services' },
              { id: 'reviews', icon: '⭐', label: 'Reviews' }
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

              <div className="grid grid-4" style={{ marginTop: '40px' }}>
                <div style={statCardStyle}>
                  <div style={statIconStyle}>📅</div>
                  <h3 style={statLabelStyle}>Total Bookings</h3>
                  <p style={statValueStyle}>{user.completedJobs + 12}</p>
                </div>
                <div style={statCardStyle}>
                  <div style={statIconStyle}>✅</div>
                  <h3 style={statLabelStyle}>Completed</h3>
                  <p style={statValueStyle}>{user.completedJobs}</p>
                </div>
                <div style={statCardStyle}>
                  <div style={statIconStyle}>💰</div>
                  <h3 style={statLabelStyle}>Total Earnings</h3>
                  <p style={statValueStyle}>₹{user.totalEarnings.toLocaleString()}</p>
                </div>
                <div style={statCardStyle}>
                  <div style={statIconStyle}>⭐</div>
                  <h3 style={statLabelStyle}>Rating</h3>
                  <p style={statValueStyle}>{user.rating}/5</p>
                </div>
              </div>

              <div style={{ marginTop: '60px' }}>
                <h2 style={sectionTitleStyle}>Recent Bookings</h2>
                {bookings.slice(0, 3).map(booking => (
                  <div key={booking.id} style={bookingCardStyle}>
                    <div style={bookingHeaderStyle}>
                      <div>
                        <h3 style={bookingCustomerStyle}>{booking.customer}</h3>
                        <p style={bookingServiceStyle}>{booking.service}</p>
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
              </div>

              <div style={{ marginTop: '40px' }}>
                {bookings.map(booking => (
                  <div key={booking.id} style={bookingDetailCardStyle}>
                    <div style={bookingDetailHeaderStyle}>
                      <div>
                        <h3 style={bookingCustomerStyle}>{booking.customer}</h3>
                        <p style={bookingBookingIdStyle}>Booking ID: {booking.id}</p>
                      </div>
                      <span style={{
                        ...statusBadgeStyle,
                        ...(booking.status === 'completed' ? completedStatusStyle : pendingStatusStyle)
                      }}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div style={bookingInfoGridStyle}>
                      <div>
                        <p style={bookingInfoLabelStyle}>Service</p>
                        <p style={bookingInfoValueStyle}>{booking.service}</p>
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
                      {booking.status === 'pending' && (
                        <>
                          <button style={primaryActionStyle}>Accept</button>
                          <button style={cancelActionStyle}>Decline</button>
                        </>
                      )}
                      {booking.status === 'completed' && (
                        <button style={secondaryActionStyle}>View Invoice</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div>
              <div style={headerStyle}>
                <h1 style={titleStyle}>Earnings</h1>
              </div>

              <div className="grid grid-3" style={{ marginTop: '40px' }}>
                <div style={earningsCardStyle}>
                  <p style={earningsLabelStyle}>Total Earnings</p>
                  <p style={earningsValueStyle}>₹{user.totalEarnings.toLocaleString()}</p>
                </div>
                <div style={earningsCardStyle}>
                  <p style={earningsLabelStyle}>This Month</p>
                  <p style={earningsValueStyle}>₹5,200</p>
                </div>
                <div style={earningsCardStyle}>
                  <p style={earningsLabelStyle}>Pending</p>
                  <p style={earningsValueStyle}>₹1,500</p>
                </div>
              </div>

              <div style={{ marginTop: '60px' }}>
                <h2 style={sectionTitleStyle}>Earnings History</h2>
                <div style={tableStyle}>
                  <div style={tableHeaderStyle}>
                    <div style={tableColumnStyle}>Date</div>
                    <div style={tableColumnStyle}>Customer</div>
                    <div style={tableColumnStyle}>Service</div>
                    <div style={tableColumnStyle}>Amount</div>
                    <div style={tableColumnStyle}>Status</div>
                  </div>
                  {bookings.filter(b => b.status === 'completed').map(booking => (
                    <div key={booking.id} style={tableRowStyle}>
                      <div style={tableColumnStyle}>{booking.date}</div>
                      <div style={tableColumnStyle}>{booking.customer}</div>
                      <div style={tableColumnStyle}>{booking.service}</div>
                      <div style={tableColumnStyle}>{booking.amount}</div>
                      <div style={tableColumnStyle}>
                        <span style={paidStatusStyle}>Paid</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div style={headerStyle}>
                <h1 style={titleStyle}>Profile Settings</h1>
              </div>

              <div style={formCardStyle}>
                <h3 style={formSectionTitleStyle}>Personal Information</h3>
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

                <h3 style={{...formSectionTitleStyle, marginTop: '32px'}}>Professional Information</h3>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Service Type</label>
                    <input type="text" className="form-input" defaultValue={user.service} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Base Price (₹)</label>
                    <input type="number" className="form-input" defaultValue={user.basePrice} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Bio</label>
                  <textarea className="form-input" rows="3" placeholder="Tell customers about your experience"></textarea>
                </div>

                <button className="btn btn-primary" style={{ marginTop: '24px' }}>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div>
              <div style={headerStyle}>
                <h1 style={titleStyle}>My Services</h1>
                <button className="btn btn-primary">+ Add Service</button>
              </div>

              <div style={{ marginTop: '40px' }}>
                {(user.services || ['Plumbing', 'Pipe Repair']).map((service, idx) => (
                  <div key={idx} style={serviceCardStyle}>
                    <div style={serviceHeaderStyle}>
                      <h3 style={serviceNameStyle}>{service}</h3>
                      <div>
                        <button style={editBtnStyle}>Edit</button>
                        <button style={deleteBtnStyle}>Delete</button>
                      </div>
                    </div>
                    <p style={serviceDescStyle}>Professional {service} services with guaranteed quality</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div style={headerStyle}>
                <h1 style={titleStyle}>Customer Reviews</h1>
              </div>

              <div style={{ marginTop: '40px' }}>
                <div style={reviewsStatStyle}>
                  <div style={ratingBoxStyle}>
                    <p style={ratingNumberStyle}>{user.rating}</p>
                    <p style={starsStyle}>⭐⭐⭐⭐⭐</p>
                    <p style={reviewCountStyle}>Based on {user.reviewCount} reviews</p>
                  </div>
                </div>

                <h2 style={sectionTitleStyle} style={{ marginTop: '40px' }}>Latest Reviews</h2>
                {[1, 2, 3].map(idx => (
                  <div key={idx} style={customerReviewStyle}>
                    <div style={reviewHeaderStyle}>
                      <div>
                        <p style={reviewerNameStyle}>Customer {idx}</p>
                        <p style={reviewerServiceStyle}>Service: Plumbing</p>
                      </div>
                      <span style={reviewStarStyle}>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p style={reviewCommentStyle}>Great service and very professional! Highly recommended.</p>
                    <p style={reviewDateStyle}>2 days ago</p>
                  </div>
                ))}
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

const profileServiceStyle = {
  margin: '0',
  fontSize: '12px',
  color: '#7f8c8d'
}

const approvedBadgeStyle = {
  display: 'inline-block',
  padding: '4px 12px',
  background: '#d4edda',
  color: '#155724',
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
  background: 'linear-gradient(135deg, #28a745, #20c997)',
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
  color: '#28a745'
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
  border: '1px solid #e0e0e0'
}

const bookingHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '16px'
}

const bookingCustomerStyle = {
  margin: '0',
  fontSize: '18px',
  fontWeight: '600',
  color: '#2c3e50'
}

const bookingServiceStyle = {
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
  background: 'linear-gradient(135deg, #28a745, #20c997)',
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

const earningsCardStyle = {
  background: 'white',
  padding: '24px',
  borderRadius: '12px',
  textAlign: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  border: '1px solid #e0e0e0'
}

const earningsLabelStyle = {
  margin: '0',
  fontSize: '14px',
  color: '#7f8c8d',
  fontWeight: '500'
}

const earningsValueStyle = {
  margin: '8px 0 0',
  fontSize: '28px',
  fontWeight: '700',
  color: '#28a745'
}

const tableStyle = {
  background: 'white',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid #e0e0e0'
}

const tableHeaderStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  padding: '16px',
  background: '#f8f9fa',
  borderBottom: '1px solid #e0e0e0',
  fontWeight: '600',
  color: '#495057'
}

const tableRowStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  padding: '16px',
  borderBottom: '1px solid #e0e0e0',
  alignItems: 'center',
  color: '#2c3e50'
}

const tableColumnStyle = {
  fontSize: '14px'
}

const paidStatusStyle = {
  display: 'inline-block',
  padding: '4px 12px',
  background: '#d4edda',
  color: '#155724',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '600'
}

const formCardStyle = {
  background: 'white',
  padding: '32px',
  borderRadius: '12px',
  border: '1px solid #e0e0e0',
  maxWidth: '800px'
}

const formSectionTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#2c3e50',
  marginBottom: '20px'
}

const serviceCardStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '12px',
  marginBottom: '16px',
  border: '1px solid #e0e0e0'
}

const serviceHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '12px'
}

const serviceNameStyle = {
  margin: '0',
  fontSize: '18px',
  fontWeight: '600',
  color: '#2c3e50'
}

const serviceDescStyle = {
  margin: '0',
  fontSize: '14px',
  color: '#7f8c8d'
}

const editBtnStyle = {
  padding: '6px 12px',
  marginRight: '8px',
  background: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '600'
}

const deleteBtnStyle = {
  padding: '6px 12px',
  background: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '600'
}

const reviewsStatStyle = {
  display: 'flex',
  gap: '24px'
}

const ratingBoxStyle = {
  background: 'white',
  padding: '32px',
  borderRadius: '12px',
  textAlign: 'center',
  border: '1px solid #e0e0e0'
}

const ratingNumberStyle = {
  margin: '0',
  fontSize: '48px',
  fontWeight: '700',
  color: '#28a745'
}

const starsStyle = {
  fontSize: '24px',
  margin: '12px 0'
}

const reviewCountStyle = {
  margin: '12px 0 0',
  fontSize: '14px',
  color: '#7f8c8d'
}

const customerReviewStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '12px',
  marginBottom: '16px',
  border: '1px solid #e0e0e0'
}

const reviewHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '12px'
}

const reviewerNameStyle = {
  margin: '0',
  fontSize: '16px',
  fontWeight: '600',
  color: '#2c3e50'
}

const reviewerServiceStyle = {
  margin: '4px 0 0',
  fontSize: '12px',
  color: '#7f8c8d'
}

const reviewStarStyle = {
  fontSize: '14px',
  color: '#ffc107'
}

const reviewCommentStyle = {
  margin: '12px 0 0',
  fontSize: '14px',
  color: '#495057'
}

const reviewDateStyle = {
  margin: '12px 0 0',
  fontSize: '12px',
  color: '#adb5bd'
}
