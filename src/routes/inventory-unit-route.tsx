import { createRoute } from '@tanstack/react-router'

import { rootRoute } from './root-route'
import { InventoryUnitPage } from '../features/inventory-unit/inventory-unit-page'

export const inventoryUnitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/inventory/$unitId',
  component: function InventoryUnitRouteComponent() {
    const { unitId } = inventoryUnitRoute.useParams()
    return <InventoryUnitPage unitId={unitId} />
  },
})
