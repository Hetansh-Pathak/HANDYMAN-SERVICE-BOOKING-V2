import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import PincodeSearch from '../../components/PincodeSearch'
import { useRouter } from 'next/router'
import { getServiceAvailability } from '../../lib/pincodeService'
import { useUser } from '../../context/UserContext'

export default function ServicesPage() {
  const router = useRouter()
  const { user } = useUser()
  const { search, pincode, city } = router.query
  const [filters, setFilters] = useState({
    searchTerm: search || '',
    service: '',
    minPrice: 0,
    maxPrice: 5000,
    rating: 0,
    sortBy: 'rating',
    pincode: pincode || '',
    city: city || ''
  })
  const [providers, setProviders] = useState([])
  const [filteredProviders, setFilteredProviders] = useState([])
  const [pincodeStatus, setPincodeStatus] = useState(null)

  // Mock providers data
  const mockProviders = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      service: 'Plumbing',
      rating: 4.8,
      reviews: 156,
      jobs: 245,
      price: 500,
      image: '👨‍🔧',
      verified: true,
      available: true,
      experience: 8,
      responseTime: '15 min',
      description: 'Expert plumber with 8 years of experience'
    },
    {
      id: 2,
      name: 'Amit Sharma',
      service: 'Electrical',
      rating: 4.9,
      reviews: 312,
      jobs: 312,
      price: 600,
      image: '👨‍🔬',
      verified: true,
      available: true,
      experience: 12,
      responseTime: '20 min',
      description: 'Certified electrical expert'
    },
    {
      id: 3,
      name: 'Priya Singh',
      service: 'Cleaning',
      rating: 4.7,
      reviews: 189,
      jobs: 189,
      price: 300,
      image: '👩‍💼',
      verified: true,
      available: false,
      experience: 5,
      responseTime: '25 min',
      description: 'Professional cleaning services'
    },
    {
      id: 4,
      name: 'Vikram Patel',
      service: 'Carpentry',
      rating: 4.6,
      reviews: 142,
      jobs: 198,
      price: 800,
      image: '👨‍🔧',
      verified: true,
      available: true,
      experience: 10,
      responseTime: '30 min',
      description: 'Skilled carpenter for all projects'
    },
    {
      id: 5,
      name: 'Neha Gupta',
      service: 'AC Repair',
      rating: 4.9,
      reviews: 267,
      jobs: 298,
      price: 700,
      image: '👩‍💼',
      verified: true,
      available: true,
      experience: 11,
      responseTime: '15 min',
      description: 'AC maintenance and repair expert'
    },
    {
      id: 6,
      name: 'Arjun Singh',
      service: 'Painting',
      rating: 4.5,
      reviews: 98,
      jobs: 145,
      price: 400,
      image: '👨‍🎨',
      verified: false,
      available: true,
      experience: 6,
      responseTime: '40 min',
      description: 'Interior and exterior painting'
    }
  ]

  useEffect(() => {
    setProviders(mockProviders)
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = providers.filter(provider => {
      // Search filter
      if (filters.searchTerm && !provider.service.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !provider.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false
      }

      // Service filter
      if (filters.service && provider.service !== filters.service) {
        return false
      }

      // Price filter
      if (provider.price < filters.minPrice || provider.price > filters.maxPrice) {
        return false
      }

      // Rating filter
      if (provider.rating < filters.rating) {
        return false
      }

      return true
    })

    // Sort
    if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (filters.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === 'experience') {
      filtered.sort((a, b) => b.experience - a.experience)
    }

    setFilteredProviders(filtered)
  }, [filters, providers])

  const services = [...new Set(mockProviders.map(p => p.service))]

  const handlePincodeSearch = (data) => {
    if (data) {
      setPincodeStatus(getServiceAvailability(data.pincode))
      setFilters(prev => ({
        ...prev,
        pincode: data.pincode,
        city: data.location.city
      }))
    }
  }

  const handleBookNow = (provider) => {
    if (!user) {
      // Redirect to login with the booking URL as redirect
      router.push(`/auth/login?redirect=${encodeURIComponent(`/book/${provider.id}`)}`)
      return
    }
    // Redirect to booking page
    router.push(`/book/${provider.id}`)
  }

  return (
    <Layout title="Find Service Providers - HandyFix">
      <div style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Find Service Providers</h1>
          <p style={subtitleStyle}>Choose from verified professionals near you</p>
        </div>

        <div className="container" style={pincodeSearchWrapperStyle}>
          <PincodeSearch
            onSearch={handlePincodeSearch}
            showFull={false}
          />
        </div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px', marginTop: '40px' }}>
          {/* Filters Sidebar */}
          <div style={sidebarStyle}>
            <h3 style={filterTitleStyle}>Filters</h3>

            {/* Search */}
            <div style={filterGroupStyle}>
              <label style={filterLabelStyle}>Search</label>
              <input
                type="text"
                className="form-input"
                placeholder="Provider name or service"
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
              />
            </div>

            {/* Service Filter */}
            <div style={filterGroupStyle}>
              <label style={filterLabelStyle}>Service Type</label>
              <select
                className="form-input"
                value={filters.service}
                onChange={(e) => setFilters({ ...filters, service: e.target.value })}
              >
                <option value="">All Services</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div style={filterGroupStyle}>
              <label style={filterLabelStyle}>Price Range</label>
              <div style={priceInputsStyle}>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                />
                <input
                  type="number"
                  className="form-input"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                />
              </div>
              <p style={priceDisplayStyle}>₹{filters.minPrice} - ₹{filters.maxPrice}</p>
            </div>

            {/* Rating Filter */}
            <div style={filterGroupStyle}>
              <label style={filterLabelStyle}>Minimum Rating</label>
              <select
                className="form-input"
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
              >
                <option value={0}>All Ratings</option>
                <option value={4.5}>4.5+ ⭐</option>
                <option value={4}>4+ ⭐</option>
                <option value={3.5}>3.5+ ⭐</option>
              </select>
            </div>

            {/* Sort By */}
            <div style={filterGroupStyle}>
              <label style={filterLabelStyle}>Sort By</label>
              <select
                className="form-input"
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              >
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="experience">Most Experienced</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button
              style={resetBtnStyle}
              onClick={() => setFilters({
                searchTerm: '',
                service: '',
                minPrice: 0,
                maxPrice: 5000,
                rating: 0,
                sortBy: 'rating'
              })}
            >
              Reset Filters
            </button>
          </div>

          {/* Results */}
          <div>
            <div style={resultHeaderStyle}>
              <h2 style={resultTitleStyle}>
                {filteredProviders.length} {filteredProviders.length === 1 ? 'Provider' : 'Providers'} Found
              </h2>
            </div>

            <div style={providersGridStyle}>
              {filteredProviders.length > 0 ? (
                filteredProviders.map(provider => (
                  <div key={provider.id} style={providerCardStyle}>
                    <div style={cardHeaderStyle}>
                      <div style={profileImageStyle}>
                        {provider.image}
                        {provider.verified && <span style={verifiedBadgeStyle}>✓</span>}
                      </div>
                      <div style={providerInfoStyle}>
                        <h3 style={providerNameStyle}>{provider.name}</h3>
                        <p style={serviceStyle}>{provider.service}</p>
                        <div style={ratingStyle}>
                          <span style={starsStyle}>{'⭐'.repeat(Math.floor(provider.rating))}</span>
                          <span style={ratingValueStyle}>{provider.rating} ({provider.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <div style={descriptionStyle}>
                      {provider.description}
                    </div>

                    <div style={statsGridStyle}>
                      <div style={statStyle}>
                        <span style={statIconStyle}>🎯</span>
                        <div>
                          <p style={statLabelStyle}>{provider.jobs} Jobs</p>
                        </div>
                      </div>
                      <div style={statStyle}>
                        <span style={statIconStyle}>⏱️</span>
                        <div>
                          <p style={statLabelStyle}>{provider.responseTime}</p>
                        </div>
                      </div>
                      <div style={statStyle}>
                        <span style={statIconStyle}>👤</span>
                        <div>
                          <p style={statLabelStyle}>{provider.experience}y exp</p>
                        </div>
                      </div>
                    </div>

                    <div style={priceAndActionStyle}>
                      <div>
                        <p style={priceLabel}>Starting from</p>
                        <p style={priceValueStyle}>₹{provider.price}</p>
                      </div>
                      <div style={actionButtonsStyle}>
                        <Link href={`/provider/${provider.id}`} style={viewProfileBtn}>
                          View Profile
                        </Link>
                        {provider.available ? (
                          <button style={bookNowBtn}>Book Now</button>
                        ) : (
                          <button style={unavailableBtn} disabled>Unavailable</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={noResultsStyle}>
                  <p style={noResultsTextStyle}>No providers found matching your filters.</p>
                  <button
                    style={resetBtnStyle}
                    onClick={() => setFilters({
                      searchTerm: '',
                      service: '',
                      minPrice: 0,
                      maxPrice: 5000,
                      rating: 0,
                      sortBy: 'rating'
                    })}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Styles
const pageStyle = {
  background: '#F7F9FC',
  minHeight: '100vh',
  padding: '60px 0'
}

const pincodeSearchWrapperStyle = {
  marginBottom: '24px'
}

const headerStyle = {
  textAlign: 'center',
  marginBottom: '40px',
  background: '#FFFFFF',
  color: '#111111',
  padding: '60px 20px',
  borderBottom: '1px solid #E8EAED'
}

const titleStyle = {
  fontSize: '40px',
  fontWeight: '700',
  margin: '0 0 12px',
  color: '#111111'
}

const subtitleStyle = {
  fontSize: '16px',
  color: '#555555',
  margin: '0'
}

const sidebarStyle = {
  background: 'white',
  padding: '24px',
  borderRadius: '14px',
  height: 'fit-content',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  border: '1px solid #E8EAED',
  position: 'sticky',
  top: '100px'
}

const filterTitleStyle = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#111111',
  marginBottom: '24px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const filterGroupStyle = {
  marginBottom: '20px',
  paddingBottom: '20px',
  borderBottom: '1px solid #E8EAED'
}

const filterGroupStyle_last = {
  marginBottom: '24px'
}

const filterLabelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '600',
  color: '#111111',
  fontSize: '13px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const priceInputsStyle = {
  display: 'flex',
  gap: '8px'
}

const priceDisplayStyle = {
  fontSize: '12px',
  color: '#888888',
  marginTop: '8px'
}

const resetBtnStyle = {
  width: '100%',
  padding: '10px 16px',
  background: '#FFFFFF',
  color: '#0A66FF',
  border: '2px solid #0A66FF',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '14px',
  transition: 'all 0.2s ease'
}

const resultHeaderStyle = {
  marginBottom: '24px'
}

const resultTitleStyle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#111111',
  margin: '0'
}

const providersGridStyle = {
  display: 'grid',
  gap: '20px'
}

const providerCardStyle = {
  background: 'white',
  borderRadius: '14px',
  padding: '24px',
  border: '1px solid #E8EAED',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  cursor: 'pointer'
}

const cardHeaderStyle = {
  display: 'flex',
  gap: '16px',
  marginBottom: '16px'
}

const profileImageStyle = {
  position: 'relative',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #f0f4ff, #e8eef9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '28px',
  flexShrink: 0
}

const verifiedBadgeStyle = {
  position: 'absolute',
  bottom: '-4px',
  right: '-4px',
  width: '24px',
  height: '24px',
  background: '#28a745',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: '700'
}

const providerInfoStyle = {
  flex: 1
}

const providerNameStyle = {
  margin: '0',
  fontSize: '16px',
  fontWeight: '700',
  color: '#111111'
}

const serviceStyle = {
  margin: '4px 0 0',
  fontSize: '13px',
  color: '#0A66FF',
  fontWeight: '600'
}

const ratingStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: '4px'
}

const starsStyle = {
  fontSize: '12px'
}

const ratingValueStyle = {
  fontSize: '12px',
  color: '#7f8c8d'
}

const descriptionStyle = {
  fontSize: '14px',
  color: '#495057',
  marginBottom: '16px',
  lineHeight: '1.5'
}

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',
  marginBottom: '20px',
  paddingBottom: '20px',
  borderBottom: '1px solid #e0e0e0'
}

const statStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}

const statIconStyle = {
  fontSize: '16px'
}

const statLabelStyle = {
  margin: '0',
  fontSize: '12px',
  color: '#555555'
}

const priceAndActionStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end'
}

const priceLabel = {
  margin: '0',
  fontSize: '12px',
  color: '#7f8c8d'
}

const priceValueStyle = {
  margin: '4px 0 0',
  fontSize: '20px',
  fontWeight: '700',
  color: '#28a745'
}

const actionButtonsStyle = {
  display: 'flex',
  gap: '12px'
}

const viewProfileBtn = {
  padding: '10px 16px',
  background: '#E8F3FF',
  color: '#0A66FF',
  border: '1px solid #0A66FF',
  borderRadius: '10px',
  cursor: 'pointer',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '14px',
  textAlign: 'center',
  transition: 'all 0.2s ease'
}

const bookNowBtn = {
  padding: '10px 20px',
  background: '#0A66FF',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '14px',
  transition: 'all 0.2s ease'
}

const unavailableBtn = {
  padding: '10px 20px',
  background: '#F7F9FC',
  color: '#888888',
  border: '1px solid #E8EAED',
  borderRadius: '10px',
  cursor: 'not-allowed',
  fontWeight: '600',
  fontSize: '14px'
}

const noResultsStyle = {
  textAlign: 'center',
  padding: '60px 20px',
  background: 'white',
  borderRadius: '12px',
  border: '1px solid #e0e0e0'
}

const noResultsTextStyle = {
  fontSize: '16px',
  color: '#555555',
  margin: '0 0 20px'
}
