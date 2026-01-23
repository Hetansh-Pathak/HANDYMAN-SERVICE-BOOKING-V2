# HandyFix - Handyman Service Booking Platform Setup Guide

Welcome to HandyFix! This is a comprehensive guide to set up and run your handyman service booking platform.

## 🎯 Project Overview

HandyFix is a modern web application that connects customers with verified service providers. Users can browse services, filter by various criteria, book providers, and manage their bookings. Service providers can register, manage their profiles, and accept bookings.

## ✨ Features Implemented

### Frontend Enhancements
- ✅ **Attractive Home Page** - Enhanced hero section with gradient backgrounds and smooth animations
- ✅ **Services Page** - Integrated service browsing with visual category filters
- ✅ **Advanced Filters** - Service type, price range, rating, availability, experience level, response time
- ✅ **User Dashboard** - Customer dashboard with booking management and quick actions
- ✅ **Authentication** - Login/Signup with user profile management
- ✅ **Responsive Design** - Works on all devices with smooth animations
- ✅ **Performance Optimized** - Lazy loading, code splitting, API caching

### Backend Features
- ✅ **MongoDB Integration** - Set up with connection pooling and indexes
- ✅ **API Endpoints** - RESTful APIs for auth, services, providers, and bookings
- ✅ **Database Models** - Collections for users, providers, services, and bookings
- ✅ **Authentication** - JWT-based token generation
- ✅ **Data Validation** - Input validation on API endpoints

## 🚀 Getting Started

### 1. **Install Dependencies**

```bash
cd /root/app/code
npm install
```

The project includes:
- **Next.js 14** - React framework
- **React 18** - UI library
- **MongoDB Driver** - Database connectivity

### 2. **Set Up MongoDB**

#### Option A: Local MongoDB (Development)
```bash
# Install MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify connection
mongosh
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/handyfix`

### 3. **Configure Environment Variables**

Create `.env.local` file in the root directory:

```bash
# For local MongoDB
NEXT_PUBLIC_MONGODB_URI=mongodb://localhost:27017/handyfix

# For MongoDB Atlas
NEXT_PUBLIC_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/handyfix

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# JWT Secret (change in production!)
JWT_SECRET=your-secret-jwt-key-change-this-in-production
```

### 4. **Seed Database with Initial Data**

```bash
# Option 1: Using the seeding script
node scripts/seedDatabase.js

# This will create collections and insert:
# - 6 service categories (Plumbing, Electrical, etc.)
# - 5 sample service providers
# - Indexes for optimal query performance
```

### 5. **Start the Development Server**

```bash
npm run dev
```

The app will be available at: `http://localhost:3000`

## 📁 Project Structure

```
handyman-service-booking/
├── pages/
│   ├── api/                    # API endpoints
│   │   ├── auth/              # Authentication endpoints
│   │   ├── services/          # Services endpoints
│   │   ├── providers/         # Providers endpoints
│   │   └── bookings/          # Bookings endpoints
│   ├── dashboard/             # Dashboard pages
│   ├── auth/                  # Auth pages (login, register)
│   ├── services/              # Services listing page
│   ├── index.js              # Home page
│   └── _app.js               # Next.js app wrapper
├── components/
│   ├── Layout.js             # Main layout component
│   ├── LazyProviderCard.js   # Lazy-loaded provider card
│   ├── PincodeSearch.js      # Location search component
│   └── ...
├── lib/
│   ├── mongodb.js            # MongoDB connection utilities
│   ├── performance.js        # Performance optimization utilities
│   ├── auth.js               # Auth utilities
│   └── pincodeService.js     # Location service utilities
├── context/
│   ├── UserContext.js        # User state management
│   └── CartContext.js        # Cart state management
├── styles/
│   ├── globals.css           # Global styles and animations
│   └── layout.module.css     # Layout-specific styles
├── scripts/
│   └── seedDatabase.js       # Database seeding script
├── .env.local                # Environment variables (create this)
├── .env.example              # Environment variables template
├── SETUP_GUIDE.md            # This file
├── PERFORMANCE_GUIDE.md      # Performance optimization guide
└── package.json              # Project dependencies
```

## 🔑 Key Features Tour

### 1. **Home Page** (`/`)
- Eye-catching hero section with gradient background
- Service browsing with category selection
- Featured providers showcase
- Customer testimonials carousel
- Quick service selection buttons

### 2. **Services Page** (`/services`)
- Location-based search with pincode
- **Visual service category filters** (Browse by Service section)
- **Advanced filters**:
  - Search by provider name or service
  - Service type dropdown
  - Price range slider
  - Minimum rating filter
  - Availability status
  - Minimum experience
  - Response time
  - Sort options (Rating, Price, Experience)
