import RoleBasedLayout from '../components/RoleBasedLayout'
import PincodeSearch from '../components/PincodeSearch'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { useRouter } from 'next/router'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { user, isProvider, isCustomer } = useUser()
  const router = useRouter()
  const [showPincodeSearch, setShowPincodeSearch] = useState(true)

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
              
              {/* Pincode Search - Smart Location Discovery */}
              <div style={searchBarContainerStyle}>
                <PincodeSearch
                  showFull={true}
                  onSearch={(data) => {
                    if (data) {
                      router.push(`/services?pincode=${data.pincode}&city=${data.location.city}`)
                    }
                  }}
                />
              </div>

              {/* Quick Service Tags */}
              <div style={quickServicesStyle}>
                <p style={quickServicesLabelStyle}>Or browse popular services:</p>
                <div style={searchTagsStyle}>
                  {['Plumbing', 'Electrical', 'AC Repair', 'Cleaning'].map(tag => (
                    <button
                      key={tag}
                      style={tagStyle}
                      onClick={() => {
                        setSelectedService(tag)
                        setSearchQuery(tag)
                        handleSearch()
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
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - Appears After Scrolling */}
      <section style={statsStyle}>
        <div className="container">
          <div style={sectionHeaderStyle} className="animate-on-scroll">
            <h2 style={sectionTitleStyle}>Trusted by Thousands</h2>
            <p style={sectionSubtitleStyle}>Join our growing community of satisfied customers</p>
          </div>

          <div style={statsGridStyle}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  ...statCardStyle,
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
                className="animate-on-scroll"
              >
                <div style={statIconStyle}>{stat.icon}</div>
                <div style={statValueStyle}>{stat.value}</div>
                <div style={statLabelStyle}>{stat.label}</div>
              </div>
            ))}
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

// Hero Section - Enhanced with Advanced CSS
const heroStyle = {
  background: 'linear-gradient(135deg, #0A66FF 0%, #0052CC 50%, #FF9F40 100%)',
  padding: '100px 0 80px',
  borderBottom: '1px solid #E8EAED',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 20px 60px rgba(10, 102, 255, 0.2)'
}

// Decorative background elements using CSS patterns
const heroBackgroundPattern = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.08,
  pointerEvents: 'none',
  backgroundImage: `
    repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(10, 102, 255, 0.1) 35px, rgba(10, 102, 255, 0.1) 70px),
    repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255, 159, 64, 0.1) 35px, rgba(255, 159, 64, 0.1) 70px)
  `,
  backgroundSize: '500px 500px'
}

const heroContentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '900px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 2,
  width: '100%'
}

const heroTextStyle = {
  animation: 'fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
  textAlign: 'center',
  width: '100%'
}

const heroTaglineStyle = {
  display: 'inline-block',
  background: 'linear-gradient(135deg, #E8F3FF 0%, #CCE5FF 100%)',
  color: '#0A66FF',
  padding: '10px 20px',
  borderRadius: '25px',
  fontSize: '13px',
  fontWeight: '700',
  marginBottom: '24px',
  textAlign: 'center',
  border: '1px solid #B3D9FF',
  boxShadow: '0 2px 8px rgba(10, 102, 255, 0.15)',
  animation: 'slideDown 0.6s ease-out',
  letterSpacing: '0.5px'
}

const heroTitleStyle = {
  fontSize: '56px',
  fontWeight: '800',
  marginBottom: '24px',
  lineHeight: '1.15',
  textAlign: 'center',
  animation: 'slideDown 0.8s ease-out 0.1s both',
  color: '#FFFFFF',
  textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
}

const heroSubtitleStyle = {
  fontSize: '18px',
  color: '#FFFFFF',
  marginBottom: '40px',
  lineHeight: '1.8',
  maxWidth: '600px',
  margin: '0 auto 40px auto',
  textAlign: 'center',
  animation: 'slideDown 0.8s ease-out 0.2s both',
  fontWeight: '500',
  opacity: 0.95
}

const searchBarContainerStyle = {
  marginBottom: '40px',
  display: 'flex',
  justifyContent: 'center'
}

const quickServicesStyle = {
  marginBottom: '32px',
  textAlign: 'center'
}

const quickServicesLabelStyle = {
  fontSize: '14px',
  color: '#555555',
  marginBottom: '12px',
  fontWeight: '500',
  display: 'block'
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
  gap: '12px',
  flexWrap: 'wrap',
  justifyContent: 'center'
}

const tagStyle = {
  background: 'linear-gradient(135deg, #F7F9FC 0%, #FFFFFF 100%)',
  border: '2px solid #E8EAED',
  color: '#555555',
  padding: '10px 20px',
  borderRadius: '24px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
  whiteSpace: 'nowrap',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  ':hover': {
    borderColor: '#0A66FF',
    background: 'linear-gradient(135deg, #0A66FF 0%, #0052CC 100%)',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(10, 102, 255, 0.25)'
  }
}

const trustIndicatorsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
  justifyContent: 'center'
}

const trustItemStyle = {
  color: '#FFFFFF',
  fontSize: '14px',
  fontWeight: '600',
  background: 'rgba(255, 255, 255, 0.15)',
  padding: '10px 20px',
  borderRadius: '20px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease'
}

// Statistics Section - Below Hero
const statsStyle = {
  background: '#F7F9FC',
  padding: '100px 0 80px',
  borderTop: '1px solid #E8EAED'
}

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '24px',
  maxWidth: '1000px',
  margin: '0 auto'
}

