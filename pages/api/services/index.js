import { getCollection } from '../../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const servicesCollection = await getCollection('services')

    // Get all services or filter by query
    const { category, search } = req.query
    let query = {}

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }

    const services = await servicesCollection.find(query).toArray()

    res.status(200).json({
      success: true,
      data: services,
      count: services.length
    })
  } catch (error) {
    console.error('Services error:', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}
