import React from 'react'
import { Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'

const OptimizeButton = ({ onClick }) => {
  return (
    <div className="fixed right-4 bottom-24 z-40">
      <Button
        onClick={onClick}
        className="shadow-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-[1.02] transition btn-shine interactive-tilt"
        data-track="optimize-btn"
      >
        <Sparkles size={16} className="mr-2" />
        优化此页
      </Button>
    </div>
  )
}

export default OptimizeButton
