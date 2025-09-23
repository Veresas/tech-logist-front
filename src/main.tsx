import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeContextProvider, PlatformContextProvider, DropdownContextProvider  } from './context'
import { AuthProvider } from './context/AuthContext/index.tsx'
import { UtilsProvider } from './context/UtilsContext/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeContextProvider>
        <PlatformContextProvider>
          <UtilsProvider>
            <DropdownContextProvider >
              <App />
            </DropdownContextProvider >    
          </UtilsProvider>
        </PlatformContextProvider>
      </ThemeContextProvider>
    </AuthProvider>
  </StrictMode>,
)
