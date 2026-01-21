import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [isClient, setIsClient] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    setIsClient(true)
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const savedCart = localStorage.getItem('handyfix_cart')
        if (savedCart) {
          setCart(JSON.parse(savedCart))
        }
      }
    } catch (error) {
      console.warn('Cart load error:', error)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isClient && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('handyfix_cart', JSON.stringify(cart))
      } catch (error) {
        console.warn('Cart save error:', error)
      }
    }
  }, [cart, isClient])

  const addToCart = (service) => {
    // Check if service already exists
    const existingItem = cart.find(item => item.id === service.id)

    if (existingItem) {
      // If exists, increase quantity
      setCart(prev =>
        prev.map(item =>
          item.id === service.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      )
    } else {
      // If new, add to cart
      setCart(prev => [
        ...prev,
        {
          ...service,
          cartId: Date.now(),
          quantity: 1,
          addedAt: new Date().toISOString()
        }
      ])
    }
  }

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId))
  }

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId)
    } else {
      setCart(prev =>
        prev.map(item =>
          item.cartId === cartId ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.price || 0
      const quantity = item.quantity || 1
      return total + (price * quantity)
    }, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + (item.quantity || 1), 0)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getCartCount,
    isClient
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
