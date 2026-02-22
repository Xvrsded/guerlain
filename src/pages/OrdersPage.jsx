import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import AnimatedContent from '../components/AnimatedContent'
import BlurText from '../components/BlurText'

export default function OrdersPage({ orders }) {
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  const { scrollY } = useScroll()
  const parallaxYSoft = useTransform(scrollY, [0, 550], [0, -22])
  const parallaxYDeep = useTransform(scrollY, [0, 550], [0, -38])

  const stats = useMemo(() => {
    const totalOrders = orders.length
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)
    const totalItems = orders.reduce(
      (sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.qty, 0),
      0,
    )

    const latestDate = orders[0]?.createdAt
      ? new Date(orders[0].createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      : '-'

    return { totalOrders, totalSpent, totalItems, latestDate }
  }, [orders])

  const loyaltyTier = stats.totalSpent >= 500 ? 'GOLD TIER' : 'SIGNATURE TIER'

  const filteredOrders = useMemo(() => {
    const base = orders.filter((order) => {
      const needle = query.trim().toLowerCase()
      if (!needle) {
        return true
      }

      const shortId = order.id.slice(-6).toLowerCase()
      return (
        shortId.includes(needle)
        || order.customerName.toLowerCase().includes(needle)
        || order.email.toLowerCase().includes(needle)
      )
    })

    if (sortBy === 'highest-total') {
      return [...base].sort((a, b) => b.total - a.total)
    }

    if (sortBy === 'lowest-total') {
      return [...base].sort((a, b) => a.total - b.total)
    }

    return [...base].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [orders, query, sortBy])

  const latestOrder = filteredOrders[0] ?? null

  const statCards = [
    { label: 'Total Orders', value: stats.totalOrders },
    { label: 'Total Spent', value: `$${stats.totalSpent.toFixed(2)}` },
    { label: 'Items Purchased', value: stats.totalItems },
    { label: 'Last Order', value: stats.latestDate },
  ]

  const motionEase = [0.22, 1, 0.36, 1]

  const statsGridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.04,
      },
    },
  }

  const statCardVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.995 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: motionEase },
    },
  }

  const orderListVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const orderCardVariants = {
    hidden: { opacity: 0, y: 14, scale: 0.995 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.34, ease: motionEase },
    },
  }

  return (
    <section className="page-section">
      <AnimatedContent>
        <div className="orders-hero">
          <motion.span
            className="orders-hero-shine"
            animate={{ x: ['-35%', '145%'], opacity: [0, 0.85, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="orders-hero-spark s1" />
          <span className="orders-hero-spark s2" />
          <motion.span className="orders-hero-parallax p1" style={{ y: parallaxYSoft }} />
          <motion.span className="orders-hero-parallax p2" style={{ y: parallaxYDeep }} />
          <span className="orders-hero-wave" />
          <div>
            <p className="orders-hero-kicker">MAISON ORDER DESK</p>
            <BlurText text="Order History" className="page-title" />
            <p className="page-sub">Your latest order history is securely stored on this device.</p>
            <div className="orders-hero-chips">
              <span>{loyaltyTier}</span>
              <span>Luxury Support Included</span>
            </div>
          </div>
          <motion.div
            className="orders-hero-orb"
            animate={{ y: [0, -12, 0], scale: [1, 1.08, 1], opacity: [0.72, 1, 0.72] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </AnimatedContent>

      <AnimatedContent delay={0.06}>
        <motion.div
          className="orders-stats-grid"
          variants={statsGridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {statCards.map((card, index) => (
            <motion.article
              key={card.label}
              className="orders-stat-card"
              variants={statCardVariants}
            >
              <small>{card.label}</small>
              <strong>{card.value}</strong>
            </motion.article>
          ))}
        </motion.div>
      </AnimatedContent>

      <AnimatedContent delay={0.1}>
        <div className="orders-toolbar">
          <label>
            Search Order
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Order ID, name, or email"
            />
          </label>
          <label>
            Sort
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="latest">Latest First</option>
              <option value="highest-total">Highest Total</option>
              <option value="lowest-total">Lowest Total</option>
            </select>
          </label>
        </div>

        {orders.length === 0 ? (
          <div className="orders-empty-state">
            <span className="orders-empty-glow" />
            <h4>No saved orders yet.</h4>
            <p>Explore the Shop page to place your first Maison order.</p>
            <Link to="/shop" className="btn btn-primary mini">Start Shopping</Link>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="orders-empty-state">
            <h4>No matching orders.</h4>
            <p>Try a different keyword or clear the search field.</p>
          </div>
        ) : (
          <>
            {latestOrder ? (
              <motion.section
                className="orders-spotlight"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.34, ease: motionEase }}
              >
                <div
                  className="orders-spotlight-image"
                  style={{ backgroundImage: `url(${latestOrder.items?.[0]?.image || ''})` }}
                />
                <div className="orders-spotlight-content">
                  <p className="orders-spotlight-kicker">LATEST ORDER SPOTLIGHT</p>
                  <h3>Order #{latestOrder.id.slice(-6).toUpperCase()}</h3>
                  <p>
                    Placed on {new Date(latestOrder.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })} · {latestOrder.paymentMethod}
                  </p>
                  <div className="orders-spotlight-chips">
                    <span>${latestOrder.total.toFixed(2)}</span>
                    <span>{latestOrder.items.reduce((sum, item) => sum + item.qty, 0)} item(s)</span>
                    <span>Delivered</span>
                  </div>
                </div>
              </motion.section>
            ) : null}

            <div className="orders-grid-head">
              <h3>All Orders</h3>
              <span>{filteredOrders.length} record(s)</span>
            </div>

            <motion.div
              className="orders-list"
              variants={orderListVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
            >
              {filteredOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id

              return (
                <motion.article
                  className={`order-card ${isExpanded ? 'expanded' : ''}`}
                  key={order.id}
                    variants={orderCardVariants}
                >
                  <div className="order-head">
                    <div>
                      <strong>Order #{order.id.slice(-6).toUpperCase()}</strong>
                      <p className="order-date">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <span>{order.paymentMethod}</span>
                  </div>
                  <div className="order-status-row">
                    <span className="order-status delivered">Delivered</span>
                    <span className="order-status soft">Maison Care Included</span>
                    <span className="order-status soft">{order.items.reduce((sum, item) => sum + item.qty, 0)} items</span>
                  </div>
                  <p className="order-meta">
                    {order.customerName} · {order.email}
                  </p>
                  <p className="order-meta">{order.address}</p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.ul
                      key={isExpanded ? `${order.id}-full` : `${order.id}-preview`}
                      className="order-items"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                    >
                      {(isExpanded ? order.items : order.items.slice(0, 2)).map((item) => (
                        <li key={`${order.id}-${item.id}`}>
                          <span>{item.name} x{item.qty}</span>
                          <span>${(item.price * item.qty).toFixed(2)}</span>
                        </li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>

                  {order.items.length > 2 && !isExpanded ? (
                    <p className="order-items-more">+{order.items.length - 2} more item(s)</p>
                  ) : null}

                  {order.items.length > 2 ? (
                    <div className="order-toggle-row">
                      <button
                        type="button"
                        className="btn btn-outline mini order-toggle-btn"
                        onClick={() => setExpandedOrderId((prev) => (prev === order.id ? null : order.id))}
                      >
                        <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                        <motion.span
                          className="order-toggle-icon"
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                        >
                          ▾
                        </motion.span>
                      </button>
                    </div>
                  ) : null}

                  <div className="order-total">
                    <strong>Total</strong>
                    <strong>${order.total.toFixed(2)}</strong>
                  </div>

                  <div className="order-progress">
                    <span className="done">Placed</span>
                    <span className="done">Packed</span>
                    <span className="done">Shipped</span>
                    <span className="done">Delivered</span>
                  </div>
                </motion.article>
              )
              })}
            </motion.div>
          </>
        )}
      </AnimatedContent>

      <AnimatedContent delay={0.14}>
        <footer className="orders-footer-luxe">
          <h4>Need help with an order?</h4>
          <p>Our Maison care experience covers delivery support, product guidance, and gifting assistance.</p>
          <div className="orders-footer-chips">
            <span>Order Support</span>
            <span>Delivery Tracking</span>
            <span>Gifting Help</span>
          </div>
        </footer>
      </AnimatedContent>
    </section>
  )
}
