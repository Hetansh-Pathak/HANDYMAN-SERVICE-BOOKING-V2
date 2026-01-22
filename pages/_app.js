import '../styles/globals.css'
import { UserProvider } from '../context/UserContext'
import { CartProvider } from '../context/CartContext'
import ToastProvider from '../components/Toast'
import SplashScreen from '../components/SplashScreen'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    // Request notification permission on app load (client-side only)
    try {
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission()
      }
    } catch (error) {
      console.warn('Notification permission request error:', error)
    }
  }, [])

  // Check if the component has its own layout (like auth pages)
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <UserProvider>
      <CartProvider>
        <ToastProvider>
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
          {getLayout(<Component {...pageProps} />)}
        </ToastProvider>
      </CartProvider>
    </UserProvider>
  )
}
