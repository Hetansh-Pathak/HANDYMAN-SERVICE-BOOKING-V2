import Link from 'next/link'
import {
  VerifiedBadge,
  AvailabilityBadge,
  ResponseTimeBadge,
  ExperienceBadge,
  ProviderStatusDot,
  TopRatedBadge
} from './ServiceBadges'

export default function ProviderCard({
  provider,
  variant = 'default', // 'default' | 'featured' | 'compact'
  onBook = null,
  showAvailability = true
}) {
  const handleBookClick = (e) => {
    e.preventDefault()
    if (onBook) onBook(provider)
  }

  if (variant === 'compact') {
    return <CompactProviderCard provider={provider} onBook={handleBookClick} />
  }

  if (variant === 'featured') {
    return <FeaturedProviderCard provider={provider} onBook={handleBookClick} />
  }

  return <DefaultProviderCard provider={provider} onBook={handleBookClick} showAvailability={showAvailability} />
}

/**
 * Default Provider Card - Used in listings
 */
function DefaultProviderCard({ provider, onBook, showAvailability = true }) {
  const rating = Math.floor(provider.rating)

  return (
    <div style={cardStyle}>
      {/* Card Header with Profile */}
      <div style={cardHeaderStyle}>
        <div style={profileSectionStyle}>
          <div style={profileImageContainerStyle}>
            <div style={profileImageStyle}>
              {provider.image}
            </div>
            <ProviderStatusDot isOnline={provider.available} />
            {provider.verified && (
              <div style={verifiedBadgePositionStyle}>
                <span style={verifiedCheckStyle}>✓</span>
              </div>
            )}
          </div>

          <div style={profileInfoStyle}>
            <h3 style={providerNameStyle}>{provider.name}</h3>
            <p style={serviceStyle}>{provider.service}</p>
            {provider.verified && (
              <div style={badgeRowStyle}>
                <VerifiedBadge />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div style={ratingContainerStyle}>
        <div style={starsContainerStyle}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{
              color: i < rating ? '#FFA500' : '#D2D3D5',
              fontSize: '16px'
            }}>★</span>
          ))}
        </div>
        <div style={ratingTextStyle}>
          <span style={ratingValueStyle}>{provider.rating}</span>
          <span style={reviewsCountStyle}>({provider.reviews || provider.jobs} reviews)</span>
        </div>
      </div>

      {/* Description */}
      {provider.description && (
        <p style={descriptionStyle}>{provider.description}</p>
      )}

      {/* Stats Grid */}
      <div style={statsGridStyle}>
        <div style={statItemStyle}>
          <span style={statIconStyle}>🎯</span>
          <div>
            <p style={statValueStyle}>{provider.jobs}</p>
            <p style={statLabelStyle}>Jobs Done</p>
          </div>
        </div>
        <div style={statItemStyle}>
          <span style={statIconStyle}>⏱️</span>
          <div>
            <p style={statValueStyle}>{provider.responseTime}</p>
            <p style={statLabelStyle}>Response</p>
          </div>
        </div>
        <div style={statItemStyle}>
          <span style={statIconStyle}>📅</span>
          <div>
            <p style={statValueStyle}>{provider.experience}+</p>
            <p style={statLabelStyle}>Years Exp</p>
          </div>
        </div>
      </div>

      {/* Availability Badges */}
      {showAvailability && (
        <div style={badgesContainerStyle}>
          {provider.available && (
            <AvailabilityBadge available={true} text="Available Today" />
          )}
          {provider.emergencyAvailable && (
            <div style={emergencyBadgeStyle}>⚡ Emergency</div>
          )}
        </div>
      )}

      {/* Price & Action */}
      <div style={priceActionStyle}>
        <div>
          <p style={priceFromStyle}>Starting from</p>
          <p style={priceValueStyle}>₹{provider.price}</p>
        </div>
        <div style={actionsStyle}>
          <Link href={`/provider/${provider.id}`} style={viewProfileBtnStyle}>
            View Profile
          </Link>
          {provider.available ? (
            <button style={bookNowBtnStyle} onClick={onBook}>
              Book Now
            </button>
          ) : (
            <button style={unavailableBtnStyle} disabled>
              Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Featured Provider Card - Prominent display on home page
 */
function FeaturedProviderCard({ provider, onBook }) {
  const rating = Math.floor(provider.rating)

  return (
    <div style={featuredCardStyle}>
      <div style={featuredHeaderStyle}>
        <div style={featuredImageContainerStyle}>
          <div style={featuredImageStyle}>{provider.image}</div>
          {provider.verified && (
            <div style={featuredVerifiedBadgeStyle}>✓</div>
          )}
          <ProviderStatusDot isOnline={provider.available} />
        </div>
      </div>

      <div style={featuredContentStyle}>
        <h3 style={featuredNameStyle}>{provider.name}</h3>
        <p style={featuredServiceStyle}>{provider.service} Specialist</p>

        <div style={featuredRatingStyle}>
          <div style={starsContainerStyle}>
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{
                color: i < rating ? '#FFA500' : '#D2D3D5',
                fontSize: '14px'
              }}>★</span>
            ))}
          </div>
          <span style={featuredRatingValueStyle}>{provider.rating}</span>
          <span style={featuredReviewsStyle}>({provider.jobs} jobs)</span>
        </div>

        <div style={featuredStatsStyle}>
          <div style={featuredStatStyle}>⏱️ {provider.responseTime}</div>
          <div style={featuredStatStyle}>📅 {provider.experience}y</div>
        </div>

        <button style={featuredBookBtnStyle} onClick={onBook}>
          {provider.available ? '📞 Book Now' : 'View Profile'}
        </button>
      </div>
    </div>
  )
}

