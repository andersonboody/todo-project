import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App/App'
import { TimerProvider } from './components/AppContext/AppContext'

createRoot(document.getElementById('root')).render(
  <TimerProvider>
    <App />
  </TimerProvider>
)
