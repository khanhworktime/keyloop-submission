import { createRoute } from '@tanstack/react-router'

import { InventoryDashboardShell } from '../components/inventory-dashboard-shell'
import { rootRoute } from './root-route'

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: InventoryDashboardShell,
})
