import { createRouter } from '@tanstack/react-router'

import { activityRoute } from './routes/activity-route'
import { indexRoute } from './routes/index-route'
import { inventoryRoute } from './routes/inventory-route'
import { inventoryUnitRoute } from './routes/inventory-unit-route'
import { rootRoute } from './routes/root-route'

const routeTree = rootRoute.addChildren([
  indexRoute,
  inventoryRoute,
  inventoryUnitRoute,
  activityRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
