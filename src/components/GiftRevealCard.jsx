import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

export default function GiftRevealCard({ title, subtitle, frames = [] }) {
  const [isActive, setIsActive] = useState(false)
  const [frameIndex, setFrameIndex] = useState(0)

  const normalizedFrames = useMemo(() => {
    if (!frames.length) {
      return [
        'linear-gradient(125deg, rgba(97, 33, 15, 0.72), rgba(253, 240, 213, 0.94))',
      ]
    }
    return frames
  }, [frames])

  useEffect(() => {
    if (!isActive || normalizedFrames.length <= 1) {
      setFrameIndex(0)
      return
    }

    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % normalizedFrames.length)
    }, 140)

    return () => clearInterval(timer)
  }, [isActive, normalizedFrames])

  return (
    <motion.article
      className={`gift-reveal-card ${isActive ? 'active' : ''}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      tabIndex={0}
      animate={{ scale: isActive ? 1.04 : 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      <div
        className="gift-reveal-media"
        style={{
          background: normalizedFrames[frameIndex],
          filter: isActive ? 'blur(0px)' : 'blur(8px)',
        }}
      />
      <div className="gift-reveal-info">
        <p>{title}</p>
        <small>{subtitle}</small>
      </div>
    </motion.article>
  )
}
