import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ToursProvider } from './context/ToursContext.jsx'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToursProvider>
        <AdminAuthProvider>
          <App />
        </AdminAuthProvider>
      </ToursProvider>
    </BrowserRouter>
  </StrictMode>,
)
