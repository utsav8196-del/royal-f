import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  end: number
  suffix?: string
  duration?: number
}

export default function AnimatedCounter({ end, suffix = '', duration = 2 }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}