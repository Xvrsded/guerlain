import { useEffect, useState } from 'react'

export default function Counter({ value, label, suffix = '' }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1200
    const frameMs = 16
    const totalFrames = Math.round(duration / frameMs)
    const increment = value / totalFrames

    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, frameMs)

    return () => clearInterval(timer)
  }, [value])

  const formatted = Number.isInteger(value) ? Math.floor(count).toLocaleString() : count.toFixed(1)

  return (
    <div className="counter-card">
      <strong>{formatted}{suffix}</strong>
      <span>{label}</span>
    </div>
  )
}
