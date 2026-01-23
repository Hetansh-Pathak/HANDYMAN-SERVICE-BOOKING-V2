// This script seeds the MongoDB database with initial data
// Run with: node scripts/seedDatabase.js

const { MongoClient } = require('mongodb')

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb://localhost:27017/handyfix'
const MONGODB_DB = 'handyfix'

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    await client.connect()
    console.log('Connected to MongoDB')

    const db = client.db(MONGODB_DB)

    // Create collections if they don't exist
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map(c => c.name)

    // Services
    if (!collectionNames.includes('services')) {
      const servicesCollection = db.collection('services')
      await servicesCollection.insertMany([
        {
          name: 'Plumbing',
          icon: '🔧',
          description: 'Pipe repairs, leak fixes, installation',
          category: 'home-maintenance',
          createdAt: new Date()
        },
        {
          name: 'Electrical',
          icon: '⚡',
          description: 'Wiring, appliance installation, repairs',
          category: 'home-maintenance',
          createdAt: new Date()
        },
        {
          name: 'Carpentry',
          icon: '🔨',
          description: 'Furniture repair, custom woodwork',
          category: 'construction',
          createdAt: new Date()
        },
        {
          name: 'AC Repair',
          icon: '❄️',
          description: 'AC servicing, installation, maintenance',
          category: 'appliances',
          createdAt: new Date()
        },
        {
          name: 'Painting',
          icon: '🎨',
          description: 'Interior and exterior painting',
          category: 'home-improvement',
          createdAt: new Date()
        },
        {
          name: 'Cleaning',
          icon: '🧽',
          description: 'Deep cleaning, regular maintenance',
          category: 'cleaning',
          createdAt: new Date()
        }
      ])
      console.log('✓ Services collection created and seeded')
    }

    // Providers (sample data)
    if (!collectionNames.includes('providers')) {
      const providersCollection = db.collection('providers')
      await providersCollection.insertMany([
        {
          name: 'Rajesh Kumar',
          email: 'rajesh@example.com',
          phone: '9876543210',
          service: 'Plumbing',
          experience: 8,
          address: 'Sector 7, Gurugram',
          city: 'Gurugram',
          basePrice: 500,
          rating: 4.8,
          reviews: 156,
          completedJobs: 245,
          available: true,
          responseTime: 15,
          verified: true,
          ratings: Array(156).fill(4.8),
          createdAt: new Date()
        },
        {
          name: 'Amit Sharma',
          email: 'amit@example.com',
          phone: '9876543211',
          service: 'Electrical',
          experience: 12,
          address: 'DLF Phase 3, Gurugram',
          city: 'Gurugram',
          basePrice: 600,
          rating: 4.9,
          reviews: 312,
          completedJobs: 312,
          available: true,
          responseTime: 20,
          verified: true,
          ratings: Array(312).fill(4.9),
          createdAt: new Date()
        },
        {
          name: 'Priya Singh',
          email: 'priya@example.com',
          phone: '9876543212',
          service: 'Cleaning',
          experience: 5,
          address: 'Sector 12, Gurugram',
          city: 'Gurugram',
          basePrice: 300,
          rating: 4.7,
          reviews: 189,
          completedJobs: 189,
          available: false,
          responseTime: 25,
          verified: true,
          ratings: Array(189).fill(4.7),
          createdAt: new Date()
        },
        {
          name: 'Vikram Patel',
          email: 'vikram@example.com',
          phone: '9876543213',
          service: 'Carpentry',
          experience: 10,
          address: 'Sector 46, Gurugram',
          city: 'Gurugram',
          basePrice: 800,
          rating: 4.6,
          reviews: 142,
          completedJobs: 198,
          available: true,
          responseTime: 30,
          verified: true,
          ratings: Array(142).fill(4.6),
          createdAt: new Date()
        },
        {
          name: 'Neha Gupta',
          email: 'neha@example.com',
          phone: '9876543214',
          service: 'AC Repair',
          experience: 11,
          address: 'Sector 28, Gurugram',
          city: 'Gurugram',
          basePrice: 700,
          rating: 4.9,
          reviews: 267,
          completedJobs: 298,
          available: true,
          responseTime: 15,
          verified: true,
          ratings: Array(267).fill(4.9),
          createdAt: new Date()
        }
      ])
      console.log('✓ Providers collection created and seeded')
    }

    // Create indexes for better performance
    if (collectionNames.includes('services')) {
      const servicesCollection = db.collection('services')
      await servicesCollection.createIndex({ name: 1 })
      console.log('✓ Created index on services.name')
    }

    if (collectionNames.includes('providers')) {
      const providersCollection = db.collection('providers')
      await providersCollection.createIndex({ service: 1 })
      await providersCollection.createIndex({ city: 1 })
      await providersCollection.createIndex({ rating: -1 })
      console.log('✓ Created indexes on providers collection')
    }

    console.log('\n✅ Database seeding completed!')
  } catch (error) {
    console.error('Database seeding error:', error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

seedDatabase()
