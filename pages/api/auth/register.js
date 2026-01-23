import { getCollection } from '../../../lib/mongodb'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, password, userType, phone } = req.body

    // Validate input
    if (!name || !email || !password || !userType) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const usersCollection = await getCollection('users')

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    // Create new user (Note: In production, hash the password!)
    const newUser = {
      name,
      email,
      password, // TODO: Hash password using bcryptjs
      userType, // 'customer' or 'provider'
      phone,
      createdAt: new Date(),
      verified: false,
      profileComplete: false,
      ratings: [],
      bookings: []
    }

    const result = await usersCollection.insertOne(newUser)

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertedId, email, userType },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    )

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: result.insertedId,
        name,
        email,
        userType
      },
      token
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}
