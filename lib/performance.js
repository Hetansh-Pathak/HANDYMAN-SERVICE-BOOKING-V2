// Performance optimization utilities for the handyman app

// Debounce function for optimizing frequent function calls
export function debounce(fn, delay = 300) {
  let timeoutId = null

  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }
}

// Throttle function for controlling function execution rate
export function throttle(fn, limit = 300) {
  let lastRun = Date.now()

  return function (...args) {
    const now = Date.now()

    if (now - lastRun >= limit) {
      fn(...args)
      lastRun = now
    }
  }
}

// Lazy load function for intersection observer
export function lazyLoad(element, callback) {
  if (!('IntersectionObserver' in window)) {
    callback(element)
    return
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  observer.observe(element)
}

// Cache API responses with TTL (Time To Live)
export class ResponseCache {
  constructor(ttl = 5 * 60 * 1000) {
    this.cache = new Map()
    this.ttl = ttl
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    })
  }

  get(key) {
    const cached = this.cache.get(key)

    if (!cached) return null

    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return cached.value
  }

  clear() {
    this.cache.clear()
  }
}

// Create a shared response cache instance
export const apiCache = new ResponseCache(5 * 60 * 1000) // 5 minutes TTL

// Optimized API fetch with caching
export async function cachedFetch(url, options = {}) {
  // Check cache first
  const cached = apiCache.get(url)
  if (cached) return cached

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    // Cache the response
    apiCache.set(url, data)

    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

// Performance monitoring
export function measurePerformance(label) {
  const startTime = performance.now()

  return () => {
    const endTime = performance.now()
    console.log(`${label} took ${(endTime - startTime).toFixed(2)}ms`)
  }
}

// Request idle callback polyfill
export function requestIdleCallback(callback, options = {}) {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options)
  }

  const startTime = Date.now()
  return setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - startTime))
    })
  }, 1)
}
