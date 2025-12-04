import React from 'react'
import { cn } from '@/utils/cn'

export const Tabs = ({ children, defaultValue, className }) => {
  const [activeValue, setValue] = React.useState(defaultValue)
  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { activeValue, setValue }) : child
      )}
    </div>
  )
}

export const TabsList = ({ children, activeValue, setValue }) => (
  <div className="inline-flex bg-white/5 border border-white/10 rounded-xl p-1 text-sm text-gray-300">
    {React.Children.map(children, (child) =>
      React.isValidElement(child) ? React.cloneElement(child, { activeValue, setValue }) : child
    )}
  </div>
)

export const TabsTrigger = ({ children, value, tabValue, setValue, activeValue }) => {
  const target = tabValue ?? value
  const active = target === activeValue
  return (
    <button
      onClick={() => setValue(target)}
      className={cn(
        'px-3 py-1.5 rounded-lg transition-colors',
        active
          ? 'bg-cyan-500/20 text-white border border-cyan-400/40'
          : 'text-gray-400 hover:text-white'
      )}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({ children, value, tabValue, activeValue }) => {
  const target = tabValue ?? value
  if (target !== activeValue) return null
  return <div>{children}</div>
}
