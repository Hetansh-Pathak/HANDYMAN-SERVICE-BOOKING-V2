import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { useUser } from '../../context/UserContext'

export default function ProviderProfile() {
  const router = useRouter()
  const { id } = router.query
  const { user } = useUser()

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [showBookingForm, setShowBookingForm] = useState(false)

  // Mock data - replace with API call based on id
  const provider = {
    id: 1,
    name: 'Rajesh Kumar',
    service: 'Plumbing',
    city: 'Mumbai',
    rating: 4.8,
    reviews: 152,
    experience: 8,
    basePrice: 500,
    available: true,
    image: '👨‍🔧',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    bio: 'Professional plumber with 8 years of experience in residential and commercial plumbing. Specialized in pipe repairs, installation, and emergency fixes. Available for same-day service.',
    specialties: ['Pipe Repair', 'Installation', 'Emergency Fixes', 'Bathroom Fitting', 'Kitchen Plumbing'],
    serviceArea: 'Andheri, Bandra, Juhu, Versova, Goregaon (West Mumbai)',
    workingHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed'
    },
    gallery: ['🔧', '🚿', '🚰', '🔩'],
    pricing: [
      { service: 'Basic Pipe Repair', price: 500 },
      { service: 'Tap Installation', price: 300 },
      { service: 'Toilet Repair', price: 800 },
      { service: 'Emergency Call-out', price: 1000 }
    ]
  }

  const reviews = [
    {
      id: 1,
      user: 'Priya Sharma',
      rating: 5,
      comment: 'Excellent service! Fixed my kitchen pipe leak quickly and professionally.',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      user: 'Amit Patel',
      rating: 5,
      comment: 'Very reliable and honest. Explained the problem clearly and fixed it efficiently.',
      date: '2024-01-10',
      verified: true
    },
    {
      id: 3,
      user: 'Sunita Singh',
      rating: 4,
      comment: 'Good work, arrived on time. Could improve communication about pricing upfront.',
      date: '2024-01-05',
      verified: true
    }
  ]

  const availableSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  const handleBookClick = () => {
    if (!user) {
      // Redirect to login with the provider booking URL as redirect
      router.push(`/auth/login?redirect=${encodeURIComponent(`/book/${id}`)}`)
      return
    }
    router.push(`/book/${id}`)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    // Handle booking logic here
    alert('Booking request sent! You will receive a confirmation shortly.')
    setShowBookingForm(false)
  }

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 ? '⭐' : '')
  }

  return (
    <Layout title={`${provider.name} - ${provider.service} Specialist | HandyFix`}>
      <div style={containerStyle}>
        {/* Provider Header */}
        <section style={headerSectionStyle}>
          <div className="container">
            <div style={headerContentStyle}>
              <div style={providerMainInfoStyle}>
                <div style={providerImageStyle}>{provider.image}</div>
                <div style={providerDetailsStyle}>
                  <h1 style={providerNameStyle}>{provider.name}</h1>
                  <p style={serviceTypeStyle}>{provider.service} Specialist</p>
                  <p style={locationStyle}>📍 {provider.city}</p>
                  
                  <div style={statsRowStyle}>
                    <div style={ratingDisplayStyle}>
                      <span style={ratingStarsStyle}>{renderStars(provider.rating)}</span>
                      <span style={ratingTextStyle}>{provider.rating} ({provider.reviews} reviews)</span>
                    </div>
                    <div style={experienceDisplayStyle}>
                      {provider.experience} years experience
                    </div>
                    <div style={availabilityDisplayStyle}>
                      <span style={{
                        ...statusBadgeStyle,
                        ...(provider.available ? availableBadgeStyle : unavailableBadgeStyle)
                      }}>
                        {provider.available ? '✅ Available' : '🔴 Busy'}
                      </span>
                    </div>
                  </div>

                  <div style={contactInfoStyle}>
                    <a href={`tel:${provider.phone}`} style={contactLinkStyle}>
                      📞 {provider.phone}
                    </a>
                    <a href={`mailto:${provider.email}`} style={contactLinkStyle}>
                      ✉️ {provider.email}
                    </a>
                  </div>
                </div>
              </div>

              <div style={bookingCardStyle}>
                <div style={priceDisplayStyle}>
                  <span style={priceFromStyle}>Starting from</span>
                  <span style={priceAmountStyle}>₹{provider.basePrice}</span>
                </div>
                <button
                  className="btn btn-primary"
                  style={bookNowBtnStyle}
                  onClick={handleBookClick}
                >
                  Book Now
                </button>
                <p style={responseTimeStyle}>⚡ Usually responds within 1 hour</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section style={mainContentStyle}>
          <div className="container">
            <div style={contentGridStyle}>
              <div style={leftColumnStyle}>
                {/* About */}
                <div className="card" style={sectionCardStyle}>
                  <h2 style={sectionTitleStyle}>About</h2>
                  <p style={bioTextStyle}>{provider.bio}</p>
                </div>

                {/* Specialties */}
                <div className="card" style={sectionCardStyle}>
                  <h2 style={sectionTitleStyle}>Specialties</h2>
                  <div style={specialtiesGridStyle}>
                    {provider.specialties.map(specialty => (
                      <span key={specialty} style={specialtyTagStyle}>{specialty}</span>
                    ))}
                  </div>
                </div>

                {/* Service Area */}
                <div className="card" style={sectionCardStyle}>
                  <h2 style={sectionTitleStyle}>Service Area</h2>
                  <p style={serviceAreaTextStyle}>{provider.serviceArea}</p>
                </div>

                {/* Pricing */}
                <div className="card" style={sectionCardStyle}>
                  <h2 style={sectionTitleStyle}>Pricing</h2>
                  <div style={pricingListStyle}>
                    {provider.pricing.map(item => (
                      <div key={item.service} style={pricingItemStyle}>
                        <span style={serviceNameStyle}>{item.service}</span>
                        <span style={servicePriceStyle}>₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <p style={pricingNoteStyle}>*Prices may vary based on complexity and materials required</p>
                </div>

                {/* Reviews */}
                <div className="card" style={sectionCardStyle}>
                  <h2 style={sectionTitleStyle}>Reviews ({reviews.length})</h2>
                  <div style={reviewsListStyle}>
                    {reviews.map(review => (
                      <div key={review.id} style={reviewItemStyle}>
                        <div style={reviewHeaderStyle}>
                          <div>
                            <strong style={reviewerNameStyle}>{review.user}</strong>
                            {review.verified && <span style={verifiedBadgeStyle}>✓ Verified</span>}
                          </div>
                          <div style={reviewRatingStyle}>
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p style={reviewCommentStyle}>{review.comment}</p>
                        <p style={reviewDateStyle}>{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                  <Link href={`/provider/${id}/reviews`} style={viewAllReviewsStyle}>
                    View All Reviews →
                  </Link>
                </div>
              </div>

              <div style={rightColumnStyle}>
                {/* Working Hours */}
                <div className="card" style={sectionCardStyle}>
                  <h3 style={sectionTitleStyle}>Working Hours</h3>
                  <div style={hoursListStyle}>
                    {Object.entries(provider.workingHours).map(([day, hours]) => (
                      <div key={day} style={hourItemStyle}>
                        <span style={dayNameStyle}>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                        <span style={hoursStyle}>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work Gallery */}
                <div className="card" style={sectionCardStyle}>
                  <h3 style={sectionTitleStyle}>Work Gallery</h3>
                  <div style={galleryGridStyle}>
                    {provider.gallery.map((image, index) => (
                      <div key={index} style={galleryItemStyle}>
                        <div style={galleryImageStyle}>{image}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Similar Providers */}
                <div className="card" style={sectionCardStyle}>
                  <h3 style={sectionTitleStyle}>Similar Providers</h3>
                  <p style={similarProvidersTextStyle}>
                    <Link href="/services" style={linkStyle}>
                      View other {provider.service} specialists in {provider.city} →
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Modal */}
        {showBookingForm && (
          <div style={modalOverlayStyle} onClick={() => setShowBookingForm(false)}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <div style={modalHeaderStyle}>
                <h2>Book {provider.name}</h2>
                <button 
                  style={closeButtonStyle}
                  onClick={() => setShowBookingForm(false)}
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleBookingSubmit} style={bookingFormStyle}>
                <div className="form-group">
                  <label className="form-label">Service Description *</label>
                  <textarea
                    className="form-input"
                    placeholder="Describe your problem or service requirement..."
                    required
                    rows="4"
                  />
                </div>

                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Preferred Date *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Time *</label>
                    <select
                      className="form-input"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                    >
                      <option value="">Select time</option>
                      {availableSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Address *</label>
                  <textarea
                    className="form-input"
                    placeholder="Enter your complete address..."
                    required
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+91 12345 67890"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <div style={paymentOptionsStyle}>
                    <label style={radioOptionStyle}>
                      <input type="radio" name="payment" value="cod" defaultChecked />
                      Cash on Delivery (COD)
                    </label>
                    <label style={radioOptionStyle}>
                      <input type="radio" name="payment" value="online" />
                      Pay Online
                    </label>
                  </div>
                </div>

                <div style={modalFooterStyle}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowBookingForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

// Styles
const containerStyle = {
  background: '#f8f9fa'
}

const headerSectionStyle = {
  background: 'white',
  padding: '40px 0',
  borderBottom: '1px solid #eee'
}

const headerContentStyle = {
  display: 'flex',
  gap: '40px',
  alignItems: 'flex-start'
}

const providerMainInfoStyle = {
  flex: '1',
  display: 'flex',
  gap: '24px'
}

const providerImageStyle = {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  background: '#e9ecef',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '48px',
  flexShrink: 0
}

const providerDetailsStyle = {
  flex: '1'
}

const providerNameStyle = {
  fontSize: '32px',
  fontWeight: '700',
  marginBottom: '8px',
  color: '#2c3e50'
}

const serviceTypeStyle = {
  fontSize: '18px',
  color: '#007bff',
  fontWeight: '600',
  marginBottom: '8px'
}

const locationStyle = {
  fontSize: '16px',
  color: '#7f8c8d',
  marginBottom: '20px'
}

const statsRowStyle = {
  display: 'flex',
  gap: '32px',
  marginBottom: '20px',
  flexWrap: 'wrap'
}

const ratingDisplayStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}

const ratingStarsStyle = {
  fontSize: '18px'
}

const ratingTextStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1a1a1a'
}

const experienceDisplayStyle = {
  fontSize: '16px',
  color: '#28a745',
  fontWeight: '600'
}

const availabilityDisplayStyle = {}

const statusBadgeStyle = {
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '14px',
  fontWeight: '600'
}

const availableBadgeStyle = {
  background: '#d4edda',
  color: '#155724'
}

const unavailableBadgeStyle = {
  background: '#f8d7da',
  color: '#721c24'
}

const contactInfoStyle = {
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap'
}

const contactLinkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500'
}

const bookingCardStyle = {
  background: 'white',
  padding: '32px',
  borderRadius: '12px',
  border: '2px solid #007bff',
  textAlign: 'center',
  minWidth: '280px'
}

const priceDisplayStyle = {
  marginBottom: '20px'
}

const priceFromStyle = {
  display: 'block',
  fontSize: '14px',
  color: '#7f8c8d',
  marginBottom: '4px'
}

const priceAmountStyle = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#007bff'
}

const bookNowBtnStyle = {
  width: '100%',
  padding: '16px',
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '16px'
}

const responseTimeStyle = {
  fontSize: '14px',
  color: '#28a745',
  fontWeight: '500'
}

const mainContentStyle = {
  padding: '40px 0'
}

const contentGridStyle = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '40px'
}

const leftColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
}

const rightColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
}

const sectionCardStyle = {
  marginBottom: '0'
}

const sectionTitleStyle = {
  fontSize: '24px',
  fontWeight: '600',
  marginBottom: '16px',
  color: '#2c3e50'
}

const bioTextStyle = {
  lineHeight: '1.6',
  color: '#1a1a1a'
}

const specialtiesGridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px'
}

const specialtyTagStyle = {
  padding: '8px 16px',
  background: '#e3f2fd',
  color: '#1976d2',
  borderRadius: '20px',
  fontSize: '14px',
  fontWeight: '500'
}

const serviceAreaTextStyle = {
  lineHeight: '1.6',
  color: '#1a1a1a'
}

const pricingListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '16px'
}

const pricingItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px 16px',
  background: '#f8f9fa',
  borderRadius: '8px'
}

const serviceNameStyle = {
  fontWeight: '500',
  color: '#1a1a1a'
}

const servicePriceStyle = {
  fontWeight: '600',
  color: '#007bff'
}

const pricingNoteStyle = {
  fontSize: '12px',
  color: '#7f8c8d',
  fontStyle: 'italic'
}

const reviewsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginBottom: '16px'
}

const reviewItemStyle = {
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px'
}

const reviewHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px'
}

const reviewerNameStyle = {
  fontSize: '16px',
  color: '#1a1a1a'
}

const verifiedBadgeStyle = {
  marginLeft: '8px',
  color: '#28a745',
  fontSize: '12px',
  fontWeight: '600'
}

const reviewRatingStyle = {
  fontSize: '14px'
}

const reviewCommentStyle = {
  marginBottom: '8px',
  lineHeight: '1.5',
  color: '#1a1a1a'
}

const reviewDateStyle = {
  fontSize: '12px',
  color: '#7f8c8d'
}

const viewAllReviewsStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: '600'
}

const hoursListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}

const hourItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0'
}

const dayNameStyle = {
  fontWeight: '500',
  textTransform: 'capitalize',
  color: '#1a1a1a'
}

const hoursStyle = {
  color: '#7f8c8d'
}

const galleryGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '12px'
}

const galleryItemStyle = {
  cursor: 'pointer'
}

const galleryImageStyle = {
  width: '100%',
  height: '80px',
  background: '#f8f9fa',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '32px',
  border: '2px solid #dee2e6'
}

const similarProvidersTextStyle = {
  margin: '0'
}

const linkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: '500'
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
}

const modalContentStyle = {
  background: 'white',
  borderRadius: '12px',
  maxWidth: '600px',
  width: '90%',
  maxHeight: '90vh',
  overflow: 'auto'
}

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 24px 0',
  borderBottom: '1px solid #eee',
  marginBottom: '24px'
}

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#7f8c8d'
}

const bookingFormStyle = {
  padding: '0 24px 24px'
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

const modalFooterStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '16px',
  marginTop: '24px'
}