- Provider cards with ratings, reviews, and quick actions
- View Profile and Book Now buttons

### 3. **User Dashboard** (`/dashboard/user`)
- User profile with statistics
- **Stats Cards**: Total bookings, completed, average rating, total spent
- **Quick Actions**: Find Service, My Bookings, Saved Providers, Settings
- Booking history with status tracking
- Filter bookings by status

### 4. **Authentication**
- Email/password login and registration
- Provider registration with additional fields
- JWT-based authentication
- Protected dashboard routes

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/provider-register` - Provider registration

### Services
- `GET /api/services` - List all services
- `GET /api/services?search=plumbing` - Search services

### Providers
- `GET /api/providers` - List providers with filters
- `GET /api/providers/[id]` - Get provider details
- `PUT /api/providers/[id]` - Update provider profile

### Bookings
- `GET /api/bookings?userId=xxx` - Get user's bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/[id]` - Get booking details
- `PUT /api/bookings/[id]` - Update booking status or add review

## 📱 Testing the App

### Test Login Credentials

You can create your own account via registration, or use mock data from the `lib/auth.js` file.

### Test Flows

1. **Customer Flow**:
   - Sign up as customer
   - Browse services and providers
   - Filter by service, price, rating
   - View provider details
   - Book a service
   - Track booking status

2. **Provider Flow**:
   - Register as service provider
   - Complete profile with service details
   - View bookings
   - Manage availability

## ⚙️ Configuration

### Database Indexes

The seeding script creates these indexes for optimal performance:

```javascript
// Services
db.services.createIndex({ name: 1 })

// Providers
db.providers.createIndex({ service: 1 })
db.providers.createIndex({ city: 1 })
db.providers.createIndex({ rating: -1 })
```

### Environment Variables

Create `.env.local`:
```bash
# MongoDB (required)
NEXT_PUBLIC_MONGODB_URI=mongodb://localhost:27017/handyfix

# API (required)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# JWT Secret (required, change in production)
JWT_SECRET=your-secret-key

# Optional services
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 🚢 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Then redeploy
vercel --prod
```

### Deploy to Other Platforms

Ensure your hosting platform:
1. Supports Node.js 18+
2. Has MongoDB connection access
3. Supports environment variables
4. Has sufficient memory (minimum 512MB)

## 📊 Monitoring & Analytics

### Performance Monitoring
- See `PERFORMANCE_GUIDE.md` for detailed optimization tips
- Use Lighthouse audits: `lighthouse http://localhost:3000`
- Monitor API response times

### Error Tracking
- Implement Sentry for production error tracking
- Monitor MongoDB query performance
- Set up application logs

## 🔒 Security Considerations

**Important for Production:**

1. **Hash Passwords**: Install bcryptjs and hash passwords
```javascript
import bcrypt from 'bcryptjs'
const hashedPassword = await bcrypt.hash(password, 10)
```

2. **Environment Variables**: Keep JWT_SECRET secure, never commit it

3. **HTTPS**: Use HTTPS in production

4. **Rate Limiting**: Add API rate limiting
```bash
npm install express-rate-limit
```

5. **Input Validation**: Use libraries like Joi or Zod

6. **Database Security**: 
   - Use strong passwords
   - Enable MongoDB authentication
   - Restrict IP access in MongoDB Atlas

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [React Documentation](https://react.dev)
- [Web Performance Best Practices](https://web.dev/performance/)

## 🐛 Troubleshooting

### MongoDB Connection Error
```
MongoNetworkError: connect ECONNREFUSED
```
**Solution**: Ensure MongoDB is running
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Or use MongoDB Atlas (cloud)
```

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Solution**: Use a different port
```bash
npm run dev -- -p 3001
```

### Module Not Found
```
Error: Cannot find module 'mongodb'
```
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

## 💡 Next Steps

1. **Customize Services**: Add your specific service categories
2. **Add Payment Gateway**: Integrate Razorpay or Stripe
3. **Email Notifications**: Set up email for booking confirmations
4. **Push Notifications**: Add real-time notifications
5. **Provider Verification**: Implement document verification system
6. **Analytics**: Add Google Analytics for user tracking
7. **Ratings System**: Implement detailed rating and review system

## 📝 Notes

- The app currently uses mock authentication with localStorage
- Passwords are not hashed (implement bcryptjs for production)
- Email notifications are not yet implemented
- Payment gateway integration is not included

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review PERFORMANCE_GUIDE.md for optimization tips
3. Check MongoDB documentation for database issues
4. Review Next.js documentation for framework questions

---

**Happy coding! 🚀**

Your handyman service booking platform is ready to launch!
