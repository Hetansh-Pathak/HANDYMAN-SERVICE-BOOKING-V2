/**
 * Gujarat Pincode Service
 * Maps 6-digit Indian pincodes to districts and cities
 * Focuses on Gujarat state services
 */

// Comprehensive pincode to district mapping for Gujarat
const pincodeDatabase = {
  // Ahmedabad District
  380001: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380002: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380005: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380006: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380009: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380013: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380015: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380016: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380019: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380022: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380023: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380024: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380025: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380026: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380050: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380051: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  380052: { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
  382110: { city: 'Gandhinagar', district: 'Ahmedabad', state: 'Gujarat' },
  382340: { city: 'Viramgam', district: 'Ahmedabad', state: 'Gujarat' },

  // Gandhinagar District
  382001: { city: 'Gandhinagar', district: 'Gandhinagar', state: 'Gujarat' },
  382010: { city: 'Gandhinagar', district: 'Gandhinagar', state: 'Gujarat' },
  382016: { city: 'Gandhinagar', district: 'Gandhinagar', state: 'Gujarat' },
  382020: { city: 'Gandhinagar', district: 'Gandhinagar', state: 'Gujarat' },
  382030: { city: 'Gandhinagar', district: 'Gandhinagar', state: 'Gujarat' },
  382150: { city: 'Kadi', district: 'Gandhinagar', state: 'Gujarat' },

  // Surat District
  395001: { city: 'Surat', district: 'Surat', state: 'Gujarat' },
  395002: { city: 'Surat', district: 'Surat', state: 'Gujarat' },
  395003: { city: 'Surat', district: 'Surat', state: 'Gujarat' },
  395004: { city: 'Surat', district: 'Surat', state: 'Gujarat' },
  395005: { city: 'Surat', district: 'Surat', state: 'Gujarat' },
  395006: { city: 'Surat', district: 'Surat', state: 'Gujarat' },
  395007: { city: 'Surat', district: 'Surat', state: 'Gujarat' },
  395009: { city: 'Surat', district: 'Surat', state: 'Gujarat' },
  395010: { city: 'Surat', district: 'Surat', state: 'Gujarat' },
  395017: { city: 'Surat', district: 'Surat', state: 'Gujarat' },
  395023: { city: 'Surat', district: 'Surat', state: 'Gujarat' },

  // Vadodara District
  390001: { city: 'Vadodara', district: 'Vadodara', state: 'Gujarat' },
  390002: { city: 'Vadodara', district: 'Vadodara', state: 'Gujarat' },
  390004: { city: 'Vadodara', district: 'Vadodara', state: 'Gujarat' },
  390005: { city: 'Vadodara', district: 'Vadodara', state: 'Gujarat' },
  390007: { city: 'Vadodara', district: 'Vadodara', state: 'Gujarat' },
  390008: { city: 'Vadodara', district: 'Vadodara', state: 'Gujarat' },
  390009: { city: 'Vadodara', district: 'Vadodara', state: 'Gujarat' },
  390011: { city: 'Vadodara', district: 'Vadodara', state: 'Gujarat' },
  390021: { city: 'Vadodara', district: 'Vadodara', state: 'Gujarat' },
  391740: { city: 'Anand', district: 'Vadodara', state: 'Gujarat' },
  391760: { city: 'Anand', district: 'Vadodara', state: 'Gujarat' },

  // Rajkot District
  360001: { city: 'Rajkot', district: 'Rajkot', state: 'Gujarat' },
  360002: { city: 'Rajkot', district: 'Rajkot', state: 'Gujarat' },
  360003: { city: 'Rajkot', district: 'Rajkot', state: 'Gujarat' },
  360004: { city: 'Rajkot', district: 'Rajkot', state: 'Gujarat' },
  360005: { city: 'Rajkot', district: 'Rajkot', state: 'Gujarat' },
  360006: { city: 'Rajkot', district: 'Rajkot', state: 'Gujarat' },
  360010: { city: 'Rajkot', district: 'Rajkot', state: 'Gujarat' },
  360560: { city: 'Morbi', district: 'Rajkot', state: 'Gujarat' },

  // Jamnagar District
  361001: { city: 'Jamnagar', district: 'Jamnagar', state: 'Gujarat' },
  361002: { city: 'Jamnagar', district: 'Jamnagar', state: 'Gujarat' },
  361003: { city: 'Jamnagar', district: 'Jamnagar', state: 'Gujarat' },
  361005: { city: 'Jamnagar', district: 'Jamnagar', state: 'Gujarat' },
  361006: { city: 'Jamnagar', district: 'Jamnagar', state: 'Gujarat' },
  361008: { city: 'Jamnagar', district: 'Jamnagar', state: 'Gujarat' },

  // Bhavnagar District
  364001: { city: 'Bhavnagar', district: 'Bhavnagar', state: 'Gujarat' },
  364002: { city: 'Bhavnagar', district: 'Bhavnagar', state: 'Gujarat' },
  364003: { city: 'Bhavnagar', district: 'Bhavnagar', state: 'Gujarat' },
  364004: { city: 'Bhavnagar', district: 'Bhavnagar', state: 'Gujarat' },
  364005: { city: 'Bhavnagar', district: 'Bhavnagar', state: 'Gujarat' },

  // Junagadh District
  362001: { city: 'Junagadh', district: 'Junagadh', state: 'Gujarat' },
  362002: { city: 'Junagadh', district: 'Junagadh', state: 'Gujarat' },
  362010: { city: 'Junagadh', district: 'Junagadh', state: 'Gujarat' },

  // Mehsana District
  384001: { city: 'Mehsana', district: 'Mehsana', state: 'Gujarat' },
  384002: { city: 'Mehsana', district: 'Mehsana', state: 'Gujarat' },
  384003: { city: 'Mehsana', district: 'Mehsana', state: 'Gujarat' },
  384004: { city: 'Mehsana', district: 'Mehsana', state: 'Gujarat' },

  // Navsari District
  396445: { city: 'Navsari', district: 'Navsari', state: 'Gujarat' },
  396521: { city: 'Navsari', district: 'Navsari', state: 'Gujarat' },

  // Vapi (Valsad District)
  396195: { city: 'Vapi', district: 'Valsad', state: 'Gujarat' },

  // Porbandar District
  360575: { city: 'Porbandar', district: 'Porbandar', state: 'Gujarat' },

  // Amreli District
  365601: { city: 'Amreli', district: 'Amreli', state: 'Gujarat' },

  // Patan District
  384265: { city: 'Patan', district: 'Patan', state: 'Gujarat' },

  // Palanpur (Banaskantha District)
  385001: { city: 'Palanpur', district: 'Banaskantha', state: 'Gujarat' },

  // Godhra (Panchmahal District)
  389001: { city: 'Godhra', district: 'Panchmahal', state: 'Gujarat' },

  // Bharuch District
  392001: { city: 'Bharuch', district: 'Bharuch', state: 'Gujarat' },

  // Dahod District
  389151: { city: 'Dahod', district: 'Dahod', state: 'Gujarat' },
}

// List of covered cities
export const coveredCities = [
  'Ahmedabad',
  'Surat',
  'Vadodara',
  'Rajkot',
  'Jamnagar',
  'Bhavnagar',
  'Junagadh',
  'Gandhinagar',
  'Morbi',
  'Mehsana',
  'Anand',
  'Bharuch',
  'Navsari',
  'Vapi',
  'Porbandar',
  'Amreli',
  'Nadiad',
  'Palanpur',
  'Patan',
  'Godhra',
  'Dahod'
]

export const coveredDistricts = [
  'Ahmedabad',
  'Gandhinagar',
  'Surat',
  'Vadodara',
  'Rajkot',
  'Jamnagar',
  'Bhavnagar',
  'Junagadh',
  'Mehsana',
  'Navsari',
  'Valsad',
  'Porbandar',
  'Amreli',
  'Patan',
  'Banaskantha',
  'Panchmahal',
  'Bharuch',
  'Dahod'
]

/**
 * Validate if pincode is a valid 6-digit Indian pincode
 * @param {string} pincode - The pincode to validate
 * @returns {boolean}
 */
export const isValidPincode = (pincode) => {
  return /^[0-9]{6}$/.test(String(pincode).trim())
}

/**
 * Get location details from pincode
 * @param {string} pincode - The 6-digit pincode
 * @returns {object|null} - Location object or null if not found
 */
export const getLocationFromPincode = (pincode) => {
  const normalizedPincode = parseInt(String(pincode).trim(), 10)
  return pincodeDatabase[normalizedPincode] || null
}

/**
 * Check if pincode is within Gujarat
 * @param {string} pincode - The pincode to check
 * @returns {boolean}
 */
export const isGujaratPincode = (pincode) => {
  if (!isValidPincode(pincode)) return false
  const location = getLocationFromPincode(pincode)
  return location ? location.state === 'Gujarat' : false
}

/**
 * Check if pincode is in Ahmedabad district (main service area)
 * @param {string} pincode - The pincode to check
 * @returns {boolean}
 */
export const isAhmedabadDistrict = (pincode) => {
  if (!isValidPincode(pincode)) return false
  const location = getLocationFromPincode(pincode)
  return location ? location.district === 'Ahmedabad' : false
}

/**
 * Get service availability for a pincode
 * @param {string} pincode - The pincode to check
 * @returns {object} - Service availability details
 */
export const getServiceAvailability = (pincode) => {
  if (!isValidPincode(pincode)) {
    return {
      available: false,
      message: 'Invalid pincode format. Please enter a 6-digit pincode.',
      type: 'error'
    }
  }

  const location = getLocationFromPincode(pincode)

  if (!location) {
    return {
      available: false,
      message: 'Pincode not found in our database. Please check and try again.',
      type: 'error'
    }
  }

  if (location.state !== 'Gujarat') {
    return {
      available: false,
      message: 'Currently, services are available only in Gujarat state. Please check back soon!',
      type: 'warning',
      city: location.city,
      state: location.state
    }
  }

  if (location.district === 'Ahmedabad') {
    return {
      available: true,
      message: `Services available in your area - ${location.city}, ${location.district}`,
      type: 'success',
      city: location.city,
      district: location.district,
      coverage: 'primary', // Full service coverage
      providers: 'high' // Many providers available
    }
  }

  return {
    available: true,
    message: `Services available in your area - ${location.city}, ${location.district}`,
    type: 'success',
    city: location.city,
    district: location.district,
    coverage: 'secondary', // Limited service coverage
    providers: 'medium' // Some providers available
  }
}

/**
 * Get nearby cities for a given pincode
 * @param {string} pincode - The pincode to find nearby cities
 * @returns {array} - Array of nearby cities
 */
export const getNearbyServices = (pincode) => {
  const location = getLocationFromPincode(pincode)
  if (!location || location.state !== 'Gujarat') return []

  const district = location.district
  
  // Map districts to their nearby service areas
  const nearbyMap = {
    'Ahmedabad': ['Ahmedabad', 'Gandhinagar', 'Anand'],
    'Gandhinagar': ['Gandhinagar', 'Ahmedabad'],
    'Surat': ['Surat', 'Navsari', 'Vapi'],
    'Vadodara': ['Vadodara', 'Anand'],
    'Rajkot': ['Rajkot', 'Morbi', 'Jamnagar'],
    'Jamnagar': ['Jamnagar', 'Rajkot'],
    'Bhavnagar': ['Bhavnagar'],
    'Junagadh': ['Junagadh'],
    'Mehsana': ['Mehsana', 'Palanpur'],
    'Navsari': ['Navsari', 'Vapi', 'Surat'],
    'Valsad': ['Vapi'],
    'Porbandar': ['Porbandar'],
    'Amreli': ['Amreli'],
    'Patan': ['Patan'],
    'Banaskantha': ['Palanpur'],
    'Panchmahal': ['Godhra'],
    'Bharuch': ['Bharuch'],
    'Dahod': ['Dahod']
  }

  return nearbyMap[district] || [location.city]
}

/**
 * Format location for display
 * @param {string} pincode - The pincode
 * @returns {string} - Formatted location string
 */
export const formatLocation = (pincode) => {
  const location = getLocationFromPincode(pincode)
  if (!location) return 'Unknown'
  return `${location.city}, ${location.district}, ${location.state}`
}

/**
 * Get distance category (approximate for display)
 * Useful for showing provider proximity
 * @param {string} providerCity - Provider's city
 * @param {string} userCity - User's city
 * @returns {string} - Distance category
 */
export const getDistanceCategory = (providerCity, userCity) => {
  if (providerCity === userCity) {
    return 'Near You'
  }
  
  const sameCitiesList = [
    ['Ahmedabad', 'Gandhinagar'],
    ['Surat', 'Navsari'],
    ['Rajkot', 'Morbi']
  ]
  
  const isSameRegion = sameCitiesList.some(pair =>
    (pair[0] === providerCity && pair[1] === userCity) ||
    (pair[0] === userCity && pair[1] === providerCity)
  )
  
  return isSameRegion ? '5-10 km away' : '10+ km away'
}

export default {
  isValidPincode,
  getLocationFromPincode,
  isGujaratPincode,
  isAhmedabadDistrict,
  getServiceAvailability,
  getNearbyServices,
  formatLocation,
  getDistanceCategory,
  coveredCities,
  coveredDistricts
}
