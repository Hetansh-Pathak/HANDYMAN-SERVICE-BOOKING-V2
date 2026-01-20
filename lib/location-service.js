/**
 * Location Service Utility
 * Handles pincode validation, city mapping, and service availability
 * for Gujarat-based handyman/service marketplace
 */

// Gujarat Districts and their major cities
export const gujaratCities = {
  ahmedabad: {
    name: 'Ahmedabad',
    district: 'Ahmedabad',
    region: 'Central Gujarat',
    pincodes: ['380001', '380002', '380003', '380004', '380005', '380006', '380007', '380008', '380009', '380010', '380011', '380012', '380013', '380014', '380015', '380016', '380017', '380018', '380019', '380020', '380021', '380022', '380023', '380024', '380025', '380026', '380050', '380051', '380052', '380054', '380055', '380056', '380057'],
    coordinates: { lat: 23.0225, lng: 72.5714 }
  },
  gandhinagar: {
    name: 'Gandhinagar',
    district: 'Gandhinagar',
    region: 'Central Gujarat',
    pincodes: ['382001', '382002', '382003', '382004', '382005', '382006', '382007', '382008', '382009', '382010'],
    coordinates: { lat: 23.2156, lng: 72.6369 }
  },
  surat: {
    name: 'Surat',
    district: 'Surat',
    region: 'South Gujarat',
    pincodes: ['395001', '395002', '395003', '395004', '395005', '395006', '395007', '395008', '395009', '395010'],
    coordinates: { lat: 21.1725, lng: 72.8311 }
  },
  vadodara: {
    name: 'Vadodara',
    district: 'Vadodara',
    region: 'Central Gujarat',
    pincodes: ['390001', '390002', '390003', '390004', '390005', '390006', '390007', '390008', '390009', '390010', '390011'],
    coordinates: { lat: 22.3072, lng: 73.1812 }
  },
  rajkot: {
    name: 'Rajkot',
    district: 'Rajkot',
    region: 'Saurashtra',
    pincodes: ['360001', '360002', '360003', '360004', '360005', '360006', '360007', '360008', '360009', '360010'],
    coordinates: { lat: 22.3039, lng: 70.8022 }
  },
  jamnagar: {
    name: 'Jamnagar',
    district: 'Jamnagar',
    region: 'Saurashtra',
    pincodes: ['361001', '361002', '361003', '361004', '361005', '361006', '361007'],
    coordinates: { lat: 22.4707, lng: 70.0601 }
  },
  bhavnagar: {
    name: 'Bhavnagar',
    district: 'Bhavnagar',
    region: 'Saurashtra',
    pincodes: ['364001', '364002', '364003', '364004', '364005', '364006'],
    coordinates: { lat: 21.7645, lng: 71.9520 }
  },
  junagadh: {
    name: 'Junagadh',
    district: 'Junagadh',
    region: 'Saurashtra',
    pincodes: ['362001', '362002', '362003', '362004', '362005'],
    coordinates: { lat: 21.5136, lng: 70.4725 }
  },
  mehsana: {
    name: 'Mehsana',
    district: 'Mehsana',
    region: 'North Gujarat',
    pincodes: ['384001', '384002', '384003', '384004', '384005'],
    coordinates: { lat: 23.5833, lng: 72.4500 }
  },
  anand: {
    name: 'Anand',
    district: 'Anand',
    region: 'Central Gujarat',
    pincodes: ['388001', '388002', '388003', '388004'],
    coordinates: { lat: 22.5585, lng: 72.9350 }
  },
  bharuch: {
    name: 'Bharuch',
    district: 'Bharuch',
    region: 'South Gujarat',
    pincodes: ['392001', '392002', '392003', '392004'],
    coordinates: { lat: 21.6139, lng: 72.9956 }
  },
  navsari: {
    name: 'Navsari',
    district: 'Navsari',
    region: 'South Gujarat',
    pincodes: ['396445', '396446', '396447'],
    coordinates: { lat: 20.9472, lng: 72.9139 }
  },
  vapi: {
    name: 'Vapi',
    district: 'Valsad',
    region: 'South Gujarat',
    pincodes: ['396195', '396196', '396197'],
    coordinates: { lat: 20.5733, lng: 72.7919 }
  },
  porbandar: {
    name: 'Porbandar',
    district: 'Porbandar',
    region: 'Saurashtra',
    pincodes: ['360575', '360576'},
    coordinates: { lat: 21.6436, lng: 69.6092 }
  },
  amreli: {
    name: 'Amreli',
    district: 'Amreli',
    region: 'Saurashtra',
    pincodes: ['365601', '365602'},
    coordinates: { lat: 21.6064, lng: 71.2158 }
  },
  nadiad: {
    name: 'Nadiad',
    district: 'Kheda',
    region: 'Central Gujarat',
    pincodes: ['387001', '387002'},
    coordinates: { lat: 22.7190, lng: 72.8581 }
  },
  palanpur: {
    name: 'Palanpur',
    district: 'Banaskantha',
    region: 'North Gujarat',
    pincodes: ['385001', '385002'},
    coordinates: { lat: 24.1742, lng: 72.4289 }
  },
  patan: {
    name: 'Patan',
    district: 'Patan',
    region: 'North Gujarat',
    pincodes: ['384265', '384266'},
    coordinates: { lat: 23.8523, lng: 72.1177 }
  },
  godhra: {
    name: 'Godhra',
    district: 'Panchmahal',
    region: 'Central Gujarat',
    pincodes: ['389001', '389002'},
    coordinates: { lat: 22.7736, lng: 73.2048 }
  },
  dahod: {
    name: 'Dahod',
    district: 'Dahod',
    region: 'Central Gujarat',
    pincodes: ['389151', '389152'},
    coordinates: { lat: 22.7930, lng: 74.2667 }
  },
  morbi: {
    name: 'Morbi',
    district: 'Morbi',
    region: 'Saurashtra',
    pincodes: ['363641', '363642'},
    coordinates: { lat: 22.8174, lng: 70.8237 }
  }
}

