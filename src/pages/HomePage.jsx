import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AnimatedContent from '../components/AnimatedContent'
import BlurText from '../components/BlurText'
import CuratedProductSlider from '../components/CuratedProductSlider'
import LogoLoop from '../components/LogoLoop'
import PillNav from '../components/PillNav'
import ProductSkeletonGrid from '../components/ProductSkeletonGrid'
import ScrollReveal from '../components/ScrollReveal'
import giftFrame1 from '../assets/gambar/MakeUp/TheOrnamentsGold.png'
import giftFrame2 from '../assets/gambar/MakeUp/TheOrnamentsSilver.png'
import giftFrame3 from '../assets/gambar/MakeUp/ThePatterns.png'
import discover1 from '../assets/gambar/Discover/Discover1.jpeg'
import discover2 from '../assets/gambar/Discover/Discover2.jpeg'
import discover3 from '../assets/gambar/Discover/Dicover3.jpeg'
import { topCategories } from '../data'

export default function HomePage({ products, isProductsLoading, productsError, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState(topCategories[0])
  const [isPortraitActive, setIsPortraitActive] = useState(false)
  const [portraitIndex, setPortraitIndex] = useState(0)
  const navigate = useNavigate()

  const portraitFrames = [giftFrame1, giftFrame2, giftFrame3]

  useEffect(() => {
    if (!isPortraitActive) {
      setPortraitIndex(0)
      return
    }

    const timer = setInterval(() => {
      setPortraitIndex((prev) => (prev + 1) % portraitFrames.length)
    }, 520)

    return () => clearInterval(timer)
  }, [isPortraitActive, portraitFrames.length])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.category === activeCategory)
  }, [activeCategory, products])

  const artOfBeautyItems = useMemo(
    () => [
      {
        title: 'Personalization',
        body: 'Create your signature beauty gift with collectible Rouge G cases and refined finishing touches.',
        image: discover1,
      },
      {
        title: 'Art of Gifting',
        body: 'Celebrate every occasion with couture-inspired curation designed to feel timeless and personal.',
        image: discover2,
      },
      {
        title: 'Gift Finder',
        body: 'Discover curated recommendations for luxurious picks, from iconic lipstick to treatment skincare.',
        image: discover3,
      },
    ],
    [discover1, discover2, discover3],
  )

  const maisonServices = [
    'Complimentary shipping',
    'Choice of two samples',
    'Loyalty-inspired member perks',
    'Luxury gift presentation',
  ]

  const homeBestsellers = useMemo(() => products.slice(0, 4), [products])

  const beautyRoutine = [
    {
      step: '01',
      title: 'Prep & Cleanse',
      text: 'Begin with a gentle cleanse to refresh skin and prepare it for Maison treatment formulas.',
    },
    {
      step: '02',
      title: 'Treat & Nourish',
      text: 'Apply your targeted serum and lotion ritual for glow, comfort, and visible refinement.',
    },
    {
      step: '03',
      title: 'Define Signature Look',
      text: 'Layer iconic Rouge G and eye essentials for a polished couture makeup finish.',
    },
    {
      step: '04',
      title: 'Set The Mood',
      text: 'Complete the routine with gifting-ready presentation and your preferred Maison fragrance touch.',
    },
  ]

  const faqs = [
    {
      q: 'Do you provide luxury gift-ready packaging?',
      a: 'Yes, every order is curated with premium presentation inspired by the Art of Gifting experience.',
    },
    {
      q: 'Can I discover products by category easily?',
      a: 'You can browse Makeup and Skincare with filters, curated picks, and direct links to product detail pages.',
    },
    {
      q: 'Are samples included with orders?',
      a: 'The storefront experience highlights Maison-style sample selection and elevated checkout support.',
    },
    {
      q: 'Is this storefront mobile friendly?',
      a: 'Yes, all sections are responsive so users can browse, filter, and checkout smoothly on mobile.',
    },
  ]

  const maisonJournal = useMemo(
    () => [
      {
        title: 'Inside Rouge G Craftsmanship',
        excerpt: 'A closer look at couture case artistry and the details behind Guerlain signature lipstick design.',
        image: products[0]?.image ?? giftFrame1,
      },
      {
        title: 'Skincare Ritual for Radiance',
        excerpt: 'How to layer treatment steps from cleanse to nourishment for a refined, luminous finish.',
        image: products[8]?.image ?? discover2,
      },
      {
        title: 'The Art of Curated Gifting',
        excerpt: 'Elegant gifting moments inspired by Maison storytelling, personalization, and premium presentation.',
        image: discover3,
      },
    ],
    [products, giftFrame1, discover2, discover3],
  )

  const conciergeServices = [
    'Shade matching guidance',
    'Skincare routine consultation',
    'Gift recommendation support',
    'Order and delivery assistance',
    'After-purchase care tips',
    'Seasonal collection alerts',
  ]

  return (
    <>
      <header className="hero">
        <div className="hero-decor" aria-hidden="true">
          <motion.span
            className="decor-orb orb-a"
            animate={{ y: [0, -16, 0], x: [0, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="decor-orb orb-b"
            animate={{ y: [0, 14, 0], x: [0, -12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="decor-orb orb-c"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="hero-shimmer-line line-a"
            animate={{ x: ['-10%', '110%'], opacity: [0, 0.8, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="hero-shimmer-line line-b"
            animate={{ x: ['-20%', '120%'], opacity: [0, 0.65, 0] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
        </div>
        <div className="hero-grid">
          <AnimatedContent className="hero-inner">
            <p className="badge">WELCOME TO GUERLAIN.COM</p>
            <BlurText text="A Selection Made for You, Inspired by Maison Guerlain" className="hero-title" />
            <ScrollReveal
              className="hero-sub"
              text="Explore iconic collections across Makeup and Skincare with curated storytelling, elevated visuals, and seamless luxury shopping moments."
            />
            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => navigate('/shop')}>Shop Guerlain</button>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/shop')}>Explore The Maison</button>
            </div>
            <div className="hero-luxe-notes">
              <span>Makeup</span>
              <span>Skincare</span>
              <span>The Art of Gifting</span>
            </div>
          </AnimatedContent>

          <AnimatedContent className="hero-visual" delay={0.15}>
            <motion.div
              className="visual-main-card"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onMouseEnter={() => setIsPortraitActive(true)}
              onMouseLeave={() => setIsPortraitActive(false)}
              onFocus={() => setIsPortraitActive(true)}
              onBlur={() => setIsPortraitActive(false)}
              tabIndex={0}
              whileHover={{ scale: 1.03, y: -3 }}
            >
              <div className="visual-portrait-wrap">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={portraitIndex}
                    src={portraitFrames[portraitIndex]}
                    alt="Guerlain lipstick gift preview"
                    className={`visual-portrait ${isPortraitActive ? 'active' : ''}`}
                    initial={{ opacity: 0.3, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1.04 }}
                    exit={{ opacity: 0.2, scale: 1.01 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                  />
                </AnimatePresence>
                <div className="visual-portrait-overlay" />
              </div>
              <div className="visual-portrait-meta">
                <p>ROUGE G · MAISON ICON</p>
                <h4>Hover to reveal the crystal-clear sequence with premium card highlight.</h4>
                <div className="visual-chips">
                  <span>Haute Gift</span>
                  <span>Rouge G</span>
                  <span>Collector Edition</span>
                </div>
              </div>
            </motion.div>

            <motion.article
              className="visual-floating one"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.45, delay: 0.15 },
                x: { duration: 0.45, delay: 0.15 },
                y: {
                  duration: 6.2,
                  delay: 0.9,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: [0.42, 0, 0.58, 1],
                },
              }}
              whileHover={{ y: -12, scale: 1.02, boxShadow: '0 20px 36px rgba(97, 33, 15, 0.2)' }}
            >
              <strong>Best Seller</strong>
              <small>Nude-rose couture shade selected most this week.</small>
            </motion.article>

            <motion.article
              className="visual-floating two"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.45, delay: 0.25 },
                y: {
                  duration: 6.8,
                  delay: 1.2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: [0.42, 0, 0.58, 1],
                },
              }}
              whileHover={{ y: -10, scale: 1.02, boxShadow: '0 20px 36px rgba(97, 33, 15, 0.2)' }}
            >
              <strong>4.9/5</strong>
              <small>Clients love the lightweight, refined lipstick comfort.</small>
            </motion.article>
          </AnimatedContent>
        </div>
      </header>

      <section className="section">
        <AnimatedContent className="campaign-wrap">
          <div className="campaign-text">
            <h3 className="section-title">A Selection Made for You</h3>
            <p className="page-sub">Discover current Maison highlights inspired by the official Guerlain shopping journey.</p>
          </div>
          <div className="campaign-cards">
            <motion.article
              className="campaign-card"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <h4>Rouge G Velvet</h4>
              <p>Iconic couture lipstick with high-impact finish and elegant comfort.</p>
            </motion.article>
            <motion.article
              className="campaign-card"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <h4>Abeille Royale Ritual</h4>
              <p>Targeted skincare essentials designed to visibly refine and illuminate.</p>
            </motion.article>
            <motion.article
              className="campaign-card"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <h4>Limited Maison Editions</h4>
              <p>Seasonal collector expressions crafted for gifting and signature beauty moments.</p>
            </motion.article>
          </div>
        </AnimatedContent>
      </section>

      <section className="section">
        <AnimatedContent>
          <div className="section-head">
            <h3 className="section-title">The Art of Beauty</h3>
          </div>
          <LogoLoop items={products.slice(0, 8)} />
        </AnimatedContent>
      </section>

      <section className="section">
        <AnimatedContent>
          <h3 className="section-title">An Experience Signed Guerlain</h3>
          <div className="maison-service-grid">
            {maisonServices.map((service) => (
              <article key={service} className="maison-service-card">
                <strong>{service}</strong>
              </article>
            ))}
          </div>
        </AnimatedContent>
      </section>

      <section className="section">
        <AnimatedContent>
          <div className="section-head">
            <h3 className="section-title">Our Curated Products</h3>
            <PillNav items={topCategories} active={activeCategory} onSelect={setActiveCategory} />
          </div>
          {productsError ? <p className="page-sub">{productsError}</p> : null}
          {isProductsLoading ? (
            <ProductSkeletonGrid count={4} />
          ) : (
            <CuratedProductSlider
              items={filteredProducts}
              onAdd={onAddToCart}
              onOpen={(id) => navigate(`/product/${id}`)}
            />
          )}
        </AnimatedContent>
      </section>

      <section className="section">
        <AnimatedContent>
          <h3 className="section-title">The Art of Beauty Services</h3>
          <div className="art-beauty-grid">
            {artOfBeautyItems.map((item, index) => (
              <motion.article
                key={item.title}
                className="art-beauty-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.28, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
              >
                <div className="art-beauty-image" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="art-beauty-content">
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </AnimatedContent>
      </section>

      <section className="section">
        <AnimatedContent>
          <div className="section-head">
            <h3 className="section-title">Bestsellers This Week</h3>
            <button type="button" className="btn btn-outline mini" onClick={() => navigate('/shop')}>
              View All Products
            </button>
          </div>
          <div className="home-bestseller-grid">
            {homeBestsellers.map((item, index) => (
              <motion.article
                key={item.id}
                className="home-bestseller-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.28, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
              >
                <div className="home-bestseller-image" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="home-bestseller-content">
                  <small>{item.category}</small>
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                  <button type="button" className="btn btn-primary mini" onClick={() => onAddToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </AnimatedContent>
      </section>

      <section className="section">
        <AnimatedContent>
          <h3 className="section-title">Your Maison Beauty Routine</h3>
          <div className="routine-grid">
            {beautyRoutine.map((item) => (
              <article key={item.step} className="routine-card">
                <span>{item.step}</span>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </AnimatedContent>
      </section>

      <section className="section">
        <AnimatedContent>
          <h3 className="section-title">Customer Care & FAQs</h3>
          <div className="faq-grid">
            {faqs.map((item) => (
              <article key={item.q} className="faq-card">
                <h4>{item.q}</h4>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </AnimatedContent>
      </section>

      <section className="section">
        <AnimatedContent>
          <div className="section-head">
            <h3 className="section-title">Maison Journal</h3>
            <button type="button" className="btn btn-outline mini" onClick={() => navigate('/shop')}>
              Explore Stories
            </button>
          </div>
          <div className="journal-grid">
            {maisonJournal.map((item, index) => (
              <motion.article
                key={item.title}
                className="journal-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.28, delay: index * 0.07 }}
              >
                <div className="journal-image" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="journal-content">
                  <h4>{item.title}</h4>
                  <p>{item.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </AnimatedContent>
      </section>

      <section className="section">
        <AnimatedContent>
          <h3 className="section-title">Beauty Concierge</h3>
          <div className="concierge-wrap">
            {conciergeServices.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </AnimatedContent>
      </section>

      <footer className="footer footer-luxe">
        <AnimatedContent>
          <div className="footer-top">
            <div className="footer-brand-block">
              <p className="footer-kicker">LA MAISON GUERLAIN</p>
              <BlurText text="An Elegant Beauty Experience, Signed Guerlain" className="footer-title" />
              <p className="footer-text">
                Inspired by official Guerlain content pillars: curated selections, the art of beauty, and elevated Maison services.
              </p>
            </div>
            <motion.button
              type="button"
              className="btn btn-primary"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/shop')}
            >
              Explore Collection
            </motion.button>
          </div>

          <div className="footer-grid">
            <article className="footer-col">
              <h4>Shop Categories</h4>
              <a href="/shop?category=Makeup">Makeup</a>
              <a href="/shop?category=Skincare">Skincare</a>
              <a href="/shop">A Selection Made for You</a>
            </article>
            <article className="footer-col">
              <h4>The Art of Beauty</h4>
              <span>Personalization</span>
              <span>Art of Gifting</span>
              <span>Gift Finder</span>
            </article>
            <article className="footer-col">
              <h4>Maison Services</h4>
              <span>Complimentary Shipping</span>
              <span>Choice of 2 Samples</span>
              <span>Loyalty-inspired Benefits</span>
            </article>
            <article className="footer-col">
              <h4>Connect</h4>
              <span>Contact Us</span>
              <span>Newsletter</span>
              <span>United States · US</span>
            </article>
          </div>

          <div className="footer-bottom">
            <small>© 2026 Guerlain Inspired Storefront Experience</small>
            <div className="footer-bottom-links">
              <span>Legal Terms</span>
              <span>Privacy Policy</span>
              <span>Cookie Settings</span>
            </div>
          </div>
        </AnimatedContent>
      </footer>
    </>
  )
}
