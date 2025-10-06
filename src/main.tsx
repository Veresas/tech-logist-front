import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeContextProvider, PlatformContextProvider, DropdownContextProvider  } from './context'
import { AuthProvider } from './context/AuthContext/index.tsx'
import { UtilsProvider } from './context/UtilsContext/index.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        const status = (error as { response?: { status?: number } })?.response?.status
        if (status === 401) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: true,
      staleTime: 30000,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </StrictMode>,
)
