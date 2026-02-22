import { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SiteNav from './components/SiteNav'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import OrdersPage from './pages/OrdersPage'
import ProductPage from './pages/ProductPage'
import ShopPage from './pages/ShopPage'
import { fetchProducts } from './services/productService'

const CART_STORAGE_KEY = 'velora-cart-items'
const ORDERS_STORAGE_KEY = 'velora-order-history'

export default function App() {
  const [products, setProducts] = useState([])
  const [isProductsLoading, setIsProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState('')

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [globalNotice, setGlobalNotice] = useState('')
  const noticeTimerRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current) {
        clearTimeout(noticeTimerRef.current)
      }
    }
  }, [])

  const showGlobalNotice = (text) => {
    if (noticeTimerRef.current) {
      clearTimeout(noticeTimerRef.current)
    }
    setGlobalNotice(text)
    noticeTimerRef.current = setTimeout(() => {
      setGlobalNotice('')
    }, 1800)
  }

  useEffect(() => {
    const loadProducts = async () => {
      setIsProductsLoading(true)
      setProductsError('')
      try {
        const response = await fetchProducts({ forceRefresh: true })
        setProducts(response)
      } catch {
        setProductsError('Unable to load products. Please refresh the page.')
      } finally {
        setIsProductsLoading(false)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    if (!products.length) {
      return
    }

    setCartItems((prev) => {
      let changed = false
      const synced = []

      prev.forEach((item) => {
        const latest = products.find((product) => product.id === item.id)
        if (!latest || latest.stock <= 0) {
          changed = true
          return
        }

        const clampedQty = Math.min(item.qty, latest.stock)
        if (clampedQty !== item.qty) {
          changed = true
        }

        synced.push({ ...latest, qty: clampedQty })
      })

      return changed ? synced : prev
    })
  }, [products])

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems])

  const addToCart = (product) => {
    setCartItems((prev) => {
      if (!product || product.stock <= 0) {
        showGlobalNotice('This product is currently out of stock.')
        return prev
      }

      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        if (existing.qty >= product.stock) {
          showGlobalNotice('You have reached the available stock limit in your cart.')
          return prev
        }
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item))
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item
        }
        if (item.qty >= item.stock) {
          return item
        }
        return { ...item, qty: item.qty + 1 }
      }),
    )
  }

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item))
        .filter((item) => item.qty > 0),
    )
  }

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const completeCheckout = (payload) => {
    const newOrder = {
      id: crypto.randomUUID(),
      customerName: payload.customerName,
      email: payload.email,
      address: payload.address,
      paymentMethod: payload.paymentMethod,
      items: payload.items,
      total: payload.total,
      createdAt: new Date().toISOString(),
    }
    setOrders((prev) => [newOrder, ...prev])
    setCartItems([])
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  return (
    <BrowserRouter>
      <SiteNav cartCount={cartCount} />
      {globalNotice ? <div className="global-toast">{globalNotice}</div> : null}
      <main className="site-shell">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                products={products}
                isProductsLoading={isProductsLoading}
                productsError={productsError}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <ShopPage
                products={products}
                isProductsLoading={isProductsLoading}
                productsError={productsError}
                onAddToCart={addToCart}
              />
            }
          />
          <Route path="/orders" element={<OrdersPage orders={orders} />} />
          <Route
            path="/product/:id"
            element={<ProductPage products={products} isProductsLoading={isProductsLoading} onAddToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
                onRemove={removeItem}
                onCheckoutComplete={completeCheckout}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
