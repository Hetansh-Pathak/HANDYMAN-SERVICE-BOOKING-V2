import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import RoleBasedLayout from '../../components/RoleBasedLayout'
import { useUser } from '../../context/UserContext'
import { bookingAPI, emailService, generateBookingId, formatBookingNotification } from '../../lib/auth'

export default function BookingPage() {
  const router = useRouter()
  const { providerId } = router.query
  const { user, loading, addNotification, isCustomer } = useUser()

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push(`/auth/login?redirect=${encodeURIComponent(router.asPath)}`)
    }
  }, [user, loading, router])
  
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  
  const [bookingData, setBookingData] = useState({
    serviceDescription: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    contactNumber: user?.phone || '',
    paymentMethod: 'cod',
    urgency: 'normal',
    additionalNotes: ''
  })

  // Mock provider data - replace with actual API call
  useEffect(() => {
    if (providerId) {
      // Simulate API call
      const mockProvider = {
        id: providerId,
        name: 'Rajesh Kumar',
        service: 'Plumbing',
        rating: 4.8,
        reviews: 152,
        basePrice: 500,
        image: '👨‍🔧',
        phone: '+91 98765 43210',
        email: 'rajesh.provider@gmail.com',
        availableSlots: [
          '9:00 AM', '10:00 AM', '11:00 AM', 
          '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
        ]
      }
      setProvider(mockProvider)
    }
  }, [providerId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isCustomer) {
      setError('Only customers can book services')
      return
    }

    setLoading(true)
    setError('')

    try {
      const bookingId = generateBookingId()
      
      const booking = {
        id: bookingId,
        customerId: user.id,
        customerName: user.name,
        customerEmail: user.email,
        providerId: provider.id,
        providerName: provider.name,
        providerEmail: provider.email,
        service: provider.service,
        ...bookingData,
        estimatedPrice: provider.basePrice,
        status: 'pending',
        createdAt: new Date().toISOString()
      }

      // Create booking
      await bookingAPI.createBooking(booking)

      // Send email to provider
      await emailService.sendProviderNotification(provider.email, {
        bookingId,
        customerName: user.name,
        customerPhone: bookingData.contactNumber,
        service: provider.service,
        preferredDate: bookingData.preferredDate,
        preferredTime: bookingData.preferredTime,
        description: bookingData.serviceDescription,
        address: bookingData.address,
        urgency: bookingData.urgency
      })

      // Send confirmation email to customer
      await emailService.sendBookingConfirmation(user.email, {
        bookingId,
        providerName: provider.name,
        providerPhone: provider.phone,
        service: provider.service,
        preferredDate: bookingData.preferredDate,
        preferredTime: bookingData.preferredTime,
        estimatedPrice: provider.basePrice
      })

      // Add in-app notification for customer
      addNotification({
        type: 'booking_submitted',
        title: 'Booking Request Sent',
        message: `Your booking request has been sent to ${provider.name}. You will be notified once they respond.`
      })

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard/user?tab=bookings')
      }, 3000)

    } catch (err) {
      setError(err.message || 'Failed to create booking')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (!provider) {
    return (
      <RoleBasedLayout title="Book Service - HandyFix">
        <div style={loadingStyle}>Loading provider information...</div>
      </RoleBasedLayout>
    )
  }

  if (success) {
    return (
      <RoleBasedLayout title="Booking Confirmed - HandyFix">
        <div style={successContainerStyle}>
          <div style={successCardStyle}>
            <div style={successIconStyle}>✅</div>
            <h1 style={successTitleStyle}>Booking Request Sent!</h1>
            <p style={successMessageStyle}>
              Your booking request has been sent to <strong>{provider.name}</strong>.
              You will receive a confirmation email and in-app notification once they respond.
            </p>
            <div style={bookingDetailsStyle}>
              <h3>Booking Details:</h3>
              <p><strong>Service:</strong> {provider.service}</p>
              <p><strong>Date:</strong> {bookingData.preferredDate}</p>
              <p><strong>Time:</strong> {bookingData.preferredTime}</p>
              <p><strong>Estimated Price:</strong> ₹{provider.basePrice}</p>
            </div>
            <div style={contactInfoStyle}>
              <h3>Provider Contact:</h3>
              <p><strong>Phone:</strong> {provider.phone}</p>
              <p><strong>Email:</strong> {provider.email}</p>
            </div>
            <p style={redirectMessageStyle}>Redirecting to your dashboard...</p>
          </div>
        </div>
      </RoleBasedLayout>
    )
  }

  return (
    <RoleBasedLayout title={`Book ${provider.name} - HandyFix`}>
      <div style={containerStyle}>
        <div className="container">
          <div style={headerStyle}>
            <button onClick={() => router.back()} style={backBtnStyle}>
              ← Back
            </button>
            <h1 style={titleStyle}>Book {provider.service} Service</h1>
          </div>

          <div style={contentGridStyle}>
            <div style={leftColumnStyle}>
              <div className="card" style={providerCardStyle}>
                <div style={providerHeaderStyle}>
                  <div style={providerImageStyle}>{provider.image}</div>
                  <div>
                    <h2 style={providerNameStyle}>{provider.name}</h2>
                    <p style={serviceTypeStyle}>{provider.service} Specialist</p>
                    <div style={ratingStyle}>
                      ⭐ {provider.rating} ({provider.reviews} reviews)
                    </div>
                  </div>
                </div>
                <div style={priceInfoStyle}>
                  <span style={basePriceStyle}>Starting from ₹{provider.basePrice}</span>
                  <span style={priceNoteStyle}>*Final price may vary based on work complexity</span>
                </div>
              </div>

              <div className="card" style={contactCardStyle}>
                <h3>Contact Information</h3>
                <p><strong>Phone:</strong> {provider.phone}</p>
                <p><strong>Email:</strong> {provider.email}</p>
                <p style={contactNoteStyle}>
                  Once your booking is confirmed, you'll receive the provider's contact details
                </p>
              </div>
            </div>

            <div style={rightColumnStyle}>
              <div className="card" style={formCardStyle}>
                <h2 style={formTitleStyle}>Book This Service</h2>
                
                {error && (
                  <div style={errorStyle}>{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Service Description *</label>
                    <textarea
                      name="serviceDescription"
                      className="form-input"
                      placeholder="Describe the problem or work needed (e.g., 'Kitchen sink is leaking', 'Need to install new ceiling fan')"
                      value={bookingData.serviceDescription}
                      onChange={handleChange}
                      required
                      rows="4"
                    />
                  </div>

                  <div className="grid grid-2">
                    <div className="form-group">
                      <label className="form-label">Preferred Date *</label>
                      <input
                        type="date"
                        name="preferredDate"
                        className="form-input"
                        value={bookingData.preferredDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Preferred Time *</label>
                      <select
                        name="preferredTime"
                        className="form-input"
                        value={bookingData.preferredTime}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select time</option>
                        {provider.availableSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Service Address *</label>
                    <textarea
                      name="address"
                      className="form-input"
                      placeholder="Enter your complete address where service is needed"
                      value={bookingData.address}
                      onChange={handleChange}
                      required
                      rows="3"
                    />
                  </div>

                  <div className="grid grid-2">
                    <div className="form-group">
                      <label className="form-label">Contact Number *</label>
                      <input
                        type="tel"
                        name="contactNumber"
                        className="form-input"
                        placeholder="+91 12345 67890"
                        value={bookingData.contactNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Urgency Level</label>
                      <select
                        name="urgency"
                        className="form-input"
                        value={bookingData.urgency}
                        onChange={handleChange}
                      >
                        <option value="normal">Normal (1-2 days)</option>
                        <option value="urgent">Urgent (Same day)</option>
                        <option value="emergency">Emergency (Immediate)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Payment Method</label>
                    <div style={paymentOptionsStyle}>
                      <label style={radioOptionStyle}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={bookingData.paymentMethod === 'cod'}
                          onChange={handleChange}
                        />
                        Cash on Delivery (COD)
                      </label>
                      <label style={radioOptionStyle}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          checked={bookingData.paymentMethod === 'online'}
                          onChange={handleChange}
                        />
                        Pay Online (Coming Soon)
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Additional Notes</label>
                    <textarea
                      name="additionalNotes"
                      className="form-input"
                      placeholder="Any additional information or special instructions"
                      value={bookingData.additionalNotes}
                      onChange={handleChange}
                      rows="3"
                    />
                  </div>

                  <div style={summaryStyle}>
                    <h3>Booking Summary</h3>
                    <div style={summaryItemStyle}>
                      <span>Service:</span>
                      <span>{provider.service}</span>
                    </div>
                    <div style={summaryItemStyle}>
                      <span>Provider:</span>
                      <span>{provider.name}</span>
                    </div>
                    <div style={summaryItemStyle}>
                      <span>Estimated Price:</span>
                      <span>₹{provider.basePrice}</span>
                    </div>
                    <div style={summaryItemStyle}>
                      <span>Payment:</span>
                      <span>{bookingData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={submitBtnStyle}
                    disabled={loading}
                  >
                    {loading ? 'Sending Request...' : 'Confirm Booking'}
                  </button>

                  <p style={disclaimerStyle}>
                    By confirming this booking, you agree to our terms of service. 
                    The provider will contact you to confirm the appointment.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleBasedLayout>
  )
}

// Styles
const containerStyle = {
  padding: '40px 0',
  background: '#f8f9fa',
  minHeight: '80vh'
}

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '32px'
}

const backBtnStyle = {
  background: 'none',
  border: '1px solid #ddd',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px'
}

const titleStyle = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#2c3e50',
  margin: 0
}

const contentGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gap: '40px'
}

const leftColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
}

const rightColumnStyle = {}

const providerCardStyle = {
  padding: '24px'
}

const providerHeaderStyle = {
  display: 'flex',
  gap: '16px',
  marginBottom: '20px'
}

const providerImageStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: '#e9ecef',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px'
}

const providerNameStyle = {
  fontSize: '24px',
  fontWeight: '600',
  marginBottom: '4px',
  color: '#2c3e50'
}

const serviceTypeStyle = {
  color: '#007bff',
  fontWeight: '500',
  marginBottom: '8px'
}

const ratingStyle = {
  fontSize: '16px',
  fontWeight: '600'
}

const priceInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
}

const basePriceStyle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#007bff'
}

