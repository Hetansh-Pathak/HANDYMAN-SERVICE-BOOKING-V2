import { getCollection } from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return await getBookings(req, res)
  } else if (req.method === 'POST') {
    return await createBooking(req, res)
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}

async function getBookings(req, res) {
  try {
    const { userId } = req.query

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const bookingsCollection = await getCollection('bookings')
    const bookings = await bookingsCollection
      .find({ customerId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray()

    res.status(200).json({
      success: true,
      data: bookings,
      count: bookings.length
    })
  } catch (error) {
    console.error('Get bookings error:', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}

async function createBooking(req, res) {
  try {
    const { customerId, providerId, serviceId, scheduledDate, scheduledTime, address, notes, amount } = req.body

    // Validate input
    if (!customerId || !providerId || !serviceId || !scheduledDate || !amount) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const bookingsCollection = await getCollection('bookings')

    const newBooking = {
      customerId: new ObjectId(customerId),
      providerId: new ObjectId(providerId),
      serviceId: new ObjectId(serviceId),
      status: 'pending', // pending, confirmed, in-progress, completed, cancelled
      scheduledDate,
      scheduledTime,
      address,
      notes,
      amount,
      createdAt: new Date(),
      updatedAt: new Date(),
      rating: null,
      review: null,
      paymentStatus: 'pending' // pending, completed, failed, refunded
    }

    const result = await bookingsCollection.insertOne(newBooking)

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      bookingId: result.insertedId,
      booking: newBooking
    })
  } catch (error) {
    console.error('Create booking error:', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}
