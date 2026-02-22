import { AnimatePresence, motion } from 'framer-motion'

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.98 },
}

export default function ChromaGrid({ items, showActions = false, onOpen, onAdd }) {
  return (
    <motion.div className="chroma-grid" variants={gridVariants} initial="hidden" animate="show" layout>
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.article
            key={item.id}
            layout
            className="product-card product-image-card"
            style={{ '--product-image': `url(${item.image})` }}
            variants={cardVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeOut' }}
            whileHover={{ y: -8 }}
          >
            <div className="product-image-layer" />
            <div className="product-overlay-content">
              <small>{item.category}</small>
              <h4>{item.name}</h4>
              <p>${item.price}</p>
            </div>
            {showActions ? (
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
            ) : null}
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
