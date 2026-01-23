# Performance Optimization Guide

This document outlines the performance optimizations implemented in the HandyFix application and how to further improve performance.

## Current Optimizations

### 1. **Code Splitting & Bundle Optimization**
- Next.js automatically splits code by page routes
- Dynamic imports are used for heavy components
- `next.config.js` is configured for SWC minification

### 2. **Lazy Loading**
- Provider cards use Intersection Observer API for lazy loading
- Components load only when they come into viewport
- `LazyProviderCard` component defers rendering until visible

### 3. **API Response Caching**
- `ResponseCache` class caches API responses with 5-minute TTL
- `cachedFetch` utility function automatically caches successful responses
- Reduces unnecessary API calls for repeated requests

### 4. **Image Optimization**
- Next.js Image component configured in `next.config.js`
- WebP and AVIF format support for better compression
- Automatic responsive image serving

### 5. **Browser Caching**
- Static files cached with 1-year max-age headers
- API responses cached with stale-while-revalidate strategy
- Configured in `next.config.js`

## Performance Monitoring

### Using Performance Utilities
```javascript
import { measurePerformance, cachedFetch } from '../lib/performance'

// Measure function execution time
const done = measurePerformance('API call')
// ... do something
done() // Logs execution time

// Use cached fetch
const data = await cachedFetch('/api/services')
```

### Monitoring in Production
1. **Vercel Analytics** (if deployed to Vercel)
   - Automatic Core Web Vitals tracking
   - Real-time performance metrics

2. **Google Lighthouse**
   - Run: `npm run build` then deploy
   - Check performance scores

3. **Chrome DevTools**
   - Performance tab for detailed metrics
   - Network tab to check bundle sizes

## Further Optimizations

### 1. **Database Query Optimization**
```javascript
// Create indexes for frequently queried fields
db.collection('providers').createIndex({ city: 1, rating: -1 })
db.collection('bookings').createIndex({ userId: 1, createdAt: -1 })
```

### 2. **CDN for Static Assets**
```bash
# Deploy static files to CDN (e.g., Cloudflare, AWS CloudFront)
# Configure in next.config.js:
assetPrefix: 'https://cdn.example.com'
```

### 3. **Compression**
```javascript
// Enable Gzip compression (handled by Next.js)
// Verify with: curl -i -H "Accept-Encoding: gzip" http://localhost:3000
```

### 4. **Service Worker (PWA)**
```bash
# Add service worker for offline support and caching
npm install workbox-webpack-plugin
```

### 5. **Database Connection Pooling**
```javascript
// In lib/mongodb.js, configure connection pooling
{
  maxPoolSize: 10,
  minPoolSize: 2
}
```

### 6. **API Rate Limiting**
```javascript
// Add rate limiting middleware to prevent abuse
npm install express-rate-limit
```

## Bundle Size Analysis

To analyze and reduce bundle size:

```bash
# Generate bundle analysis
npm install --save-dev @next/bundle-analyzer

# In next.config.js:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)

# Run analysis:
ANALYZE=true npm run build
```

## Performance Metrics Target

- **Largest Contentful Paint (LCP):** < 2.5s
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Contentful Paint (FCP):** < 1.8s
- **Time to Interactive (TTI):** < 3.8s

## Monitoring Commands

```bash
# Check build size
npm run build

# Run Lighthouse audit (requires Chrome)
npm install -g lighthouse
lighthouse http://localhost:3000 --view

# Profile API response times
npm install clinic
node clinic.js doctor -- node pages/api/providers/index.js

# Memory profiling
node --inspect pages/api/providers/index.js
```

## Production Deployment Tips

1. **Enable compression** on your hosting platform
2. **Use HTTPS** for all connections
3. **Set up monitoring** (Sentry, DataDog, etc.)
4. **Enable caching headers** via CDN
5. **Use database indexes** for frequently accessed fields
6. **Implement API rate limiting** to prevent abuse
7. **Use connection pooling** for database connections

## Testing Performance

```javascript
// pages/api/health.js
export default function handler(req, res) {
  const startTime = performance.now()
  
  // Simulate some work
  const result = array.filter(item => item > 5).map(item => item * 2)
  
  const endTime = performance.now()
  const duration = endTime - startTime
  
  res.status(200).json({
    status: 'healthy',
    duration: duration.toFixed(2) + 'ms',
    timestamp: new Date().toISOString()
  })
}
```

## References

- [Next.js Performance Documentation](https://nextjs.org/docs/pages/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [MongoDB Performance Best Practices](https://docs.mongodb.com/manual/administration/analyzing-mongodb-performance/)