// Create a flat mapping of pincodes to cities for quick lookup
const pincodeToCity = {}
Object.values(gujaratCities).forEach(city => {
  city.pincodes.forEach(pincode => {
    pincodeToCity[pincode] = city
  })
})

/**
 * Validate Indian pincode format
 * @param {string} pincode - The pincode to validate
 * @returns {boolean} - True if valid format
 */
export function validatePincodeFormat(pincode) {
  if (!pincode) return false
  const pincodeRegex = /^[1-9][0-9]{5}$/
  return pincodeRegex.test(pincode.toString())
}

/**
 * Get city information from a pincode
 * @param {string} pincode - The pincode to lookup
 * @returns {object|null} - City information or null if not found
 */
export function getCityFromPincode(pincode) {
  if (!validatePincodeFormat(pincode)) {
    return null
  }
  return pincodeToCity[pincode] || null
}

/**
 * Check if pincode is in Gujarat
 * @param {string} pincode - The pincode to check
 * @returns {object} - { isInGujarate: boolean, city: object|null, message: string }
 */
export function checkServiceAvailability(pincode) {
  if (!validatePincodeFormat(pincode)) {
    return {
      isInGujarate: false,
      city: null,
      message: 'Invalid pincode format. Please enter a valid 6-digit pincode.',
      type: 'error'
    }
  }

  const city = getCityFromPincode(pincode)

  if (city) {
    return {
      isInGujarate: true,
      city: city,
      message: `Services available in ${city.name} and nearby areas`,
      type: 'success'
    }
  }

  return {
    isInGujarate: false,
    city: null,
    message: 'Currently services available only in Gujarat. Your area is outside our service zone.',
    type: 'info'
  }
}

/**
 * Get nearby cities within a distance from a given city
 * @param {string} cityName - The city name or pincode
 * @param {number} maxDistance - Maximum distance in km
 * @returns {array} - Array of nearby cities
 */
export function getNearbyServiceAreas(cityInput) {
  let referenceCity = null

  // Check if input is a pincode
  if (validatePincodeFormat(cityInput)) {
    referenceCity = getCityFromPincode(cityInput)
  } else {
    // Search by city name
    const cityKey = Object.keys(gujaratCities).find(
      key => gujaratCities[key].name.toLowerCase() === cityInput.toLowerCase()
    )
    if (cityKey) {
      referenceCity = gujaratCities[cityKey]
    }
  }

  if (!referenceCity) {
    return []
  }

  // Calculate distance between coordinates
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Get all cities within service range
  const nearbyAreas = Object.values(gujaratCities)
    .map(city => ({
      ...city,
      distance: calculateDistance(
        referenceCity.coordinates.lat,
        referenceCity.coordinates.lng,
        city.coordinates.lat,
        city.coordinates.lng
      )
    }))
    .filter(city => city.distance <= 50) // Within 50km
    .sort((a, b) => a.distance - b.distance)

  return nearbyAreas
}

/**
 * Get all cities by region
 * @param {string} region - The region name (e.g., 'Central Gujarat')
 * @returns {array} - Array of cities in that region
 */
