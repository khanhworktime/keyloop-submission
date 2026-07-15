import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { InventoryUnitDetail } from '../../domain/inventory-types'
import { InventoryUnitPage } from './inventory-unit-page'

const detail = vi.hoisted((): InventoryUnitDetail => ({
  daysInStock: 128,
  isAging: true,
  master: {
    id: 'VM-014',
    make: 'Aster',
    model: 'A7',
    variant: 'Touring',
    type: 'Passenger car',
  },
  unit: {
    id: 'IU-2048',
    vehicleMasterId: 'VM-014',
    vin: 'WDD2231861A002048',
    stockNumber: 'STK-2048',
    arrivalDate: '2026-03-09T17:00:00.000Z',
    inventoryStatus: 'available',
    zoneSlot: 'North · N-04',
    latestAction: {
      type: 'price-reduction-planned' as const,
      actor: 'Manager',
      recordedAt: '2026-07-15T09:26:00.000Z',
      note: 'ReviewPricingAgainstComparableTouringUnitsBeforeFridayWithoutLosingContext',
    },
  },
  activities: [
    {
      id: 'ACT-1',
      unitId: 'IU-2048',
      eventType: 'manager-action' as const,
      timestamp: '2026-07-15T09:26:00.000Z',
      actor: 'Manager',
      title: 'Price reduction planned',
      detail: 'Action recorded.',
      note: 'Review pricing against comparable units before Friday.',
    },
    {
      id: 'ACT-2',
      unitId: 'IU-2048',
      eventType: 'inventory-arrived' as const,
      timestamp: '2026-03-09T17:00:00.000Z',
      actor: 'Inventory Feed',
      title: 'Inventory unit received',
      detail: 'STK-2048 was added to inventory.',
    },
    {
      id: 'ACT-3',
      unitId: 'IU-2048',
      eventType: 'status-changed' as const,
      timestamp: '2026-03-10T17:00:00.000Z',
      actor: 'Inventory System',
      title: 'Should not render in recent activity',
      detail: 'Outside the two-event detail limit.',
    },
  ],
}))

vi.mock('../inventory/inventory-queries', () => ({
  useInventoryUnitQuery: () => ({
    data: detail,
    error: null,
    isError: false,
    isLoading: false,
    refetch: vi.fn(),
  }),
}))

vi.mock('./inventory-action-drawer', () => ({
  InventoryActionDrawer: ({ stockNumber }: { stockNumber: string }) => (
    <button type="button" aria-label={`Record proposed action for ${stockNumber}`}>
      Record proposed action
    </button>
  ),
}))

vi.mock('./inventory-unit-edit-sheet', () => ({
  InventoryUnitEditSheet: ({ unit }: { unit: { stockNumber: string } }) => (
    <button type="button" aria-label={`Edit Inventory Unit ${unit.stockNumber}`}>Edit</button>
  ),
}))

const renderPage = (): void => {
  const root = createRootRoute({ component: Outlet })
  const inventory = createRoute({
    getParentRoute: () => root,
    path: '/inventory',
    component: () => null,
  })
  const unit = createRoute({
    getParentRoute: () => root,
    path: '/inventory/$unitId',
    component: () => <InventoryUnitPage unitId="IU-2048" />,
  })
  const activity = createRoute({
    getParentRoute: () => root,
    path: '/activity',
    component: () => null,
  })
  const router = createRouter({
    routeTree: root.addChildren([inventory, unit, activity]),
    history: createMemoryHistory({ initialEntries: ['/inventory/IU-2048'] }),
  })

  render(<RouterProvider router={router} />)
}

describe('InventoryUnitPage', () => {
  it('renders the accepted v0.3 detail composition and keeps the action path', async () => {
    renderPage()

    expect(await screen.findByRole('link', { name: 'Inventory' })).toHaveAttribute(
      'href',
      '/inventory',
    )
    expect(screen.getByRole('link', { name: 'Back to inventory' })).toHaveAttribute('href', '/inventory')
    expect(screen.getByRole('heading', { level: 1, name: 'Aster A7 Touring' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Edit Inventory Unit STK-2048' })).toBeVisible()
    expect(screen.getByText('STK-2048', { selector: 'dd' })).toHaveClass('break-all')
    expect(screen.getByRole('region', { name: 'Vehicle Master' })).toBeVisible()
    expect(screen.getByText('VM-014 · A7 Touring')).toBeVisible()
    expect(screen.queryByText('This VIN-specific unit')).not.toBeInTheDocument()
    expect(screen.getByText('Inventory age')).toBeVisible()
    expect(screen.getByText('Zone / Slot')).toBeVisible()
    expect(screen.getByText('North · N-04')).toBeVisible()
    expect(screen.getByText('Current proposed action')).toBeVisible()
    expect(screen.getAllByText('Price reduction planned')).toHaveLength(2)
    expect(screen.getByText('ReviewPricingAgainstComparableTouringUnitsBeforeFridayWithoutLosingContext')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Resolve the aging signal.' })).toBeVisible()
    expect(screen.getByText(/Exactly 90 days is not aging/i)).toBeVisible()
    expect(screen.getByRole('button', { name: 'Record proposed action for STK-2048' })).toBeVisible()
    const recentActivityHeading = screen.getByRole('heading', { name: 'Recent activity' })
    const recentActivitySection = recentActivityHeading.closest('section')
    expect(recentActivitySection).toHaveClass('md:col-start-1', 'md:row-start-2')
    expect(recentActivitySection?.closest('[class~="md:hidden"]')).toBeNull()
    expect(recentActivitySection?.parentElement).toHaveClass('order-3', 'md:contents')
    expect(screen.getByText('Manager action')).toBeVisible()
    expect(screen.getByText('Proposed action recorded by Manager.')).toBeVisible()
    expect(screen.getByText('Review pricing against comparable units before Friday.')).toBeVisible()
    expect(screen.getAllByRole('link', { name: 'Open Inventory Unit STK-2048' })).toHaveLength(2)
    expect(screen.getByText('Inventory unit received')).toBeVisible()
    expect(screen.queryByText('Should not render in recent activity')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View activity' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Review activity history' })).toBeVisible()
    expect(screen.queryByText('Shared definition')).not.toBeInTheDocument()
  })

  it('does not render a note row for an empty latest-action note', async () => {
    const latestAction = detail.unit.latestAction
    if (!latestAction?.note) throw new Error('Expected the detail fixture to include an action note.')
    const existingNote = latestAction.note
    latestAction.note = '   '

    try {
      renderPage()

      expect(await screen.findByText('Current proposed action')).toBeVisible()
      expect(screen.queryByText(existingNote)).not.toBeInTheDocument()
    } finally {
      latestAction.note = existingNote
    }
  })

  it.each(['reserved', 'sold'] as const)('does not present %s stock as aging', async (status) => {
    const previousStatus = detail.unit.inventoryStatus
    const previousAging = detail.isAging
    detail.unit.inventoryStatus = status
    detail.isAging = false

    try {
      renderPage()

      expect(await screen.findByRole('heading', { name: `${status === 'reserved' ? 'Reserved' : 'Sold'} inventory.` })).toBeVisible()
      expect(screen.getByText('Only Available inventory can enter aging review.')).toBeVisible()
      expect(screen.queryByText('128 days · Aging')).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Record proposed action for STK-2048' })).not.toBeInTheDocument()
    } finally {
      detail.unit.inventoryStatus = previousStatus
      detail.isAging = previousAging
    }
  })
})
