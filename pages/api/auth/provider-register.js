import { getCollection } from '../../../lib/mongodb'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, password, phone, service, experience, address, city, basePrice } = req.body

    // Validate input
    if (!name || !email || !password || !service) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const usersCollection = await getCollection('users')
    const providersCollection = await getCollection('providers')

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    // Create user account
    const userResult = await usersCollection.insertOne({
      name,
      email,
      password, // TODO: Hash password using bcryptjs
      userType: 'provider',
      phone,
      createdAt: new Date(),
      verified: false,
      profileComplete: false,
      ratings: [],
      bookings: []
    })

    // Create provider profile
    const providerResult = await providersCollection.insertOne({
      userId: userResult.insertedId,
      name,
      email,
      phone,
      service,
      experience: experience || 0,
      address,
      city,
      basePrice: basePrice || 500,
      rating: 5.0,
      reviews: 0,
      completedJobs: 0,
      available: true,
      responseTime: 30, // minutes
      verified: false,
      bankDetails: null,
      documents: [],
      certificates: [],
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Generate JWT token
    const token = jwt.sign(
      { userId: userResult.insertedId, email, userType: 'provider' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    )

    res.status(201).json({
      success: true,
      message: 'Provider registered successfully',
      user: {
        id: userResult.insertedId,
        name,
        email,
        userType: 'provider'
      },
      providerId: providerResult.insertedId,
      token
    })
  } catch (error) {
    console.error('Provider registration error:', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}
