import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import { startMockWorker } from './mocks/start-mock-worker'
import { queryClient } from './query-client'
import { router } from './router'
import './styles.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Application root element is missing.')
}

const renderApplication = (): void => {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  )
}

void startMockWorker()
  .catch((error: unknown) => {
    console.warn('Mock worker could not start.', error)
  })
  .finally(renderApplication)