export function getCitiesByRegion(region) {
  return Object.values(gujaratCities)
    .filter(city => city.region === region)
    .sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Get all Gujarat regions
 * @returns {array} - Array of unique region names
 */
export function getAllRegions() {
  const regions = new Set(Object.values(gujaratCities).map(city => city.region))
  return Array.from(regions).sort()
}

/**
 * Get distance between two cities (in km)
 * @param {string} city1 - First city name or pincode
 * @param {string} city2 - Second city name or pincode
 * @returns {number} - Distance in km or -1 if cities not found
 */
export function getDistanceBetweenCities(city1, city2) {
  let city1Data = null
  let city2Data = null

  // Resolve city1
  if (validatePincodeFormat(city1)) {
    city1Data = getCityFromPincode(city1)
  } else {
    const key = Object.keys(gujaratCities).find(
      k => gujaratCities[k].name.toLowerCase() === city1.toLowerCase()
    )
    city1Data = key ? gujaratCities[key] : null
  }

  // Resolve city2
  if (validatePincodeFormat(city2)) {
    city2Data = getCityFromPincode(city2)
  } else {
    const key = Object.keys(gujaratCities).find(
      k => gujaratCities[k].name.toLowerCase() === city2.toLowerCase()
    )
    city2Data = key ? gujaratCities[key] : null
  }

  if (!city1Data || !city2Data) {
    return -1
  }

  const R = 6371
  const dLat = (city2Data.coordinates.lat - city1Data.coordinates.lat) * Math.PI / 180
  const dLng = (city2Data.coordinates.lng - city1Data.coordinates.lng) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(city1Data.coordinates.lat * Math.PI / 180) * Math.cos(city2Data.coordinates.lat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return Math.round(R * c * 10) / 10 // Round to 1 decimal place
}

/**
 * Format distance for display
 * @param {number} distance - Distance in km
 * @returns {string} - Formatted distance string
 */
export function formatDistance(distance) {
  if (distance < 1) {
    return 'Near you'
  } else if (distance < 5) {
    return 'Within 5 km'
  } else if (distance < 10) {
    return 'Within 10 km'
  } else if (distance < 25) {
    return 'Within 25 km'
  } else {
    return `${Math.round(distance)} km away`
  }
}

/**
 * Get service availability badge
 * @param {string} availability - Availability type
 * @returns {object} - Badge configuration { icon, label, type }
 */
export function getAvailabilityBadge(availability = 'standard') {
  const badges = {
    available: {
      icon: '✓',
      label: 'Available Today',
      type: 'badge-success'
    },
    emergency: {
      icon: '⚡',
      label: 'Emergency Service',
      type: 'badge-emergency'
    },
    24x7: {
      icon: '🕐',
      label: '24x7 Support',
      type: 'badge-primary'
    },
    limited: {
      icon: '⏱️',
      label: 'Limited Availability',
      type: 'badge-warning'
    }
  }
  return badges[availability] || badges.available
}

/**
 * Filter providers based on user pincode and service area
 * @param {array} providers - Array of provider objects
 * @param {string} userPincode - User's pincode
 * @returns {array} - Filtered and sorted providers
 */
export function filterProvidersByLocation(providers, userPincode) {
  if (!validatePincodeFormat(userPincode)) {
    return providers
  }

  const userCity = getCityFromPincode(userPincode)
  if (!userCity) {
    return providers
  }

  // Calculate distance for each provider and filter
  const nearbyProviders = providers
    .map(provider => {
      let providerCity = null
      
      if (provider.location && validatePincodeFormat(provider.location.pincode)) {
        providerCity = getCityFromPincode(provider.location.pincode)
      } else if (provider.city) {
        const key = Object.keys(gujaratCities).find(
          k => gujaratCities[k].name.toLowerCase() === provider.city.toLowerCase()
        )
        providerCity = key ? gujaratCities[key] : null
      }

      if (!providerCity) {
        return null
      }

      const distance = getDistanceBetweenCities(userCity.name, providerCity.name)
      
      return {
        ...provider,
        distance: distance,
        distanceText: formatDistance(distance),
        providerCity: providerCity
      }
    })
    .filter(p => p !== null && p.distance <= 50) // Within 50km
    .sort((a, b) => a.distance - b.distance)

  return nearbyProviders
}

export default {
  validatePincodeFormat,
  getCityFromPincode,
  checkServiceAvailability,
  getNearbyServiceAreas,
  getCitiesByRegion,
  getAllRegions,
  getDistanceBetweenCities,
  formatDistance,
  getAvailabilityBadge,
  filterProvidersByLocation,
  gujaratCities
}