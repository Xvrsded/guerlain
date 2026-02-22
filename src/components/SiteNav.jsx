import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

export default function SiteNav({ cartCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let frameId = null

    const onScroll = () => {
      if (frameId) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        const y = window.scrollY
        setIsScrolled((prev) => {
          if (prev) {
            return y > 14
          }
          return y > 44
        })
        frameId = null
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return (
    <motion.header
      className={`site-nav-wrap ${isScrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="site-nav">
        <NavLink to="/" className="brand" aria-label="Guerlain Home">
          <span className="brand-word">GUERLAIN</span>
          <small className="brand-sub">PARIS · 1828</small>
        </NavLink>
        <nav className="site-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/cart" className="cart-link">
            Cart
            {cartCount > 0 ? (
              <motion.span
                className="cart-badge"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                {cartCount}
              </motion.span>
            ) : null}
          </NavLink>
        </nav>
      </div>
    </motion.header>
  )
}
