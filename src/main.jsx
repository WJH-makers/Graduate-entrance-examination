import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initUXSignals } from './utils/uxSignals'
import { initErrorLog } from './utils/errorLog'

initUXSignals()
initErrorLog()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
