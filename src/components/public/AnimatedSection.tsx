import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right'
}

export default function AnimatedSection({ children, className, direction = 'up' }: Props) {
  const variants = {
    up: { y: 60 },
    left: { x: -60 },
    right: { x: 60 }
  }
  return (
    <motion.div
      initial={{ opacity: 0, ...variants[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}