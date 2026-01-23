import { getCollection } from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    return await getProvider(id, res)
  } else if (req.method === 'PUT') {
    return await updateProvider(id, req, res)
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}

async function getProvider(id, res) {
  try {
    const providersCollection = await getCollection('providers')
    
    const provider = await providersCollection.findOne({
      _id: new ObjectId(id)
    })

    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' })
    }

    res.status(200).json({
      success: true,
      data: provider
    })
  } catch (error) {
    console.error('Get provider error:', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}

async function updateProvider(id, req, res) {
  try {
    const providersCollection = await getCollection('providers')

    const { name, bio, basePrice, experience, available, address, city, phone, certificates } = req.body

    const updateData = {
      ...(name && { name }),
      ...(bio && { bio }),
      ...(basePrice && { basePrice }),
      ...(experience && { experience }),
      ...(available !== undefined && { available }),
      ...(address && { address }),
      ...(city && { city }),
      ...(phone && { phone }),
      ...(certificates && { certificates }),
      updatedAt: new Date()
    }

    const result = await providersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Provider not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Provider updated successfully'
    })
  } catch (error) {
    console.error('Update provider error:', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}
