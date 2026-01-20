import RoleBasedLayout from '../components/RoleBasedLayout'
import PincodeSearch from '../components/PincodeSearch'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { filterProvidersByLocation, formatDistance } from '../lib/location-service'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [userPincode, setUserPincode] = useState(null)
  const [filteredProviders, setFilteredProviders] = useState(null)
  const [sortBy, setSortBy] = useState('rating') // rating, distance, response
  const { user, isProvider, isCustomer } = useUser()

  // Handle availability check
  const handleAvailabilityCheck = (result) => {
    if (result.isInGujarate) {
      setUserPincode(result.city.pincodes[0])
      // Filter and sort providers based on location
      const filtered = filterProvidersByLocation(featuredProviders, result.city.pincodes[0])
      setFilteredProviders(filtered)
    } else {
      setFilteredProviders(null)
    }
  }

  // Get providers to display
  const displayProviders = filteredProviders || featuredProviders

  // Sort providers based on selected criteria
  const sortedProviders = [...displayProviders].sort((a, b) => {
    switch(sortBy) {
      case 'distance':
        return (a.distance || Infinity) - (b.distance || Infinity)
      case 'response':
        // Parse response time (e.g., "15 min" -> 15)
        const aTime = parseInt(a.responseTime || '999')
        const bTime = parseInt(b.responseTime || '999')
        return aTime - bTime
      case 'rating':
      default:
        return b.rating - a.rating
    }
  })

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const services = [
    { 
      id: 1, 
      name: 'Plumbing', 
      icon: '🔧', 
      desc: 'Pipe repairs, leak fixes, installation',
      providers: 45,
      avgPrice: '₹500',
      urgentAvailable: true
    },
    { 
      id: 2, 
      name: 'Electrical', 
      icon: '⚡', 
      desc: 'Wiring, appliance installation, repairs',
      providers: 38,
      avgPrice: '₹600',
      urgentAvailable: true
    },
    { 
      id: 3, 
      name: 'Carpentry', 
      icon: '🔨', 
      desc: 'Furniture repair, custom woodwork',
      providers: 32,
      avgPrice: '₹800',
      urgentAvailable: false
    },
    { 
      id: 4, 
      name: 'AC Repair', 
      icon: '❄️', 
      desc: 'AC servicing, installation, maintenance',
      providers: 28,
      avgPrice: '₹700',
      urgentAvailable: true
    },
    { 
      id: 5, 
      name: 'Painting', 
      icon: '🎨', 
      desc: 'Interior and exterior painting',
      providers: 25,
      avgPrice: '₹400',
      urgentAvailable: false
    },
    { 
      id: 6, 
      name: 'Cleaning', 
      icon: '🧽', 
      desc: 'Deep cleaning, regular maintenance',
      providers: 42,
      avgPrice: '₹300',
      urgentAvailable: true
    }
  ]

  const featuredProviders = [
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      service: 'Plumbing', 
      rating: 4.8, 
      experience: 8, 
      image: '👨‍🔧',
      completedJobs: 245,
      responseTime: '15 min',
      verified: true,
      available: true
    },
    { 
      id: 2, 
      name: 'Amit Sharma', 
      service: 'Electrical', 
      rating: 4.9, 
      experience: 12, 
      image: '👨‍💼',
      completedJobs: 312,
      responseTime: '20 min',
      verified: true,
      available: true
    },
    { 
      id: 3, 
      name: 'Priya Singh', 
      service: 'Cleaning', 
      rating: 4.7, 
      experience: 5, 
      image: '👩‍💼',
      completedJobs: 189,
      responseTime: '25 min',
      verified: true,
      available: false
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Mumbai',
      rating: 5,
      text: 'Amazing service! The plumber arrived on time and fixed our leak quickly. Professional and affordable.',
      service: 'Plumbing',
      image: '👩‍💼'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Delhi',
      rating: 5,
      text: 'Found a great electrician through HandyFix. Quality work and reasonable prices. Highly recommend!',
      service: 'Electrical',
      image: '👨‍💼'
    },
    {
      id: 3,
      name: 'Anita Patel',
      location: 'Bangalore',
      rating: 4,
      text: 'Excellent platform for finding trusted service providers. The booking process is so easy!',
      service: 'Cleaning',
      image: '👩'
    }
  ]

  const stats = [
    { label: 'Happy Customers', value: '50,000+', icon: '😊' },
    { label: 'Verified Providers', value: '2,500+', icon: '✅' },
    { label: 'Services Completed', value: '1,00,000+', icon: '🎯' },
    { label: 'Cities Covered', value: '25+', icon: '🏙️' }
  ]

  const handleSearch = () => {
    const query = searchQuery || selectedService
    if (query) {
      window.location.href = `/services?search=${encodeURIComponent(query)}`
    }
  }

  return (
    <RoleBasedLayout title="HandyFix - Find Trusted Local Service Providers">
      {/* Hero Section */}
      <section style={heroStyle}>
        <div className="container">
          <div style={heroContentStyle}>
            <div style={heroTextStyle}>
              <div style={heroTaglineStyle}>
                ✓ Trusted by thousands of Indians
              </div>
              
              <h1 style={heroTitleStyle}>
                Find Trusted Service Providers Near You
              </h1>
              
              <p style={heroSubtitleStyle}>
                Book verified professionals for plumbing, electrical work, carpentry, and more. Quick booking, transparent pricing, and 24/7 support.
              </p>
              
              {/* Search Bar */}
              <div style={searchBarContainerStyle}>
                <div style={searchBarStyle}>
                  <div style={searchInputGroupStyle}>
                    <span style={searchIconStyle}>🔍</span>
                    <input 
                      type="text" 
                      placeholder="What service do you need?" 
                      style={searchInputStyle}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  
                  <button 
                    className="btn btn-primary" 
                    style={searchBtnStyle}
                    onClick={handleSearch}
                  >
                    Find Services
                  </button>
                </div>
                
                <div style={searchTagsStyle}>
                  {['Plumbing', 'Electrical', 'AC Repair', 'Cleaning'].map(tag => (
                    <button 
                      key={tag}
                      style={tagStyle}
                      onClick={() => {
                        setSelectedService(tag)
                        setSearchQuery(tag)
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div style={trustIndicatorsStyle}>
                <div style={trustItemStyle}>✓ 100% Verified Professionals</div>
                <div style={trustItemStyle}>⚡ Same-day Service Available</div>
                <div style={trustItemStyle}>🛡️ Safe & Secure</div>
              </div>

              {/* Pincode Search */}
              <div style={pincodeSearchWrapperStyle}>
                <PincodeSearch
                  onAvailabilityCheck={handleAvailabilityCheck}
                  onPincodeSelect={(pincode, city) => setUserPincode(pincode)}
                />
              </div>
            </div>

            {/* Hero Stats */}
            <div style={heroStatsGridStyle}>
              {stats.map((stat, index) => (
                <div key={index} style={statCardStyle} className="animate-on-scroll">
                  <div style={statIconStyle}>{stat.icon}</div>
                  <div style={statValueStyle}>{stat.value}</div>
                  <div style={statLabelStyle}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={howItWorksStyle}>
        <div className="container">
          <div style={sectionHeaderStyle} className="animate-on-scroll">
            <h2 style={sectionTitleStyle}>How HandyFix Works</h2>
            <p style={sectionSubtitleStyle}>Get your home services done in 3 simple steps</p>
          </div>
          
          <div style={stepsGridStyle}>
            {[
              { 
                step: '1', 
                title: 'Choose Service', 
                desc: 'Select from 50+ services',
                icon: '🔍'
              },
              { 
                step: '2', 
                title: 'Book Instantly', 
                desc: 'Get matched with professionals',
                icon: '📱'
              },
              { 
                step: '3', 
                title: 'Get It Done', 
                desc: 'Relax while experts work',
                icon: '✨'
              }
            ].map((item, index) => (
              <div key={index} style={stepCardStyle} className="animate-on-scroll">
                <div style={stepNumberStyle}>{item.step}</div>
                <div style={stepEmojiStyle}>{item.icon}</div>
                <h3 style={stepTitleStyle}>{item.title}</h3>
                <p style={stepDescStyle}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={servicesStyle}>
        <div className="container">
          <div style={sectionHeaderStyle} className="animate-on-scroll">
            <h2 style={sectionTitleStyle}>Our Services</h2>
            <p style={sectionSubtitleStyle}>Professional help for all your home and office needs</p>
          </div>
          
          <div style={servicesGridStyle}>
            {services.map((service, index) => (
              <Link 
                key={service.id} 
                href={`/services/${service.name.toLowerCase().replace(' ', '-')}`} 
                style={{textDecoration: 'none'}}
              >
                <div 
                  style={{
                    ...serviceCardStyle,
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                  className="animate-on-scroll"
                >
                  <div style={serviceIconStyle}>{service.icon}</div>
                  <h3 style={serviceNameStyle}>{service.name}</h3>
                  <p style={serviceDescStyle}>{service.desc}</p>
                  
                  <div style={serviceMetricsStyle}>
                    <div style={metricStyle}>👥 {service.providers} providers</div>
                    <div style={metricStyle}>💰 From {service.avgPrice}</div>
                  </div>
                  
                  {service.urgentAvailable && (
                    <div style={urgentBadgeStyle}>⚡ Emergency Available</div>
                  )}
                  
                  <div style={bookNowStyle}>Book Now →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers Section */}
      <section style={providersStyle}>
        <div className="container">
          <div style={sectionHeaderStyle} className="animate-on-scroll">
            <h2 style={sectionTitleStyle}>Featured Service Providers</h2>
            <p style={sectionSubtitleStyle}>Top-rated professionals in your area</p>
          </div>
          
          <div style={providersGridStyle}>
            {featuredProviders.map((provider, index) => (
              <div 
                key={provider.id} 
                style={{
                  ...providerCardStyle,
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
                className="animate-on-scroll"
              >
                <div style={providerHeaderStyle}>
                  <div style={providerImageStyle}>
                    {provider.image}
                    {provider.verified && <div style={verifiedBadgeStyle}>✓</div>}
                    <div style={{
                      ...statusDotStyle,
                      background: provider.available ? '#00B894' : '#DC3545'
                    }}></div>
                  </div>
                  <div>
                    <h3 style={providerNameStyle}>{provider.name}</h3>
                    <p style={providerServiceStyle}>{provider.service} Specialist</p>
                  </div>
                </div>
                
                <div style={providerRatingStyle}>
                  <div style={starsStyle}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{
                        color: i < Math.floor(provider.rating) ? '#FFA500' : '#D2D3D5'
                      }}>★</span>
                    ))}
                  </div>
                  <span style={ratingValueStyle}>{provider.rating}</span>
                  <span style={ratingCountStyle}>({provider.completedJobs} jobs)</span>
                </div>
                
                <div style={providerMetricsStyle}>
                  <div style={metricItemStyle}>⏱️ {provider.responseTime} response</div>
                  <div style={metricItemStyle}>🎯 {provider.experience}+ years</div>
                </div>

                <Link 
                  href={`/provider/${provider.id}`} 
                  className="btn btn-primary" 
                  style={{width: '100%', marginTop: '20px', fontSize: '14px'}}
                >
                  {provider.available ? 'Book Now' : 'View Profile'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={testimonialsStyle}>
        <div className="container">
          <div style={sectionHeaderStyle} className="animate-on-scroll">
            <h2 style={sectionTitleStyle}>What Our Customers Say</h2>
            <p style={sectionSubtitleStyle}>Real experiences from satisfied customers</p>
          </div>
          
          <div style={testimonialCarouselStyle}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                style={{
                  ...testimonialCardStyle,
                  opacity: index === currentTestimonial ? 1 : 0,
                  transform: index === currentTestimonial ? 'scale(1)' : 'scale(0.95)',
                  pointerEvents: index === currentTestimonial ? 'auto' : 'none'
                }}
              >
                <p style={testimonialTextStyle}>"{testimonial.text}"</p>
                
                <div style={testimonialAuthorStyle}>
                  <div style={authorImageStyle}>{testimonial.image}</div>
                  <div>
                    <div style={authorNameStyle}>{testimonial.name}</div>
                    <div style={authorLocationStyle}>{testimonial.location}</div>
                  </div>
                  <div style={testimonialRatingStyle}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={testimonialDotsStyle}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                style={{
                  ...dotStyle,
                  background: index === currentTestimonial ? '#0A66FF' : '#D2D3D5'
                }}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={ctaStyle}>
        <div className="container">
          <div style={ctaContentStyle} className="animate-on-scroll">
            <h2 style={ctaTitleStyle}>Ready to Get Started?</h2>
            <p style={ctaSubtitleStyle}>
              Join thousands of satisfied customers who trust HandyFix for quality, affordable home services.
            </p>
            
            <div style={ctaButtonsStyle}>
              {!user ? (
                <>
                  <Link href="/services" className="btn btn-primary" style={ctaBtnStyle}>
                    🔍 Find Services Now
                  </Link>
                  <Link href="/auth/provider-register" className="btn btn-secondary" style={ctaBtnStyle}>
                    🔧 Become a Provider
                  </Link>
                </>
              ) : isCustomer ? (
                <>
                  <Link href="/services" className="btn btn-primary" style={ctaBtnStyle}>
                    🔍 Book a Service
                  </Link>
                  <Link href="/dashboard/user" className="btn btn-secondary" style={ctaBtnStyle}>
                    📊 My Dashboard
                  </Link>
                </>
              ) : isProvider ? (
                <>
                  <Link href="/dashboard/provider" className="btn btn-primary" style={ctaBtnStyle}>
                    📊 Provider Dashboard
                  </Link>
                  <Link href="/provider/profile" className="btn btn-secondary" style={ctaBtnStyle}>
                    ⚙️ Manage Profile
                  </Link>
                </>
              ) : (
                <Link href="/services" className="btn btn-primary" style={ctaBtnStyle}>
                  🔍 Explore Services
                </Link>
              )}
            </div>
            
            <div style={ctaStatsStyle}>
              <div style={ctaStatStyle}>
                <span style={ctaStatValueStyle}>4.8/5</span>
                <span style={ctaStatLabelStyle}>Average Rating</span>
              </div>
              <div style={ctaStatStyle}>
                <span style={ctaStatValueStyle}>15 min</span>
                <span style={ctaStatLabelStyle}>Avg Response</span>
              </div>
              <div style={ctaStatStyle}>
                <span style={ctaStatValueStyle}>24/7</span>
                <span style={ctaStatLabelStyle}>Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RoleBasedLayout>
  )
}

/* ==================== STYLES ==================== */

// Hero Section
const heroStyle = {
  background: '#FFFFFF',
  padding: '80px 0 60px',
  borderBottom: '1px solid #E8EAED'
}

const heroContentStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '60px',
  alignItems: 'center'
}

const heroTextStyle = {
  animation: 'fadeInUp 0.6s ease-out'
}

const heroTaglineStyle = {
  display: 'inline-block',
  background: '#E8F3FF',
  color: '#0A66FF',
  padding: '8px 16px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: '600',
  marginBottom: '24px'
}

const heroTitleStyle = {
  fontSize: '48px',
  fontWeight: '700',
  color: '#111111',
  marginBottom: '24px',
  lineHeight: '1.2'
}

const heroSubtitleStyle = {
  fontSize: '18px',
  color: '#555555',
  marginBottom: '40px',
  lineHeight: '1.6',
  maxWidth: '500px'
}

const searchBarContainerStyle = {
  marginBottom: '32px'
}

const searchBarStyle = {
  display: 'flex',
  gap: '8px',
  marginBottom: '16px'
}

const searchInputGroupStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  background: '#F7F9FC',
  borderRadius: '10px',
  border: '1px solid #E8EAED',
  paddingLeft: '16px'
}

const searchIconStyle = {
  fontSize: '18px',
  marginRight: '8px'
}

const searchInputStyle = {
  flex: 1,
  border: 'none',
  background: 'transparent',
  padding: '12px 0',
  fontSize: '15px',
  color: '#111111',
  outline: 'none'
}

const searchBtnStyle = {
  padding: '12px 32px',
  minWidth: '150px'
}

const searchTagsStyle = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap'
}

const tagStyle = {
  background: '#F7F9FC',
  border: '1px solid #D2D3D5',
  color: '#555555',
  padding: '8px 16px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap'
}

const trustIndicatorsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}

const trustItemStyle = {
  color: '#555555',
  fontSize: '14px',
  fontWeight: '500'
}

const heroStatsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
  animation: 'fadeInUp 0.6s ease-out 0.2s both'
}

const statCardStyle = {
  background: '#F7F9FC',
  padding: '28px',
  borderRadius: '14px',
  border: '1px solid #E8EAED',
  textAlign: 'center',
  opacity: 0,
  transform: 'translateY(20px)',
  animation: 'fadeInUp 0.6s ease-out forwards'
}

const statIconStyle = {
  fontSize: '36px',
  marginBottom: '12px'
}

const statValueStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#0A66FF',
  display: 'block',
  marginBottom: '4px'
}

const statLabelStyle = {
  fontSize: '13px',
  color: '#888888',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

// How It Works Section
const howItWorksStyle = {
  background: '#F7F9FC',
  padding: '80px 0'
}

const sectionHeaderStyle = {
  textAlign: 'center',
  marginBottom: '60px',
  animation: 'fadeInUp 0.6s ease-out'
}

const sectionTitleStyle = {
  fontSize: '40px',
  fontWeight: '700',
  color: '#111111',
  marginBottom: '12px'
}

const sectionSubtitleStyle = {
  fontSize: '16px',
  color: '#555555',
  maxWidth: '600px',
  margin: '0 auto'
}

const stepsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '40px'
}

const stepCardStyle = {
  background: 'white',
  padding: '40px 28px',
  borderRadius: '16px',
  border: '1px solid #E8EAED',
  textAlign: 'center',
  opacity: 0,
  transform: 'translateY(20px)',
  animation: 'fadeInUp 0.6s ease-out forwards',
  position: 'relative'
}

const stepNumberStyle = {
  position: 'absolute',
  top: '-16px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '32px',
  height: '32px',
  background: '#0A66FF',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '700',
  fontSize: '14px'
}

const stepEmojiStyle = {
  fontSize: '40px',
  marginBottom: '16px',
  display: 'block'
}

const stepTitleStyle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#111111',
  marginBottom: '12px'
}

const stepDescStyle = {
  color: '#555555',
  fontSize: '14px'
}

// Services Section
const servicesStyle = {
  background: 'white',
  padding: '80px 0'
}

const servicesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '24px'
}

const serviceCardStyle = {
  background: 'white',
  border: '1px solid #E8EAED',
  borderRadius: '14px',
  padding: '28px 20px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  opacity: 0,
  transform: 'translateY(20px)'
}

const serviceIconStyle = {
  fontSize: '48px',
  marginBottom: '16px',
  display: 'block'
}

const serviceNameStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#111111',
  marginBottom: '8px'
}

const serviceDescStyle = {
  color: '#555555',
  fontSize: '13px',
  marginBottom: '16px',
  lineHeight: '1.5'
}

const serviceMetricsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  marginBottom: '16px',
  paddingBottom: '16px',
  borderBottom: '1px solid #E8EAED'
}

const metricStyle = {
  fontSize: '12px',
  color: '#555555'
}

const urgentBadgeStyle = {
  background: '#FFF3CD',
  color: '#856404',
  padding: '6px 12px',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: '600',
  display: 'inline-block',
  marginBottom: '12px'
}

const bookNowStyle = {
  color: '#0A66FF',
  fontWeight: '600',
  fontSize: '14px',
  marginTop: 'auto'
}

// Providers Section
const providersStyle = {
  background: '#F7F9FC',
  padding: '80px 0'
}

const providersGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px'
}

const providerCardStyle = {
  background: 'white',
  border: '1px solid #E8EAED',
  borderRadius: '14px',
  padding: '24px',
  opacity: 0,
  transform: 'translateY(20px)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}

const providerHeaderStyle = {
  display: 'flex',
  gap: '16px',
  marginBottom: '20px'
}

const providerImageStyle = {
  position: 'relative',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: '#F7F9FC',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  border: '2px solid white',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
}

const verifiedBadgeStyle = {
  position: 'absolute',
  top: '-4px',
  right: '-4px',
  width: '20px',
  height: '20px',
  background: '#00B894',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
  fontWeight: '700',
  border: '2px solid white'
}

const statusDotStyle = {
  position: 'absolute',
  bottom: '0px',
  right: '0px',
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  border: '2px solid white'
}

const providerNameStyle = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#111111',
  marginBottom: '4px'
}

const providerServiceStyle = {
  color: '#0A66FF',
  fontWeight: '600',
  fontSize: '12px'
}

const providerRatingStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px'
}

const starsStyle = {
  display: 'flex',
  gap: '2px'
}

const ratingValueStyle = {
  fontWeight: '600',
  color: '#111111',
  fontSize: '13px'
}

const ratingCountStyle = {
  fontSize: '12px',
  color: '#888888'
}

const providerMetricsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  marginBottom: '20px',
  paddingBottom: '16px',
  borderBottom: '1px solid #E8EAED'
}

const metricItemStyle = {
  fontSize: '12px',
  color: '#555555'
}

// Testimonials Section
const testimonialsStyle = {
  background: 'white',
  padding: '80px 0'
}

const testimonialCarouselStyle = {
  position: 'relative',
  height: '280px',
  margin: '60px 0 40px'
}

const testimonialCardStyle = {
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '650px',
  transition: 'all 0.5s ease'
}

const testimonialTextStyle = {
  fontSize: '18px',
  color: '#555555',
  marginBottom: '30px',
  lineHeight: '1.6',
  fontStyle: 'italic',
  textAlign: 'center'
}

const testimonialAuthorStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  justifyContent: 'center'
}

const authorImageStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: '#F7F9FC',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px'
}

const authorNameStyle = {
  fontWeight: '700',
  color: '#111111',
  fontSize: '14px'
}

const authorLocationStyle = {
  fontSize: '12px',
  color: '#888888'
}

const testimonialRatingStyle = {
  display: 'flex',
  gap: '2px',
  fontSize: '14px'
}

const testimonialDotsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '12px'
}

