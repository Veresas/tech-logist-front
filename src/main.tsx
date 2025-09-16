import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeContextProvider, PlatformContextProvider } from './context'
import { AuthProvider } from './context/AuthContext/index.tsx'
import { UtilsProvider } from './context/UtilsContext/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeContextProvider>
        <PlatformContextProvider>
          <UtilsProvider>
            <App />
          </UtilsProvider>
        </PlatformContextProvider>
      </ThemeContextProvider>
    </AuthProvider>
  </StrictMode>,
)
