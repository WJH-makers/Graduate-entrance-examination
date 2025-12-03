import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { QueryClientProvider } from '@tanstack/react-query'
import 'katex/dist/katex.min.css'
import './index.css'
import App from './App.jsx'
import { initUXSignals } from './utils/uxSignals'
import { initErrorLog } from './utils/errorLog'
import { queryClient } from './lib/queryClient'

initUXSignals()
initErrorLog()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Analytics />
    </QueryClientProvider>
  </StrictMode>
)
