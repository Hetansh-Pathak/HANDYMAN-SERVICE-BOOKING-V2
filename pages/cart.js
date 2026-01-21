import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { useToast } from '../components/Toast'

export default function CartPage() {
  const router = useRouter()
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const { user } = useUser()
  const { showToast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleRemove = (cartId) => {
    removeFromCart(cartId)
    showToast('Item removed from cart', 'info')
  }

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(cartId)
      showToast('Item removed from cart', 'info')
    } else {
      updateQuantity(cartId, newQuantity)
      showToast('Quantity updated', 'info', 1500)
    }
  }

  const handleCheckout = () => {
    if (!user) {
      router.push(`/auth/login?redirect=${encodeURIComponent('/cart')}`)
      return
    }

    setIsProcessing(true)
    showToast('Processing your booking...', 'info')
    // Simulate payment processing
    setTimeout(() => {
      // Clear cart and redirect to success page
      clearCart()
      showToast('Booking confirmed! 🎉', 'success')
      setTimeout(() => {
        router.push('/dashboard/user?tab=bookings')
      }, 1500)
    }, 2000)
  }

  if (cart.length === 0) {
    return (
      <Layout title="Shopping Cart - HandyFix">
        <div style={containerStyle}>
          <div className="container">
            <div style={emptyCartStyle}>
              <div style={emptyIconStyle}>🛒</div>
              <h1 style={emptyTitleStyle}>Your Cart is Empty</h1>
              <p style={emptyMessageStyle}>
                Browse services and add them to your cart to get started.
              </p>
              <Link href="/services" style={continueBtnStyle} className="btn btn-primary">
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Shopping Cart - HandyFix">
      <div style={containerStyle}>
        <div className="container">
          <div style={headerStyle}>
            <h1 style={titleStyle}>Shopping Cart</h1>
            <p style={itemCountStyle}>{cart.length} item{cart.length > 1 ? 's' : ''}</p>
          </div>

          <div style={gridStyle}>
            {/* Cart Items */}
            <div style={cartItemsStyle}>
              <div style={itemsWrapperStyle}>
                {cart.map((item) => (
                  <div key={item.cartId} style={cartItemStyle}>
                    <div style={itemIconStyle}>{item.icon || '🔧'}</div>
                    
                    <div style={itemDetailsStyle}>
                      <h3 style={itemNameStyle}>{item.name || 'Service'}</h3>
                      <p style={itemProviderStyle}>{item.provider || 'Provider'}</p>
                      {item.description && (
                        <p style={itemDescriptionStyle}>{item.description}</p>
                      )}
                    </div>

                    <div style={itemPriceStyle}>
                      <span style={priceStyle}>₹{item.price || 0}</span>
                    </div>

                    <div style={quantityControlStyle}>
                      <button 
                        style={quantityBtnStyle}
                        onClick={() => handleQuantityChange(item.cartId, (item.quantity || 1) - 1)}
                      >
                        −
                      </button>
                      <span style={quantityDisplayStyle}>{item.quantity || 1}</span>
                      <button 
                        style={quantityBtnStyle}
                        onClick={() => handleQuantityChange(item.cartId, (item.quantity || 1) + 1)}
                      >
                        +
                      </button>
                    </div>

                    <div style={itemTotalStyle}>
                      ₹{(item.price || 0) * (item.quantity || 1)}
                    </div>

                    <button
                      style={removeBtnStyle}
                      onClick={() => handleRemove(item.cartId)}
                      title="Remove from cart"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div style={summaryStyle}>
              <div style={summaryCardStyle}>
                <h2 style={summaryTitleStyle}>Order Summary</h2>

                <div style={summaryLineStyle}>
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice()}</span>
                </div>

                <div style={summaryLineStyle}>
                  <span>Taxes & Fees</span>
                  <span>₹0</span>
                </div>

                <div style={summaryLineStyle}>
                  <span>Discount</span>
                  <span style={discountTextStyle}>-₹0</span>
                </div>

                <div style={dividerStyle}></div>

                <div style={totalLineStyle}>
                  <span>Total</span>
                  <span style={totalAmountStyle}>₹{getTotalPrice()}</span>
                </div>

                <button
                  className="btn btn-primary"
                  style={checkoutBtnStyle}
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span style={spinnerStyle} className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    `Proceed to Checkout`
                  )}
                </button>

                <button
                  style={continueBtnStyle}
                  onClick={() => router.push('/services')}
                >
                  Continue Shopping
                </button>

                <div style={securityStyle}>
                  🔒 Secure checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// ==================== STYLES ====================

const containerStyle = {
  background: '#F7F9FC',
  minHeight: 'calc(100vh - 300px)',
  padding: '40px 0'
}

const headerStyle = {
  marginBottom: '40px'
}

const titleStyle = {
  fontSize: '36px',
  fontWeight: '700',
  color: '#111111',
  margin: '0 0 8px'
}

const itemCountStyle = {
  fontSize: '16px',
  color: '#555555',
  margin: 0
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '32px'
}

const cartItemsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
}

const itemsWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}

