/**
 * Service Badge Components
 * Displays service availability, emergency status, and other indicators
 */

export function AvailabilityBadge({ available = true, text = 'Available Today' }) {
  return (
    <div style={{
      ...badgeStyle,
      ...(available ? availableBadgeStyle : unavailableBadgeStyle)
    }} className="badge badge-available">
      <span style={badgeIconStyle}>
        {available ? '✓' : '✕'}
      </span>
      {text}
    </div>
  )
}

export function EmergencyBadge({ available = true }) {
  return (
    <div style={{
      ...badgeStyle,
      ...emergencyBadgeStyle
    }} className="badge badge-emergency">
      <span style={badgeIconStyle}>
        ⚡
      </span>
      Emergency Service
    </div>
  )
}

export function VerifiedBadge() {
  return (
    <div style={{
      ...badgeStyle,
      ...verifiedBadgeStyle
    }} className="badge badge-primary">
      <span style={badgeIconStyle}>
        ✓
      </span>
      Verified
    </div>
  )
}

export function TopRatedBadge({ rating = 4.8 }) {
  return (
    <div style={{
      ...badgeStyle,
      ...topRatedBadgeStyle
    }} className="badge badge-warning">
      <span style={badgeIconStyle}>
        ★
      </span>
      Top Rated {rating.toFixed(1)}
    </div>
  )
}

export function ResponseTimeBadge({ minutes = 15 }) {
  return (
    <div style={{
      ...badgeStyle,
      ...responseTimeBadgeStyle
    }} className="badge badge-primary">
      <span style={badgeIconStyle}>
        ⏱️
      </span>
      {minutes} min response
    </div>
  )
}

export function DistanceBadge({ distance = 'Near You' }) {
  return (
    <div style={{
      ...badgeStyle,
      ...distanceBadgeStyle
    }} className="badge badge-primary">
      <span style={badgeIconStyle}>
        📍
      </span>
      {distance}
    </div>
  )
}

export function ServiceCoverageIndicator({ coverage = 'primary' }) {
  if (coverage === 'primary') {
    return (
      <div style={coverageStyle}>
        <span style={coverageIconStyle}>🎯</span>
        <span>Full Service Coverage</span>
      </div>
    )
  }

  return (
    <div style={coverageStyle}>
      <span style={coverageIconStyle}>📊</span>
      <span>Limited Coverage</span>
    </div>
  )
}

export function ExperienceBadge({ years = 5 }) {
  return (
    <div style={{
      ...badgeStyle,
      ...experienceBadgeStyle
    }} className="badge badge-success">
      <span style={badgeIconStyle}>
        👤
      </span>
      {years}+ yrs experience
    </div>
  )
}

/**
 * Provider Status Indicator
 * Shows online/offline status with animation
 */
export function ProviderStatusDot({ isOnline = true }) {
  return (
    <div style={{
      ...statusDotStyle,
      background: isOnline ? '#00B894' : '#DC3545',
      ...(isOnline ? { animation: 'glow 2s infinite' } : {})
    }}
    title={isOnline ? 'Online' : 'Offline'}
    />
  )
}

/**
 * Service Category Badge
 */
export function ServiceCategoryBadge({ category = 'Plumbing', icon = '🔧' }) {
  return (
    <div style={categoryBadgeStyle}>
      <span style={{ fontSize: '16px', marginRight: '4px' }}>{icon}</span>
      {category}
    </div>
  )
}

// Base Styles
const badgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '600',
  whiteSpace: 'nowrap',
  transition: 'all 0.2s ease'
}

const badgeIconStyle = {
  fontSize: '13px',
  display: 'flex',
  alignItems: 'center'
}

const availableBadgeStyle = {
  background: 'rgba(0, 184, 148, 0.1)',
  color: '#00B894',
  border: '1px solid rgba(0, 184, 148, 0.2)'
}

const unavailableBadgeStyle = {
  background: 'rgba(220, 53, 69, 0.1)',
  color: '#DC3545',
  border: '1px solid rgba(220, 53, 69, 0.2)'
}

const emergencyBadgeStyle = {
  background: 'rgba(255, 107, 53, 0.1)',
  color: '#FF6B35',
  border: '1px solid rgba(255, 107, 53, 0.2)',
  animation: 'pulse 2s infinite'
}

const verifiedBadgeStyle = {
  background: 'rgba(10, 102, 255, 0.1)',
  color: '#0A66FF',
  border: '1px solid rgba(10, 102, 255, 0.2)'
}

const topRatedBadgeStyle = {
  background: 'rgba(255, 165, 0, 0.1)',
  color: '#FF9800',
  border: '1px solid rgba(255, 165, 0, 0.2)'
}

const responseTimeBadgeStyle = {
  background: 'rgba(10, 102, 255, 0.1)',
  color: '#0A66FF',
  border: '1px solid rgba(10, 102, 255, 0.2)'
}

const distanceBadgeStyle = {
  background: 'rgba(76, 175, 80, 0.1)',
  color: '#4CAF50',
  border: '1px solid rgba(76, 175, 80, 0.2)'
}

const experienceBadgeStyle = {
  background: 'rgba(0, 184, 148, 0.1)',
  color: '#00B894',
  border: '1px solid rgba(0, 184, 148, 0.2)'
}

const coverageStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 12px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '600',
  background: '#E8F3FF',
  color: '#0A66FF',
  border: '1px solid rgba(10, 102, 255, 0.2)',
  width: 'fit-content'
}

const coverageIconStyle = {
  fontSize: '14px'
}

const statusDotStyle = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  border: '2px solid white',
  boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)'
}

const categoryBadgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 14px',
  borderRadius: '16px',
  fontSize: '13px',
  fontWeight: '600',
  background: '#F7F9FC',
  color: '#555555',
  border: '1px solid #E8EAED',
  whiteSpace: 'nowrap',
  width: 'fit-content'
}
