import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function CuratedProductSlider({ items, onOpen, onAdd }) {
  const trackRef = useRef(null)

  const scrollByCard = (direction) => {
    const track = trackRef.current
    if (!track) {
      return
    }
    const cardWidth = 320
    track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' })
  }

  return (
    <div className="curated-slider-wrap">
      <div className="curated-slider-head">
        <span className="slider-count">{items.length} products</span>
        <button type="button" className="btn btn-outline mini" onClick={() => scrollByCard(-1)}>Prev</button>
        <button type="button" className="btn btn-outline mini" onClick={() => scrollByCard(1)}>Next</button>
      </div>

      <div className="curated-slider-track" ref={trackRef}>
        {items.map((item) => (
          <motion.article
            key={item.id}
            className="product-card product-image-card slider-card"
            style={{ '--product-image': `url(${item.image})` }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
          >
            <div className="product-image-layer" />
            <div className="product-overlay-content">
              <small>{item.category}</small>
              <h4>{item.name}</h4>
              <p>${item.price}</p>
            </div>
            <div className="card-actions floating-actions">
              <button type="button" className="btn btn-outline mini" onClick={() => onOpen?.(item.id)}>
                Detail
              </button>
              <button
                type="button"
                className="btn btn-primary mini"
                onClick={() => onAdd?.(item)}
                disabled={item.stock <= 0}
              >
                {item.stock <= 0 ? 'Out' : 'Add'}
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
