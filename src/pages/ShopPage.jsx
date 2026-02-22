import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AnimatedContent from '../components/AnimatedContent'
import BlurText from '../components/BlurText'
import ChromaGrid from '../components/ChromaGrid'
import PillNav from '../components/PillNav'
import ProductSkeletonGrid from '../components/ProductSkeletonGrid'
import { topCategories } from '../data'

export default function ShopPage({ products, isProductsLoading, productsError, onAddToCart }) {
  const ITEMS_PER_PAGE = 4
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category')
  const initialSort = searchParams.get('sort')
  const initialQuery = searchParams.get('q') ?? ''
  const initialMax = Number(searchParams.get('max'))
  const initialPage = Number(searchParams.get('page'))

  const [activeCategory, setActiveCategory] = useState(
    topCategories.includes(initialCategory) ? initialCategory : topCategories[0],
  )
  const [query, setQuery] = useState(initialQuery)
  const [sortBy, setSortBy] = useState(
    ['featured', 'price-asc', 'price-desc', 'name-asc'].includes(initialSort) ? initialSort : 'featured',
  )
  const [maxPrice, setMaxPrice] = useState(Number.isNaN(initialMax) ? 120 : Math.min(150, Math.max(70, initialMax)))
  const [currentPage, setCurrentPage] = useState(Number.isNaN(initialPage) ? 1 : Math.max(1, initialPage))
  const [toast, setToast] = useState({ text: '', type: 'success' })
  const [isGridLoading, setIsGridLoading] = useState(false)
  const didMountRef = useRef(false)
  const toastTimerRef = useRef(null)
  const gridTimerRef = useRef(null)
  const hasGridMountedRef = useRef(false)
  const navigate = useNavigate()

  const filteredProducts = useMemo(() => {
    const base = products.filter((product) => product.category === activeCategory)

    const searched = base.filter((product) => product.name.toLowerCase().includes(query.toLowerCase().trim()))
    const priced = searched.filter((product) => product.price <= maxPrice)

    if (sortBy === 'price-asc') {
      return [...priced].sort((a, b) => a.price - b.price)
    }

    if (sortBy === 'price-desc') {
      return [...priced].sort((a, b) => b.price - a.price)
    }

    if (sortBy === 'name-asc') {
      return [...priced].sort((a, b) => a.name.localeCompare(b.name))
    }

    return priced
  }, [activeCategory, maxPrice, products, query, sortBy])

  const categoryProducts = useMemo(
    () => products.filter((product) => product.category === activeCategory),
    [activeCategory, products],
  )

  const featuredPicks = useMemo(() => categoryProducts.slice(0, 3), [categoryProducts])

  const categoryAverage = useMemo(() => {
    if (!categoryProducts.length) {
      return 0
    }
    return Math.round(categoryProducts.reduce((sum, item) => sum + item.price, 0) / categoryProducts.length)
  }, [categoryProducts])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage])

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }
    setCurrentPage(1)
  }, [activeCategory, query, sortBy, maxPrice])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    const nextParams = new URLSearchParams()
    nextParams.set('category', activeCategory)
    if (query.trim()) {
      nextParams.set('q', query.trim())
    }
    if (sortBy !== 'featured') {
      nextParams.set('sort', sortBy)
    }
    nextParams.set('max', String(maxPrice))
    nextParams.set('page', String(currentPage))

    const next = nextParams.toString()
    const current = searchParams.toString()
    if (next !== current) {
      setSearchParams(nextParams, { replace: true })
    }
  }, [activeCategory, currentPage, maxPrice, query, searchParams, setSearchParams, sortBy])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current)
      }
      if (gridTimerRef.current) {
        clearTimeout(gridTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!hasGridMountedRef.current) {
      hasGridMountedRef.current = true
      return
    }

    setIsGridLoading(true)
    if (gridTimerRef.current) {
      clearTimeout(gridTimerRef.current)
    }

    gridTimerRef.current = setTimeout(() => {
      setIsGridLoading(false)
    }, 260)
  }, [activeCategory, currentPage, maxPrice, query, sortBy])

  const showToast = (text, type = 'success') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
    }
    setToast({ text, type })
    toastTimerRef.current = setTimeout(() => {
      setToast({ text: '', type: 'success' })
    }, 1800)
  }

  const shareUrl = useMemo(() => {
    const params = new URLSearchParams()
    params.set('category', activeCategory)
    if (query.trim()) {
      params.set('q', query.trim())
    }
    if (sortBy !== 'featured') {
      params.set('sort', sortBy)
    }
    params.set('max', String(maxPrice))
    params.set('page', String(currentPage))
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`
  }, [activeCategory, currentPage, maxPrice, query, sortBy])

  const handleCopyFilterLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      showToast('Filter link copied successfully.', 'success')
    } catch {
      showToast('Failed to copy link. Please try again.', 'error')
    }
  }

  const handleResetFilters = () => {
    setActiveCategory(topCategories[0])
    setQuery('')
    setSortBy('featured')
    setMaxPrice(120)
    setCurrentPage(1)
    showToast('Filters reset successfully.', 'success')
  }

  return (
    <section className="page-section">
      <AnimatedContent>
        <div className="shop-page-head">
          <BlurText text="Shop" className="page-title" />
          <p className="page-sub">Discover Guerlain-inspired collections with practical ecommerce filters and quick product browsing.</p>
        </div>
      </AnimatedContent>
      <AnimatedContent delay={0.1}>
        <div className="shop-main-layout">
          <aside className="shop-filter-panel">
            <div className="shop-panel-head">
              <h3>Filters</h3>
              <span>{filteredProducts.length} found</span>
            </div>

            <PillNav items={topCategories} active={activeCategory} onSelect={setActiveCategory} />

            <div className="shop-controls">
              <label>
                Search
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products..."
                />
              </label>

              <label>
                Sort
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                </select>
              </label>

              <label>
                Max Price (${maxPrice})
                <input
                  type="range"
                  min="70"
                  max="150"
                  step="1"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                />
              </label>
            </div>

            <div className="shop-side-stats">
              <span>Category: {activeCategory}</span>
              <span>Products: {categoryProducts.length}</span>
              <span>Avg. Price: ${categoryAverage}</span>
            </div>

            <div className="shop-share-row">
              <button type="button" className="btn btn-outline mini" onClick={handleCopyFilterLink}>
                Copy Filter Link
              </button>
              <button type="button" className="btn btn-outline mini" onClick={handleResetFilters}>
                Reset Filters
              </button>
            </div>
          </aside>

          <div className="shop-catalog-panel">
            <motion.div
              className="shop-luxe-banner compact"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div>
                <p className="shop-luxe-eyebrow">Collection Focus</p>
                <h3>{activeCategory} Picks</h3>
                <p>Curated selections for a smoother shopping journey.</p>
              </div>
              <div className="shop-luxe-stats">
                <span>{categoryProducts.length} products</span>
                <span>Avg. ${categoryAverage}</span>
              </div>
            </motion.div>

            <div className="shop-featured-strip">
              {featuredPicks.map((item, index) => (
                <motion.article
                  key={item.id}
                  className="shop-featured-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: index * 0.06, ease: 'easeOut' }}
                  whileHover={{ y: -4 }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="shop-featured-image" style={{ backgroundImage: `url(${item.image})` }} />
                  <div className="shop-featured-info">
                    <small>{item.category}</small>
                    <h4>{item.name}</h4>
                    <p>${item.price}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            <p className="shop-result-count">Showing {paginatedProducts.length} of {filteredProducts.length} products</p>

            <AnimatePresence mode="wait">
              {toast.text ? (
                <motion.div
                  key={toast.text}
                  className={`shop-toast ${toast.type}`}
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {toast.text}
                </motion.div>
              ) : null}
            </AnimatePresence>

            {productsError ? <p className="page-sub">{productsError}</p> : null}
            <div className="shop-grid-wrap">
              {isProductsLoading || isGridLoading ? (
                <ProductSkeletonGrid count={4} />
              ) : filteredProducts.length === 0 ? (
                <div className="shop-empty-state">
                  <h4>No products match your current filters.</h4>
                  <p>Try resetting filters to return to Maison selections curated for you.</p>
                  <button type="button" className="btn btn-primary" onClick={handleResetFilters}>
                    Reset Filters
                  </button>
                </div>
              ) : (
                <ChromaGrid
                  items={paginatedProducts}
                  showActions
                  onAdd={onAddToCart}
                  onOpen={(id) => navigate(`/product/${id}`)}
                />
              )}
            </div>

            <div className="pagination-wrap">
              <button
                type="button"
                className="btn btn-outline mini"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                Prev
              </button>

              <div className="page-numbers">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1
                  return (
                    <button
                      type="button"
                      key={page}
                      className={`page-btn ${page === currentPage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                className="btn btn-outline mini"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </AnimatedContent>

      <AnimatedContent delay={0.14}>
        <footer className="shop-footer-luxe">
          <div className="shop-footer-head">
            <div>
              <p className="shop-footer-kicker">MAISON SHOPPING</p>
              <h3>Continue Your Guerlain Beauty Journey</h3>
            </div>
            <motion.div
              className="shop-footer-orb"
              animate={{ y: [0, -7, 0], opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="shop-footer-grid">
            <article>
              <h4>Customer Care</h4>
              <span>Shipping Information</span>
              <span>Returns & Exchanges</span>
              <span>Order Assistance</span>
            </article>
            <article>
              <h4>Maison Services</h4>
              <span>Gift-ready Packaging</span>
              <span>Beauty Consultation</span>
              <span>Sample Selection</span>
            </article>
            <article>
              <h4>Need Help?</h4>
              <span>Contact Us</span>
              <span>Live Support</span>
              <span>FAQ</span>
            </article>
          </div>
        </footer>
      </AnimatedContent>
    </section>
  )
}
