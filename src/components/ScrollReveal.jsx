import { motion } from 'framer-motion'

export default function ScrollReveal({ text, className = '' }) {
  const words = text.split(' ')

  return (
    <p className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: index * 0.03, duration: 0.35 }}
          className="reveal-word"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </p>
  )
}
