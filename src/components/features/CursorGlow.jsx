import React, { useEffect, useState } from 'react'

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(!media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const handler = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-40 transition-transform duration-150"
        style={{
          left: pos.x - 160,
          top: pos.y - 160,
          background:
            'radial-gradient(circle, rgba(14,165,233,0.35) 0%, rgba(245,158,11,0.25) 30%, rgba(15,23,42,0) 60%)',
        }}
      />
    </div>
  )
}

export default CursorGlow