/**
 * Compact Provider Card - Used in horizontal scrolling lists
 */
function CompactProviderCard({ provider, onBook }) {
  return (
    <div style={compactCardStyle}>
      <div style={compactImageStyle}>
        {provider.image}
        {provider.verified && (
          <div style={compactVerifiedStyle}>✓</div>
        )}
      </div>
      <div style={compactNameStyle}>{provider.name}</div>
      <div style={compactServiceStyle}>{provider.service}</div>
      <div style={compactRatingStyle}>
        <span>⭐ {provider.rating}</span>
      </div>
      <button style={compactBookBtnStyle} onClick={onBook}>
        Book
      </button>
    </div>
  )
}

// ==================== STYLES ====================

// Default Card Styles
const cardStyle = {
  background: '#FFFFFF',
  border: '1px solid #E8EAED',
  borderRadius: '16px',
  padding: '20px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden'
}

const cardHeaderStyle = {
  marginBottom: '16px'
}

const profileSectionStyle = {
  display: 'flex',
  gap: '12px'
}

const profileImageContainerStyle = {
  position: 'relative',
  flexShrink: 0
}

const profileImageStyle = {
  width: '56px',
  height: '56px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #f0f4ff, #e8eef9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '28px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
}

const verifiedBadgePositionStyle = {
  position: 'absolute',
  bottom: '-4px',
  right: '-4px',
  width: '22px',
  height: '22px',
  background: '#00B894',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid white'
}

const verifiedCheckStyle = {
  fontSize: '12px',
  fontWeight: 'bold'
}

const profileInfoStyle = {
  flex: 1,
  minWidth: 0
}

const providerNameStyle = {
  margin: 0,
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

const badgeRowStyle = {
  marginTop: '6px'
}

const ratingContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px',
  paddingBottom: '12px',
  borderBottom: '1px solid #E8EAED'
}

const starsContainerStyle = {
  display: 'flex',
  gap: '2px'
}

const ratingTextStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginLeft: 'auto'
}

const ratingValueStyle = {
  fontWeight: '700',
  color: '#111111',
  fontSize: '13px'
}

const reviewsCountStyle = {
  fontSize: '12px',
  color: '#888888'
}

const descriptionStyle = {
  fontSize: '13px',
  color: '#555555',
  lineHeight: '1.5',
  marginBottom: '12px',
  margin: '0 0 12px'
}

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '12px',
  marginBottom: '12px',
  paddingBottom: '12px',
  borderBottom: '1px solid #E8EAED'
}

const statItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px'
}

const statIconStyle = {
  fontSize: '16px',
  marginTop: '2px'
}

const statValueStyle = {
  margin: 0,
  fontSize: '14px',
  fontWeight: '700',
  color: '#111111'
}

const statLabelStyle = {
  margin: 0,
  fontSize: '11px',
  color: '#888888',
  marginTop: '2px'
}

const badgesContainerStyle = {
  display: 'flex',
  gap: '8px',
  marginBottom: '12px',
  flexWrap: 'wrap'
}

const emergencyBadgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '11px',
  fontWeight: '600',
  background: 'rgba(255, 107, 53, 0.1)',
  color: '#FF6B35',
  animation: 'pulse 2s infinite'
}

const priceActionStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  paddingTop: '12px'
}

const priceFromStyle = {
  margin: 0,
  fontSize: '12px',
  color: '#888888'
}

const priceValueStyle = {
  margin: '4px 0 0',
  fontSize: '18px',
  fontWeight: '700',
  color: '#0A66FF'
}

const actionsStyle = {
  display: 'flex',
  gap: '8px'
}

const viewProfileBtnStyle = {
  padding: '8px 14px',
  background: '#E8F3FF',
  color: '#0A66FF',
  border: '1px solid #0A66FF',
  borderRadius: '8px',
  cursor: 'pointer',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '13px',
  textAlign: 'center',
  transition: 'all 0.2s ease'
}

const bookNowBtnStyle = {
  padding: '8px 16px',
  background: '#0A66FF',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '13px',
  transition: 'all 0.2s ease'
}

const unavailableBtnStyle = {
  padding: '8px 16px',
  background: '#F7F9FC',
  color: '#888888',
  border: '1px solid #E8EAED',
  borderRadius: '8px',
  cursor: 'not-allowed',
  fontWeight: '600',
  fontSize: '13px'
}

// Featured Card Styles
const featuredCardStyle = {
  background: 'white',
  border: '1px solid #E8EAED',
  borderRadius: '16px',
  padding: '20px',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}

const featuredHeaderStyle = {
  marginBottom: '16px'
}

const featuredImageContainerStyle = {
  position: 'relative',
  marginBottom: '12px'
}

const featuredImageStyle = {
  width: '80px',
  height: '80px',
  margin: '0 auto',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #f0f4ff, #e8eef9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '36px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
}

const featuredVerifiedBadgeStyle = {
  position: 'absolute',
  top: '-6px',
  right: '-6px',
  width: '28px',
  height: '28px',
  background: '#00B894',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  border: '3px solid white'
}

const featuredContentStyle = {
  flex: 1
}

const featuredNameStyle = {
  margin: 0,
  fontSize: '16px',
  fontWeight: '700',
  color: '#111111'
}

const featuredServiceStyle = {
  margin: '4px 0 8px',
  fontSize: '13px',
  color: '#0A66FF',
  fontWeight: '600'
}

const featuredRatingStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  marginBottom: '12px'
}

const featuredRatingValueStyle = {
  fontWeight: '700',
  color: '#111111',
  fontSize: '13px'
}

const featuredReviewsStyle = {
  fontSize: '12px',
  color: '#888888'
}

const featuredStatsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  marginBottom: '16px',
  padding: '12px 0',
  borderTop: '1px solid #E8EAED',
  borderBottom: '1px solid #E8EAED'
}

const featuredStatStyle = {
  fontSize: '12px',
  color: '#555555'
}

const featuredBookBtnStyle = {
  width: '100%',
  padding: '12px 16px',
  background: '#0A66FF',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '14px',
  transition: 'all 0.2s ease'
}

// Compact Card Styles
const compactCardStyle = {
  background: 'white',
  border: '1px solid #E8EAED',
  borderRadius: '12px',
  padding: '12px',
  textAlign: 'center',
  transition: 'all 0.2s ease',
  minWidth: '140px',
  flexShrink: 0
}

const compactImageStyle = {
  position: 'relative',
  width: '48px',
  height: '48px',
  margin: '0 auto 8px',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, #f0f4ff, #e8eef9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px'
}

const compactVerifiedStyle = {
  position: 'absolute',
  bottom: '-4px',
  right: '-4px',
  width: '18px',
  height: '18px',
  background: '#00B894',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '10px',
  fontWeight: 'bold',
  border: '2px solid white'
}

const compactNameStyle = {
  fontSize: '13px',
  fontWeight: '700',
  color: '#111111',
  marginBottom: '4px'
}

const compactServiceStyle = {
  fontSize: '11px',
  color: '#0A66FF',
  fontWeight: '600',
  marginBottom: '6px'
}

const compactRatingStyle = {
  fontSize: '12px',
  color: '#555555',
  marginBottom: '8px'
}

const compactBookBtnStyle = {
  width: '100%',
  padding: '6px 12px',
  background: '#0A66FF',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '12px',
  transition: 'all 0.2s ease'
}