const priceNoteStyle = {
  fontSize: '12px',
  color: '#7f8c8d',
  fontStyle: 'italic'
}

const contactCardStyle = {
  padding: '24px'
}

const contactNoteStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  fontStyle: 'italic',
  marginTop: '12px'
}

const formCardStyle = {
  padding: '32px'
}

const formTitleStyle = {
  fontSize: '24px',
  fontWeight: '600',
  marginBottom: '24px',
  color: '#2c3e50'
}

const errorStyle = {
  background: '#f8d7da',
  color: '#721c24',
  padding: '12px',
  borderRadius: '6px',
  marginBottom: '20px',
  border: '1px solid #f5c6cb'
}

const paymentOptionsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px'
}

const radioOptionStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer'
}

const summaryStyle = {
  background: '#f8f9fa',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '24px'
}

const summaryItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '8px'
}

const submitBtnStyle = {
  width: '100%',
  padding: '16px',
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '16px'
}

const disclaimerStyle = {
  fontSize: '12px',
  color: '#7f8c8d',
  textAlign: 'center',
  lineHeight: '1.5'
}

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60vh',
  fontSize: '18px',
  color: '#7f8c8d'
}

const successContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  padding: '40px 0'
}

const successCardStyle = {
  background: 'white',
  padding: '60px',
  borderRadius: '16px',
  textAlign: 'center',
  maxWidth: '600px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
}

const successIconStyle = {
  fontSize: '64px',
  marginBottom: '24px'
}

const successTitleStyle = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#28a745',
  marginBottom: '16px'
}

const successMessageStyle = {
  fontSize: '18px',
  color: '#555',
  marginBottom: '32px',
  lineHeight: '1.6'
}

const bookingDetailsStyle = {
  textAlign: 'left',
  background: '#f8f9fa',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '24px'
}

const contactInfoStyle = {
  textAlign: 'left',
  background: '#e8f4fd',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '24px'
}

const redirectMessageStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  fontStyle: 'italic'
}
