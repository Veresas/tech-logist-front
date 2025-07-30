import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeContextProvider } from './context'
import { AuthProvider } from './context/AuthContext/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthProvider>
  </StrictMode>,
)
