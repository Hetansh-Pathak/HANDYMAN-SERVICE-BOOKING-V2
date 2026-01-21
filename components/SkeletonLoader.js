/**
 * Skeleton Loader Components
 * Display placeholder UI while loading data
 */

export function SkeletonProviderCard() {
  return (
    <div style={skeletonCardStyle}>
      {/* Header Skeleton */}
      <div style={skeletonHeaderStyle}>
        <div style={skeletonAvatarStyle} className="skeleton" />
        <div style={skeletonTextGroupStyle}>
          <div style={{ ...skeletonTextStyle, width: '60%' }} className="skeleton" />
          <div style={{ ...skeletonTextStyle, width: '40%', marginTop: '8px' }} className="skeleton" />
        </div>
      </div>

      {/* Rating Skeleton */}
      <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #E8EAED' }}>
        <div style={{ ...skeletonTextStyle, width: '30%' }} className="skeleton" />
      </div>

      {/* Description Skeleton */}
      <div style={skeletonDescriptionStyle}>
        <div style={skeletonTextStyle} className="skeleton" />
        <div style={skeletonTextStyle} className="skeleton" />
      </div>

      {/* Stats Skeleton */}
      <div style={skeletonStatsStyle}>
        <div style={skeletonStatStyle}>
          <div style={{ ...skeletonTextStyle, width: '60%' }} className="skeleton" />
        </div>
        <div style={skeletonStatStyle}>
          <div style={{ ...skeletonTextStyle, width: '60%' }} className="skeleton" />
        </div>
        <div style={skeletonStatStyle}>
          <div style={{ ...skeletonTextStyle, width: '60%' }} className="skeleton" />
        </div>
      </div>

      {/* Buttons Skeleton */}
      <div style={skeletonButtonGroupStyle}>
        <div style={{ ...skeletonButtonStyle, flex: 1 }} className="skeleton" />
        <div style={{ ...skeletonButtonStyle, flex: 1 }} className="skeleton" />
      </div>
    </div>
  )
}

export function SkeletonServiceCard() {
  return (
    <div style={skeletonServiceCardStyle}>
      <div style={{ ...skeletonLargeTextStyle, marginBottom: '12px' }} className="skeleton" />
      <div style={skeletonTextStyle} className="skeleton" />
      <div style={{ ...skeletonTextStyle, marginTop: '8px' }} className="skeleton" />
    </div>
  )
}

export function SkeletonText({ width = '100%', lines = 1 }) {
  return (
    <div>
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          style={{
            ...skeletonTextStyle,
            width: i === lines - 1 ? '70%' : width,
            marginBottom: i === lines - 1 ? 0 : '8px'
          }}
          className="skeleton"
        />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = '48px' }) {
  return (
    <div style={{
      ...skeletonAvatarStyle,
      width: size,
      height: size
    }} className="skeleton" />
  )
}

export function SkeletonGrid({ count = 6, columns = 3 }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(250px, 1fr))`,
      gap: '20px'
    }}>
      {[...Array(count)].map((_, i) => (
        <SkeletonProviderCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonListItem() {
  return (
    <div style={skeletonListItemStyle}>
      <div style={skeletonListHeaderStyle}>
        <div style={{ ...skeletonAvatarStyle, width: '40px', height: '40px' }} className="skeleton" />
        <div style={{ flex: 1, marginLeft: '12px' }}>
          <div style={{ ...skeletonTextStyle, width: '50%' }} className="skeleton" />
          <div style={{ ...skeletonTextStyle, width: '30%', marginTop: '6px' }} className="skeleton" />
        </div>
      </div>
      <div style={{ marginTop: '12px' }}>
        <div style={skeletonTextStyle} className="skeleton" />
        <div style={{ ...skeletonTextStyle, width: '80%', marginTop: '6px' }} className="skeleton" />
      </div>
    </div>
  )
}

export function LoadingSpinner({ size = '40px' }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        width: size,
        height: size,
        border: '3px solid #E8EAED',
        borderTopColor: '#0A66FF',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
    </div>
  )
}

export function PulseAnimation({ children }) {
  return (
    <div style={{ animation: 'pulse 2s infinite' }}>
      {children}
    </div>
  )
}

// Base Skeleton Styles
const skeletonCardStyle = {
  background: '#FFFFFF',
  border: '1px solid #E8EAED',
  borderRadius: '16px',
  padding: '20px',
  animation: 'slideUp 0.4s ease'
}

const skeletonHeaderStyle = {
  display: 'flex',
  gap: '12px',
  marginBottom: '16px'
}

const skeletonAvatarStyle = {
  width: '56px',
  height: '56px',
  borderRadius: '12px',
  flexShrink: 0
}

const skeletonTextGroupStyle = {
  flex: 1
}

const skeletonTextStyle = {
  height: '12px',
  borderRadius: '4px',
  marginBottom: '8px'
}

const skeletonLargeTextStyle = {
  height: '20px',
  borderRadius: '4px'
}

const skeletonDescriptionStyle = {
  marginBottom: '12px'
}

const skeletonStatsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '12px',
  marginBottom: '12px',
  paddingBottom: '12px',
  borderBottom: '1px solid #E8EAED'
}

const skeletonStatStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
}

const skeletonButtonGroupStyle = {
  display: 'flex',
  gap: '8px',
  marginTop: '12px'
}

const skeletonButtonStyle = {
  height: '40px',
  borderRadius: '8px'
}

const skeletonServiceCardStyle = {
  background: '#FFFFFF',
  border: '1px solid #E8EAED',
  borderRadius: '14px',
  padding: '20px'
}

const skeletonListItemStyle = {
  background: '#FFFFFF',
  border: '1px solid #E8EAED',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '12px'
}

const skeletonListHeaderStyle = {
  display: 'flex',
  alignItems: 'flex-start'
}
