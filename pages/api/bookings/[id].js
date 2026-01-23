import { getCollection } from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    return await getBooking(id, res)
  } else if (req.method === 'PUT') {
    return await updateBooking(id, req, res)
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}

async function getBooking(id, res) {
  try {
    const bookingsCollection = await getCollection('bookings')

    const booking = await bookingsCollection.findOne({
      _id: new ObjectId(id)
    })

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    res.status(200).json({
      success: true,
      data: booking
    })
  } catch (error) {
    console.error('Get booking error:', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}

async function updateBooking(id, req, res) {
  try {
    const bookingsCollection = await getCollection('bookings')
    const { status, rating, review, paymentStatus } = req.body

    const updateData = {
      ...(status && { status }),
      ...(paymentStatus && { paymentStatus }),
      ...(rating !== undefined && { rating }),
      ...(review && { review }),
      updatedAt: new Date()
    }

    const result = await bookingsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    // If booking is completed and has a rating, update provider rating
    if (status === 'completed' && rating) {
      const booking = await bookingsCollection.findOne({ _id: new ObjectId(id) })
      const providersCollection = await getCollection('providers')

      // Update provider rating (simplified average)
      await providersCollection.updateOne(
        { _id: booking.providerId },
        {
          $inc: { reviews: 1 },
          $push: { ratings: rating }
        }
      )
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully'
    })
  } catch (error) {
    console.error('Update booking error:', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}
