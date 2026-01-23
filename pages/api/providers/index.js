import { getCollection } from '../../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const providersCollection = await getCollection('providers')

    // Get filters from query
    const { service, minRating, maxPrice, minPrice, available, responseTime, city } = req.query
    
    let query = {}

    // Filter by service
    if (service) {
      query.service = service
    }

    // Filter by rating
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) }
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.basePrice = {}
      if (minPrice) {
        query.basePrice.$gte = parseFloat(minPrice)
      }
      if (maxPrice) {
        query.basePrice.$lte = parseFloat(maxPrice)
      }
    }

    // Filter by availability
    if (available === 'true') {
      query.available = true
    } else if (available === 'false') {
      query.available = false
    }

    // Filter by response time
    if (responseTime) {
      query.responseTime = { $lte: parseFloat(responseTime) }
    }

    // Filter by city
    if (city) {
      query.city = city
    }

    // Get providers with sorting
    const sortBy = req.query.sortBy || 'rating'
    let sortObj = {}
    
    if (sortBy === 'rating') {
      sortObj = { rating: -1 }
    } else if (sortBy === 'price-low') {
      sortObj = { basePrice: 1 }
    } else if (sortBy === 'price-high') {
      sortObj = { basePrice: -1 }
    } else if (sortBy === 'experience') {
      sortObj = { experience: -1 }
    }

    const providers = await providersCollection
      .find(query)
      .sort(sortObj)
      .limit(50) // Limit to 50 providers per request
      .toArray()

    res.status(200).json({
      success: true,
      data: providers,
      count: providers.length
    })
  } catch (error) {
    console.error('Providers error:', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}
