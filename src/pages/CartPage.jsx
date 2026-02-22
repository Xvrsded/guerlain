import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedContent from '../components/AnimatedContent'
import BlurText from '../components/BlurText'

export default function CartPage({ cartItems, onIncrease, onDecrease, onRemove, onCheckoutComplete }) {
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0), [cartItems])
  const checkoutFormRef = useRef(null)
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer')
  const [isPaying, setIsPaying] = useState(false)
  const [paymentMessage, setPaymentMessage] = useState('')

  const handleCheckout = async (event) => {
    event.preventDefault()

    if (!customerName || !email || !address) {
      setPaymentMessage('Please complete your checkout details first.')
      return
    }

    if (!cartItems.length) {
      setPaymentMessage('Your cart is empty. Add products before checkout.')
      return
    }

    setIsPaying(true)
    setPaymentMessage('Processing payment...')

    await new Promise((resolve) => {
      setTimeout(resolve, 1600)
    })

    setIsPaying(false)
    setPaymentMessage(`Payment successful for ${customerName} via ${paymentMethod}.`)
    onCheckoutComplete({
      customerName,
      email,
      address,
      paymentMethod,
      items: cartItems,
      total: subtotal,
    })
    setCustomerName('')
    setEmail('')
    setAddress('')
    setPaymentMethod('Bank Transfer')
  }

  const focusCheckoutForm = () => {
    checkoutFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="page-section">
      <AnimatedContent>
        <BlurText text="Your Cart" className="page-title" />
        <p className="page-sub">Review your selected Guerlain essentials before checkout.</p>
      </AnimatedContent>

      <AnimatedContent delay={0.1}>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is currently empty.</p>
            <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <article key={item.id} className="cart-item">
                  <div>
                    <small>{item.category}</small>
                    <h4>{item.name}</h4>
                    <small>Stock available: {item.stock}</small>
                    <p>${item.price}</p>
                  </div>
                  <div className="qty-actions">
                    <button type="button" onClick={() => onDecrease(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => onIncrease(item.id)} disabled={item.qty >= item.stock}>+</button>
                  </div>
                  <button type="button" className="remove-btn" onClick={() => onRemove(item.id)}>Remove</button>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <strong>Subtotal</strong>
              <h3>${subtotal.toFixed(2)}</h3>
              <button type="button" className="btn btn-primary" onClick={focusCheckoutForm}>
                Checkout Now
              </button>
            </div>

            <form className="checkout-form" onSubmit={handleCheckout} ref={checkoutFormRef}>
              <h4>Checkout Details</h4>
              <div className="form-grid">
                <label>
                  Full Name
                  <input
                    type="text"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder="Enter your full name"
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@email.com"
                  />
                </label>
              </div>
              <label>
                Shipping Address
                <textarea
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  rows={3}
                  placeholder="Enter your complete address"
                />
              </label>
              <label>
                Payment Method
                <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                  <option>Bank Transfer</option>
                  <option>E-Wallet</option>
                  <option>Virtual Account</option>
                </select>
              </label>

              <button type="submit" className="btn btn-primary" disabled={isPaying}>
                {isPaying ? 'Processing...' : `Pay $${subtotal.toFixed(2)}`}
              </button>
              {paymentMessage ? <p className="payment-message">{paymentMessage}</p> : null}
            </form>
          </>
        )}
      </AnimatedContent>
    </section>
  )
}
