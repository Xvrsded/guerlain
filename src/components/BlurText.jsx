import { motion } from 'framer-motion'

export default function BlurText({ text, className = '' }) {
  const words = text.split(' ')

  return (
    <h2 className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="blur-word"
          initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </h2>
  )
}
