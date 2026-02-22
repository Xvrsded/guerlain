import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AnimatedContent from '../components/AnimatedContent'
import BlurText from '../components/BlurText'
import ProductSkeletonGrid from '../components/ProductSkeletonGrid'
import ScrollReveal from '../components/ScrollReveal'

export default function ProductPage({ products, isProductsLoading, onAddToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = useMemo(() => products.find((item) => String(item.id) === String(id)), [id, products])
  const relatedProducts = useMemo(() => {
    if (!product) {
      return []
    }
    return products
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 3)
  }, [product, products])

  const productHighlights = [
    'Maison-inspired premium curation',
    'Elegant finish with comfort-first formula',
    'Perfect for gifting and signature looks',
  ]

  const serviceAssurances = [
    'Complimentary shipping on all orders',
    'Choice of two samples at checkout',
    'Luxury-ready presentation and support',
  ]

  if (isProductsLoading) {
    return (
      <section className="page-section">
        <AnimatedContent>
          <BlurText text="Loading Product" className="page-title" />
          <ProductSkeletonGrid count={1} />
        </AnimatedContent>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="page-section">
        <AnimatedContent>
          <h2 className="section-title">Product not found</h2>
          <Link to="/shop" className="text-link">Back to shop</Link>
        </AnimatedContent>
      </section>
    )
  }

  return (
    <section className="page-section">
      <div className="detail-layout">
        <AnimatedContent className="detail-media">
          <div className="detail-image" style={{ backgroundImage: `url(${product.image})` }} />
        </AnimatedContent>

        <AnimatedContent className="detail-content" delay={0.1}>
          <p className="badge">{product.category}</p>
          <BlurText text={product.name} className="page-title" />
          <p className="detail-price">${product.price}</p>
          <p className="detail-meta">SKU: {product.sku}</p>
          <p className="detail-stock">Stock available: {product.stock}</p>
          <ScrollReveal
            className="page-sub"
            text={product.description}
          />

          <div className="detail-highlight-chips">
            {productHighlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onAddToCart(product)}
              disabled={product.stock <= 0}
            >
              {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/shop')}>Back to Shop</button>
          </div>
        </AnimatedContent>
      </div>

      <AnimatedContent delay={0.12}>
        <section className="detail-subsection">
          <h3 className="section-title">Related in {product.category}</h3>
          <div className="detail-related-grid">
            {relatedProducts.map((item) => (
              <article key={item.id} className="detail-related-card" onClick={() => navigate(`/product/${item.id}`)}>
                <div className="detail-related-image" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="detail-related-content">
                  <small>{item.category}</small>
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </AnimatedContent>

      <AnimatedContent delay={0.16}>
        <section className="detail-subsection">
          <h3 className="section-title">Maison Assurances</h3>
          <div className="detail-assurance-row">
            {serviceAssurances.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
      </AnimatedContent>
    </section>
  )
}