const cartItemStyle = {
  display: 'grid',
  gridTemplateColumns: '60px 1fr 100px 120px 100px 40px',
  gap: '16px',
  alignItems: 'center',
  background: 'white',
  padding: '16px 20px',
  borderRadius: '12px',
  border: '1px solid #E8EAED',
  transition: 'all 0.3s ease'
}

const itemIconStyle = {
  fontSize: '32px',
  textAlign: 'center',
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#F7F9FC',
  borderRadius: '8px'
}

const itemDetailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
}

const itemNameStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#111111',
  margin: 0
}

const itemProviderStyle = {
  fontSize: '13px',
  color: '#888888',
  margin: 0
}

const itemDescriptionStyle = {
  fontSize: '12px',
  color: '#555555',
  margin: 0
}

const itemPriceStyle = {
  textAlign: 'right'
}

const priceStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#0A66FF'
}

const quantityControlStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  border: '1px solid #E8EAED',
  borderRadius: '6px',
  padding: '6px 8px',
  background: '#F7F9FC'
}

const quantityBtnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '600',
  color: '#0A66FF',
  padding: '0 4px',
  transition: 'color 0.2s ease'
}

const quantityDisplayStyle = {
  minWidth: '30px',
  textAlign: 'center',
  fontWeight: '600',
  color: '#111111'
}

const itemTotalStyle = {
  textAlign: 'right',
  fontSize: '16px',
  fontWeight: '600',
  color: '#111111'
}

const removeBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#DC3545',
  fontSize: '18px',
  cursor: 'pointer',
  padding: '4px',
  transition: 'color 0.2s ease'
}

const summaryStyle = {
  position: 'sticky',
  top: '100px'
}

const summaryCardStyle = {
  background: 'white',
  borderRadius: '12px',
  border: '1px solid #E8EAED',
  padding: '24px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
}

const summaryTitleStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#111111',
  margin: '0 0 20px'
}

const summaryLineStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
  color: '#555555',
  marginBottom: '12px'
}

const dividerStyle = {
  height: '1px',
  background: '#E8EAED',
  margin: '16px 0'
}

const totalLineStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '18px',
  fontWeight: '700',
  color: '#111111',
  marginBottom: '20px'
}

const totalAmountStyle = {
  color: '#0A66FF'
}

const checkoutBtnStyle = {
  width: '100%',
  marginBottom: '12px',
  padding: '12px 16px',
  minHeight: '48px'
}

const continueBtnStyle = {
  width: '100%',
  padding: '12px 16px',
  fontSize: '14px',
  color: '#0A66FF',
  background: 'transparent',
  border: '2px solid #E8EAED',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'all 0.2s ease',
  marginBottom: '20px'
}

const securityStyle = {
  textAlign: 'center',
  fontSize: '13px',
  color: '#888888'
}

const spinnerStyle = {
  display: 'inline-block',
  width: '14px',
  height: '14px',
  borderWidth: '2px'
}

const emptyCartStyle = {
  textAlign: 'center',
  padding: '60px 20px'
}

const emptyIconStyle = {
  fontSize: '80px',
  marginBottom: '24px'
}

const emptyTitleStyle = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#111111',
  margin: '0 0 12px'
}

const emptyMessageStyle = {
  fontSize: '16px',
  color: '#555555',
  margin: '0 0 32px'
}
