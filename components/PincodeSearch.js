import { useState, useEffect } from 'react'
import {
  isValidPincode,
  getServiceAvailability,
  formatLocation,
  getNearbyServices,
  getLocationFromPincode
} from '../lib/pincodeService'

export default function PincodeSearch({ onSearch, showFull = true }) {
  const [pincode, setPincode] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [location, setLocation] = useState(null)
  const [nearbyServices, setNearbyServices] = useState([])

  const handleSearch = async (e) => {
    e?.preventDefault()

    if (!pincode.trim()) {
      setStatus({
        type: 'error',
        message: 'Please enter a pincode'
      })
      return
    }

    setLoading(true)
    setStatus(null)
    setLocation(null)

    // Simulate API call
    setTimeout(() => {
      if (!isValidPincode(pincode)) {
        setStatus({
          type: 'error',
          message: 'Invalid pincode. Please enter a valid 6-digit pincode.'
        })
        setLoading(false)
        return
      }

      const availability = getServiceAvailability(pincode)
      const locationData = getLocationFromPincode(pincode)

      setLocation(locationData)
      setStatus(availability)

      if (availability.available && locationData) {
        const nearby = getNearbyServices(pincode)
        setNearbyServices(nearby)
      }

      if (onSearch && availability.available) {
        onSearch({
          pincode,
          location: locationData,
          availability
        })
      }

      setLoading(false)
    }, 600)
  }

  const handlePincodeChange = (e) => {
    const value = e.target.value
    // Only allow digits and limit to 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setPincode(value)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div style={containerStyle}>
      <div style={searchBoxStyle}>
        <form onSubmit={handleSearch} style={formStyle}>
          <div style={inputGroupStyle}>
            <span style={inputIconStyle}>📍</span>
            <input
              type="text"
              placeholder="Enter your 6-digit pincode"
              value={pincode}
              onChange={handlePincodeChange}
              onKeyPress={handleKeyPress}
              maxLength="6"
              inputMode="numeric"
              style={inputStyle}
              disabled={loading}
            />
            {pincode && (
              <button
                type="button"
                style={clearBtnStyle}
                onClick={() => {
                  setPincode('')
                  setStatus(null)
                  setLocation(null)
                  setNearbyServices([])
                }}
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={searchBtnStyle}
            className="btn btn-primary"
          >
            {loading ? (
              <>
                <span style={spinnerStyle} className="spinner"></span>
                Checking...
              </>
            ) : (
              <>
                🔍 Check Availability
              </>
            )}
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <div style={{
            ...statusStyle,
            ...(status.type === 'success' ? successStatusStyle : 
               status.type === 'warning' ? warningStatusStyle :
               errorStatusStyle)
          }}>
            <div style={statusContentStyle}>
              <span style={statusIconStyle}>
                {status.type === 'success' ? '✓' :
                 status.type === 'warning' ? '⚠️' :
                 '✕'}
              </span>
              <div style={statusTextStyle}>
                <p style={statusMessageStyle}>{status.message}</p>
                {location && (
                  <p style={statusLocationStyle}>
                    {formatLocation(pincode)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Nearby Services */}
        {showFull && nearbyServices.length > 0 && (
          <div style={nearbyServicesStyle}>
            <h4 style={nearbyTitleStyle}>Available Services Nearby:</h4>
            <div style={citiesGridStyle}>
              {nearbyServices.map((city, index) => (
                <div key={index} style={cityBadgeStyle}>
                  🏘️ {city}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Message */}
        {showFull && !status && (
          <div style={infoBoxStyle}>
            <p style={infoTextStyle}>
              ℹ️ Enter your pincode to check service availability in your area
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Styles
const containerStyle = {
  width: '100%'
}

const searchBoxStyle = {
  background: 'white',
  borderRadius: '14px',
  border: '1px solid #E8EAED',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  padding: '24px',
  animation: 'slideUp 0.4s ease'
}

const formStyle = {
  display: 'flex',
  gap: '12px',
  marginBottom: '20px'
}

const inputGroupStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  background: '#F7F9FC',
  borderRadius: '10px',
  border: '1px solid #E8EAED',
  paddingLeft: '14px',
  paddingRight: '12px',
  transition: 'all 0.3s ease',
  position: 'relative'
}

const inputIconStyle = {
  fontSize: '18px',
  marginRight: '8px',
  flexShrink: 0
}

const inputStyle = {
  flex: 1,
  border: 'none',
  background: 'transparent',
  padding: '12px 0',
  fontSize: '16px',
  color: '#111111',
  outline: 'none',
  fontFamily: 'inherit'
}

const clearBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#888888',
  fontSize: '16px',
  cursor: 'pointer',
  padding: '0 4px',
  transition: 'color 0.2s ease',
  flexShrink: 0
}

const searchBtnStyle = {
  padding: '12px 28px',
  minWidth: '160px',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px'
}

const spinnerStyle = {
  display: 'inline-block',
  width: '16px',
  height: '16px',
  borderWidth: '2px',
  marginRight: '4px'
}

const statusStyle = {
  padding: '16px 20px',
  borderRadius: '10px',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  animation: 'slideUp 0.3s ease'
}

const successStatusStyle = {
  background: 'rgba(0, 184, 148, 0.08)',
  border: '1px solid rgba(0, 184, 148, 0.2)',
  color: '#00945d'
}

const warningStatusStyle = {
  background: 'rgba(255, 165, 0, 0.08)',
  border: '1px solid rgba(255, 165, 0, 0.2)',
  color: '#856404'
}

const errorStatusStyle = {
  background: 'rgba(220, 53, 69, 0.08)',
  border: '1px solid rgba(220, 53, 69, 0.2)',
  color: '#c82333'
}

const statusContentStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  width: '100%'
}

const statusIconStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  flexShrink: 0,
  marginTop: '2px'
}

const statusTextStyle = {
  flex: 1
}

const statusMessageStyle = {
  margin: 0,
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '1.4'
}

const statusLocationStyle = {
  margin: '6px 0 0',
  fontSize: '12px',
  opacity: 0.8,
  lineHeight: '1.4'
}

const nearbyServicesStyle = {
  background: '#F7F9FC',
  padding: '16px',
  borderRadius: '10px',
  border: '1px solid #E8EAED',
  marginBottom: '16px'
}

const nearbyTitleStyle = {
  margin: '0 0 12px',
  fontSize: '13px',
  fontWeight: '600',
  color: '#111111',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const citiesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  gap: '10px'
}

const cityBadgeStyle = {
  background: 'white',
  border: '1px solid #E8EAED',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '13px',
  fontWeight: '500',
  color: '#555555',
  textAlign: 'center',
  transition: 'all 0.2s ease'
}

const infoBoxStyle = {
  background: '#E8F3FF',
  border: '1px solid rgba(10, 102, 255, 0.2)',
  borderRadius: '10px',
  padding: '12px 14px'
}

const infoTextStyle = {
  margin: 0,
  fontSize: '13px',
  color: '#0052CC',
  lineHeight: '1.4'
}
