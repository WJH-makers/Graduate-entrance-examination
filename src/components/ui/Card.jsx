import React, { useRef, useState } from 'react'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars

export const Card = ({ className, children, hover = false, ...props }) => {
  const divRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!divRef.current || !hover) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const content = (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'bg-white rounded-2xl p-6 relative overflow-hidden border border-slate-200 shadow-sm group text-slate-900',
        hover &&
          'glass-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10',
        className
      )}
      {...props}
    >
      {/* Spotlight Effect */}
      {hover && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )

  if (hover) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}
