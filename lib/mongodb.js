import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb://localhost:27017/handyfix'
const MONGODB_DB = 'handyfix'

if (!MONGODB_URI) {
  throw new Error('Please define the NEXT_PUBLIC_MONGODB_URI environment variable')
}

let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = client.db(MONGODB_DB)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function closeDatabase() {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
    cachedDb = null
  }
}

// Collection helpers
export async function getCollection(collectionName) {
  const { db } = await connectToDatabase()
  return db.collection(collectionName)
}
