import { Outlet, RouterProvider, createMemoryHistory, createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { UnitListItem } from '../../../domain/inventory-types'
import { InventoryMobileCards } from './inventory-mobile-cards'

const item: UnitListItem = {
  daysInStock: 96,
  isAging: false,
  master: { id: 'VM-011', make: 'Aster', model: 'A5', variant: 'Sport', type: 'Car' },
  unit: {
    id: 'IU-1886',
    vehicleMasterId: 'VM-011',
    vin: 'AST9921A5S',
    stockNumber: 'STK-1886',
    arrivalDate: '2026-04-10T14:00:00.000Z',
    inventoryStatus: 'reserved',
    latestAction: null,
  },
}

describe('inventory mobile cards', () => {
  it('exposes the same unit identity, age, status, action, and detail route', async () => {
    const root = createRootRoute({ component: Outlet })
    const index = createRoute({
      getParentRoute: () => root,
      path: '/',
      component: () => <InventoryMobileCards items={[item]} />,
    })
    const unit = createRoute({
      getParentRoute: () => root,
      path: '/inventory/$unitId',
      component: () => null,
    })
    const router = createRouter({
      routeTree: root.addChildren([index, unit]),
      history: createMemoryHistory({ initialEntries: ['/'] }),
    })
    render(<RouterProvider router={router} />)

    expect(await screen.findByText('Aster A5 Sport')).toBeInTheDocument()
    expect(screen.getByText('96 days')).toBeInTheDocument()
    expect(screen.queryByText(/Aging/)).not.toBeInTheDocument()
    expect(screen.getByText('Inventory status')).toBeInTheDocument()
    expect(screen.getByText('Reserved')).toBeInTheDocument()
    expect(screen.getByText('Not recorded')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Review STK-1886' })).toHaveAttribute(
      'href',
      '/inventory/IU-1886',
    )
  })
})
