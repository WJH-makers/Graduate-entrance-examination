import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import { queryClient } from '../lib/queryClient'

/**
 * 汇总应用级 Provider，保持入口简洁、低耦合。
 */
export const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Analytics />
    </QueryClientProvider>
  )
}

export default AppProviders
