import React from 'react'
import { cn } from '@/utils/cn'

export const Input = React.forwardRef(({ className, icon: Icon, ...props }, ref) => {
  return (
    <div className="relative group">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors">
          <Icon size={20} />
        </div>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full bg-white border border-slate-200 rounded-xl py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-100 transition-all shadow-sm',
          Icon ? 'pl-12 pr-4' : 'px-4',
          className
        )}
        {...props}
      />
    </div>
  )
})

Input.displayName = 'Input'