const statCardStyle = {
  background: 'linear-gradient(135deg, #FFFFFF 0%, #F7F9FC 100%)',
  padding: '40px 32px',
  borderRadius: '16px',
  border: '1px solid #E8EAED',
  textAlign: 'center',
  opacity: 0,
  transform: 'translateY(30px)',
  animation: 'fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  ':hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 28px rgba(10, 102, 255, 0.15)',
    borderColor: '#0A66FF'
  }
}

const heroStatsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
  animation: 'fadeInUp 0.6s ease-out 0.2s both'
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
  background: 'linear-gradient(180deg, #F7F9FC 0%, #FFFFFF 100%)',
  padding: '100px 0',
  position: 'relative',
  borderBottom: '1px solid #E8EAED'
}

const sectionHeaderStyle = {
  textAlign: 'center',
  marginBottom: '80px',
  animation: 'fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
}

const sectionTitleStyle = {
  fontSize: '44px',
  fontWeight: '800',
  color: '#111111',
  marginBottom: '16px',
  background: 'linear-gradient(135deg, #111111 0%, #0A66FF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}

const sectionSubtitleStyle = {
  fontSize: '17px',
  color: '#666666',
  maxWidth: '600px',
  margin: '0 auto',
  fontWeight: '500',
  lineHeight: '1.6'
}

const stepsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '40px'
}

const stepCardStyle = {
  background: 'linear-gradient(135deg, #FFFFFF 0%, #F7F9FC 100%)',
  padding: '48px 32px',
  borderRadius: '18px',
  border: '2px solid #E8EAED',
  textAlign: 'center',
  opacity: 0,
  transform: 'translateY(30px)',
  animation: 'fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
  ':hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 16px 32px rgba(10, 102, 255, 0.15)',
    borderColor: '#0A66FF'
  }
}

const stepNumberStyle = {
  position: 'absolute',
  top: '-20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '44px',
  height: '44px',
  background: 'linear-gradient(135deg, #0A66FF 0%, #0052CC 100%)',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '800',
  fontSize: '18px',
  boxShadow: '0 4px 16px rgba(10, 102, 255, 0.3)',
  border: '4px solid white'
}

const stepEmojiStyle = {
  fontSize: '48px',
  marginBottom: '20px',
  display: 'block',
  animation: 'bounce 2s ease-in-out infinite'
}

const stepTitleStyle = {
  fontSize: '22px',
  fontWeight: '800',
  color: '#111111',
  marginBottom: '12px'
}

const stepDescStyle = {
  color: '#666666',
  fontSize: '15px',
  lineHeight: '1.6'
}

// Services Section
const servicesStyle = {
  background: 'linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 100%)',
  padding: '100px 0',
  borderTop: '1px solid #E8EAED'
}

const servicesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '28px'
}

const serviceCardStyle = {
  background: 'linear-gradient(135deg, #FFFFFF 0%, #F7F9FC 100%)',
  border: '2px solid #E8EAED',
  borderRadius: '16px',
  padding: '32px 24px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  opacity: 0,
  transform: 'translateY(30px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
  ':hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 20px 40px rgba(10, 102, 255, 0.15)',
    borderColor: '#0A66FF'
  },
  ':before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #0A66FF, #FF9F40)',
    transform: 'scaleX(0)',
    transformOrigin: 'center',
    transition: 'transform 0.45s ease'
  }
}

const serviceIconStyle = {
  fontSize: '56px',
  marginBottom: '20px',
  display: 'block',
  transition: 'transform 0.4s ease',
  animation: 'float 3s ease-in-out infinite'
}

const serviceNameStyle = {
  fontSize: '20px',
  fontWeight: '800',
  color: '#111111',
  marginBottom: '10px',
  transition: 'color 0.3s ease'
}

const serviceDescStyle = {
  color: '#666666',
  fontSize: '14px',
  marginBottom: '18px',
  lineHeight: '1.6',
  fontWeight: '500'
}

const serviceMetricsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '20px',
  paddingBottom: '20px',
  borderBottom: '2px solid #E8EAED'
}

const metricStyle = {
  fontSize: '13px',
  color: '#0A66FF',
  fontWeight: '600'
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
  background: 'linear-gradient(180deg, #F7F9FC 0%, #FFFFFF 100%)',
  padding: '100px 0',
  borderTop: '1px solid #E8EAED'
}

const providersGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '28px'
}

const providerCardStyle = {
  background: 'linear-gradient(135deg, #FFFFFF 0%, #F7F9FC 100%)',
  border: '2px solid #E8EAED',
  borderRadius: '16px',
  padding: '28px',
  opacity: 0,
  transform: 'translateY(30px)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
  ':hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 20px 40px rgba(10, 102, 255, 0.15)',
    borderColor: '#0A66FF'
  }
}

const providerHeaderStyle = {
  display: 'flex',
  gap: '16px',
  marginBottom: '20px'
}

const providerImageStyle = {
  position: 'relative',
  width: '68px',
  height: '68px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #0A66FF 0%, #0052CC 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '28px',
  border: '3px solid white',
  boxShadow: '0 4px 12px rgba(10, 102, 255, 0.2)',
  flexShrink: 0,
  transition: 'transform 0.3s ease'
}

const verifiedBadgeStyle = {
  position: 'absolute',
  top: '-6px',
  right: '-6px',
  width: '24px',
  height: '24px',
  background: 'linear-gradient(135deg, #00B894 0%, #009973 100%)',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: '800',
  border: '3px solid white',
  boxShadow: '0 2px 8px rgba(0, 184, 148, 0.2)'
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
  fontSize: '18px',
  fontWeight: '800',
  color: '#111111',
  marginBottom: '4px'
}

const providerServiceStyle = {
  color: '#0A66FF',
  fontWeight: '700',
  fontSize: '13px',
  letterSpacing: '0.5px'
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
