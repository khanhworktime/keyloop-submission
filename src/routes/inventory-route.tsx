import { useCallback } from 'react'
import { createRoute } from '@tanstack/react-router'

import { InventoryPage } from '../features/inventory/components/inventory-page'
import {
  validateInventorySearch,
} from '../features/inventory/inventory-filter-state'
import { rootRoute } from './root-route'

export const inventoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/inventory',
  validateSearch: validateInventorySearch,
  component: function InventoryRouteComponent() {
    const search = inventoryRoute.useSearch()
    const navigate = inventoryRoute.useNavigate()
    const handleSearchChange = useCallback(
      (nextSearch: typeof search, replace = false): void => {
        void navigate({ search: nextSearch, replace })
      },
      [navigate],
    )

    return (
      <InventoryPage
        search={search}
        onSearchChange={handleSearchChange}
      />
    )
  },
})
