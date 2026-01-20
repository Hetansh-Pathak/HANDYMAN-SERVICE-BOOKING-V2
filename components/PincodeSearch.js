import { useState, useEffect } from 'react'
import { checkServiceAvailability, validatePincodeFormat } from '../lib/location-service'

export default function PincodeSearch({ onAvailabilityCheck, onPincodeSelect }) {
  const [pincode, setPincode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [availability, setAvailability] = useState(null)
  const [error, setError] = useState(null)

  // Auto-check availability when pincode reaches 6 digits
  useEffect(() => {
    if (pincode.length === 6) {
      handleCheckAvailability()
    } else {
      setAvailability(null)
      setError(null)
    }
  }, [pincode])

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setPincode(value)
  }

  const handleCheckAvailability = async () => {
    if (!pincode || pincode.length !== 6) {
      setError('Please enter a valid 6-digit pincode')
      return
    }

    setIsLoading(true)
    setError(null)
    setAvailability(null)

    // Simulate API delay for better UX
    setTimeout(() => {
      const result = checkServiceAvailability(pincode)
      
      if (result.type === 'error') {
        setError(result.message)
        setAvailability(null)
      } else {
        setAvailability(result)
        setError(null)
        
        if (onAvailabilityCheck) {
          onAvailabilityCheck(result)
        }
        
        if (onPincodeSelect && result.isInGujarate) {
          onPincodeSelect(pincode, result.city)
        }
      }
      
      setIsLoading(false)
    }, 600)
  }

  return (
    <div style={searchPanelStyle}>
      <div style={searchHeaderStyle}>
        <h3 style={searchTitleStyle}>Check Service Availability</h3>
        <p style={searchSubtitleStyle}>Enter your pincode to see available services in your area</p>
      </div>

      <div style={searchFormStyle}>
        <div style={searchInputContainerStyle}>
          <div style={searchInputWrapperStyle}>
            <span style={searchIconStyle}>📍</span>
            <input
              type="text"
              placeholder="Enter 6-digit pincode"
              value={pincode}
              onChange={handlePincodeChange}
              maxLength="6"
              style={{
                ...searchInputStyle,
                ...(error && { borderColor: 'var(--danger)' }),
                ...(availability && availability.isInGujarate && { borderColor: 'var(--success)' })
              }}
              disabled={isLoading}
            />
            {isLoading && <span style={loaderStyle}>⏳</span>}
          </div>
          
          <button
            style={checkBtnStyle}
            onClick={handleCheckAvailability}
            disabled={!validatePincodeFormat(pincode) || isLoading}
            title="Check service availability"
          >
            {isLoading ? 'Checking...' : 'Check'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={errorMessageStyle}>
            <span style={errorIconStyle}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Availability Message - Success */}
        {availability && availability.type === 'success' && (
          <div style={successMessageStyle}>
            <span style={successIconStyle}>✓</span>
            <div>
              <div style={successTitleStyle}>Services Available!</div>
              <div style={successMessageTextStyle}>
                {availability.message}
              </div>
              {availability.city && (
                <div style={cityInfoStyle}>
                  📍 {availability.city.name}, {availability.city.region}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Availability Message - Info */}
        {availability && availability.type === 'info' && (
          <div style={infoMessageStyle}>
            <span style={infoIconStyle}>ℹ️</span>
            <div>
              <div style={infoTitleStyle}>Outside Service Zone</div>
              <div style={infoMessageTextStyle}>
                {availability.message}
              </div>
              <div style={alternateSuggestionStyle}>
                Our services are currently available in all major cities across Gujarat. 
                Please check with nearby areas or contact our support team.
              </div>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div style={quickLinksStyle}>
          <span style={quickLabelStyle}>Popular cities:</span>
          <div style={linksGridStyle}>
            {['380001', '395001', '390001', '360001'].map((pc, idx) => (
              <button
                key={idx}
                style={quickLinkStyle}
                onClick={() => {
                  setPincode(pc)
                }}
              >
                {getCityName(pc)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get city name from pincode
function getCityName(pincode) {
  const cityNames = {
    '380001': 'Ahmedabad',
    '395001': 'Surat',
    '390001': 'Vadodara',
    '360001': 'Rajkot'
  }
  return cityNames[pincode] || 'Check'
}

/* ==================== STYLES ==================== */

const searchPanelStyle = {
  background: 'white',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--spacing-xl)',
  boxShadow: 'var(--shadow-soft)',
  animation: 'slideDown var(--transition-base)',
}

const searchHeaderStyle = {
  marginBottom: 'var(--spacing-xl)',
  textAlign: 'center'
}

const searchTitleStyle = {
  fontSize: '22px',
  fontWeight: '700',
  color: 'var(--text-primary)',
  marginBottom: 'var(--spacing-sm)'
}

const searchSubtitleStyle = {
  fontSize: '14px',
  color: 'var(--text-secondary)',
  lineHeight: '1.5'
}

const searchFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-lg)'
}

const searchInputContainerStyle = {
  display: 'flex',
  gap: 'var(--spacing-sm)'
}

const searchInputWrapperStyle = {
  flex: 1,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  background: 'var(--bg-light)',
  borderRadius: 'var(--radius-md)',
  border: '2px solid var(--border-light)',
  paddingLeft: 'var(--spacing-md)',
  transition: 'all var(--transition-base)'
}

const searchIconStyle = {
  fontSize: '18px',
  marginRight: 'var(--spacing-sm)',
  color: 'var(--text-secondary)'
}

const searchInputStyle = {
  flex: 1,
  border: 'none',
  background: 'transparent',
  padding: '12px var(--spacing-sm)',
  fontSize: '16px',
  color: 'var(--text-primary)',
  outline: 'none',
  fontWeight: '600',
  letterSpacing: '2px'
}

const loaderStyle = {
  fontSize: '16px',
  animation: 'spin 1s linear infinite',
  marginRight: 'var(--spacing-sm)'
}

const checkBtnStyle = {
  padding: '12px 28px',
  background: 'var(--primary)',
  color: 'white',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  fontWeight: '700',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'all var(--transition-base)',
  boxShadow: 'var(--shadow-soft)',
  minHeight: '48px',
  whiteSpace: 'nowrap'
}

const checkBtnHoverStyle = {
  background: 'var(--primary-dark)',
  boxShadow: 'var(--shadow-medium)',
  transform: 'translateY(-2px)'
}

const errorMessageStyle = {
  display: 'flex',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-md) var(--spacing-lg)',
  background: 'rgba(220, 53, 69, 0.1)',
  border: '1px solid var(--danger)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--danger)',
  fontSize: '14px',
  animation: 'slideDown var(--transition-base)'
}

const errorIconStyle = {
  fontSize: '16px',
  flexShrink: 0
}

const successMessageStyle = {
  display: 'flex',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-lg)',
  background: 'rgba(0, 184, 148, 0.1)',
  border: '1px solid var(--success)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--success)',
  animation: 'slideDown var(--transition-base)'
}

const successIconStyle = {
  fontSize: '20px',
  fontWeight: '700',
  flexShrink: 0
}

const successTitleStyle = {
  fontWeight: '700',
  fontSize: '15px',
  marginBottom: '4px',
  color: 'var(--text-primary)'
}

const successMessageTextStyle = {
  fontSize: '13px',
  color: 'var(--text-secondary)',
  marginBottom: '6px'
}

const cityInfoStyle = {
  fontSize: '12px',
  color: 'var(--text-tertiary)',
  fontWeight: '500'
}

const infoMessageStyle = {
  display: 'flex',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-lg)',
  background: 'rgba(10, 102, 255, 0.1)',
  border: '1px solid var(--primary)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--primary)',
  animation: 'slideDown var(--transition-base)'
}

const infoIconStyle = {
  fontSize: '18px',
  flexShrink: 0
}

const infoTitleStyle = {
  fontWeight: '700',
  fontSize: '15px',
  marginBottom: '4px',
  color: 'var(--text-primary)'
}

const infoMessageTextStyle = {
  fontSize: '13px',
  color: 'var(--text-secondary)',
  marginBottom: '8px'
}

const alternateSuggestionStyle = {
  fontSize: '12px',
  color: 'var(--text-tertiary)',
  lineHeight: '1.4',
  fontStyle: 'italic'
}

const quickLinksStyle = {
  paddingTop: 'var(--spacing-md)',
  borderTop: '1px solid var(--border-light)'
}

const quickLabelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '600',
  color: 'var(--text-secondary)',
  marginBottom: 'var(--spacing-sm)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const linksGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
  gap: 'var(--spacing-sm)'
}

const quickLinkStyle = {
  padding: '8px var(--spacing-md)',
  background: 'var(--bg-light)',
  border: '1px solid var(--border-light)',
  borderRadius: 'var(--radius-sm)',
  fontSize: '13px',
  fontWeight: '600',
  color: 'var(--primary)',
  cursor: 'pointer',
  transition: 'all var(--transition-fast)',
  textAlign: 'center'
}