const dotStyle = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
}

// CTA Section
const ctaStyle = {
  background: '#F7F9FC',
  padding: '80px 0'
}

const ctaContentStyle = {
  textAlign: 'center',
  opacity: 0,
  transform: 'translateY(20px)',
  animation: 'fadeInUp 0.6s ease-out forwards'
}

const ctaTitleStyle = {
  fontSize: '40px',
  fontWeight: '700',
  color: '#111111',
  marginBottom: '16px'
}

const ctaSubtitleStyle = {
  fontSize: '16px',
  color: '#555555',
  marginBottom: '40px',
  maxWidth: '600px',
  margin: '0 auto 40px'
}

const ctaButtonsStyle = {
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginBottom: '60px'
}

const ctaBtnStyle = {
  minWidth: '180px',
  fontSize: '15px'
}

const ctaStatsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '40px',
  maxWidth: '600px',
  margin: '0 auto'
}

const ctaStatStyle = {
  textAlign: 'center'
}

const ctaStatValueStyle = {
  display: 'block',
  fontSize: '24px',
  fontWeight: '700',
  color: '#0A66FF',
  marginBottom: '8px'
}

const ctaStatLabelStyle = {
  fontSize: '12px',
  color: '#888888',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

// Responsive styles for mobile
const mediaQueryStyles = `
  @media (max-width: 768px) {
    section {
      padding: 48px 0;
    }
  }
`
