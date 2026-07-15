import { Outlet, RouterProvider, createMemoryHistory, createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { OverviewView } from '../../../domain/inventory-types'
import { OverviewPriorityQueue } from './overview-priority-queue'
import { OverviewSummary } from './overview-summary'

const overview: OverviewView = {
  agingInventory: 1,
  availableInventory: 8,
  totalInventory: 12,
  priorityUnits: [
    {
      daysInStock: 128,
      isAging: true,
      master: { id: 'VM-014', make: 'Aster', model: 'A7', variant: 'Touring', type: 'Car' },
      unit: {
        id: 'IU-2048',
        vehicleMasterId: 'VM-014',
        vin: 'WDD2231861A002048',
        stockNumber: 'STK-2048',
        arrivalDate: '2026-03-09T10:00:00.000Z',
        inventoryStatus: 'available',
        latestAction: null,
      },
    },
  ],
}

const renderWithRoutes = (component: React.JSX.Element): void => {
  const root = createRootRoute({ component: Outlet })
  const index = createRoute({ getParentRoute: () => root, path: '/', component: () => component })
  const inventory = createRoute({ getParentRoute: () => root, path: '/inventory', component: () => null })
  const unit = createRoute({ getParentRoute: () => root, path: '/inventory/$unitId', component: () => null })
  const router = createRouter({
    routeTree: root.addChildren([index, inventory, unit]),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  render(<RouterProvider router={router} />)
}

describe('overview components', () => {
  it('makes lifecycle-eligible aging the primary inventory action', async () => {
    renderWithRoutes(<OverviewSummary overview={overview} />)

    expect(await screen.findByText('1 unit')).toBeInTheDocument()
    expect(screen.getByText('Available over 90 days')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View aging inventory →' })).toHaveAttribute(
      'href',
      '/inventory?age=aging',
    )
  })

  it('preserves Inventory Unit identity in priority queue links', async () => {
    renderWithRoutes(<OverviewPriorityQueue items={overview.priorityUnits} />)

    expect(await screen.findByText('Aster A7 Touring')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /review STK-2048/i })).toHaveAttribute(
      'href',
      '/inventory/IU-2048',
    )
    expect(screen.queryByText(/zone|slot|location/i)).not.toBeInTheDocument()
  })
})
