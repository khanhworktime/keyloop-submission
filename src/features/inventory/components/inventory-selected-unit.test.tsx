import { Outlet, RouterProvider, createMemoryHistory, createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { UnitListItem } from '../../../domain/inventory-types'
import { InventorySelectedUnit } from './inventory-selected-unit'

const reservedItem: UnitListItem = {
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

describe('inventory selected unit', () => {
  it('keeps age visible without an aging signal for reserved stock', async () => {
    const root = createRootRoute({ component: Outlet })
    const index = createRoute({
      getParentRoute: () => root,
      path: '/',
      component: () => <InventorySelectedUnit item={reservedItem} />,
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

    const rail = await screen.findByRole('complementary', { name: 'Aster A5 Sport' })
    expect(within(rail).getByText('Inventory age')).toBeInTheDocument()
    expect(within(rail).getByText('96 days')).toBeInTheDocument()
    expect(within(rail).queryByText(/Aging/)).not.toBeInTheDocument()
    expect(within(rail).getByText('Inventory status')).toBeInTheDocument()
    expect(within(rail).getByText('Reserved')).toBeInTheDocument()
    expect(within(rail).queryByText('Aging stock')).not.toBeInTheDocument()
  })
})
