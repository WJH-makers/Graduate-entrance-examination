import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'katex/dist/katex.min.css'
import '@/index.css'
import App from '@/App.jsx'
import { initUXSignals } from '@/utils/uxSignals'
import { initErrorLog } from '@/utils/errorLog'
import AppProviders from '@/providers/AppProviders.jsx'

initUXSignals()
initErrorLog()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
)
