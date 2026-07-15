import { Outlet, RouterProvider, createMemoryHistory, createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { UnitListItem } from '../../domain/inventory-types'
import { GlobalInventorySearch } from './global-inventory-search'

const searchQueryMock = vi.hoisted(() => vi.fn())
const refetchMock = vi.hoisted(() => vi.fn())

vi.mock('../../features/inventory/inventory-queries', () => ({
  useGlobalInventorySearchQuery: (search: string) => searchQueryMock(search),
}))

const result: UnitListItem = {
  daysInStock: 128,
  isAging: true,
  master: { id: 'VM-014', make: 'Aster', model: 'A7', variant: 'Touring', type: 'Passenger car' },
  unit: {
    id: 'IU-2048',
    vehicleMasterId: 'VM-014',
    vin: 'WDD2231861A002048',
    stockNumber: 'STK-2048',
    arrivalDate: '2026-03-09T10:00:00.000Z',
    inventoryStatus: 'available',
    latestAction: null,
  },
}

const renderSearch = (variant: 'header' | 'navigation' = 'navigation') => {
  const root = createRootRoute({ component: Outlet })
  const index = createRoute({ getParentRoute: () => root, path: '/', component: () => <GlobalInventorySearch variant={variant} /> })
  const unit = createRoute({ getParentRoute: () => root, path: '/inventory/$unitId', component: () => <p>Unit route</p> })
  const router = createRouter({
    routeTree: root.addChildren([index, unit]),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  render(<RouterProvider router={router} />)
  return router
}

describe('GlobalInventorySearch', () => {
  beforeEach(() => {
    refetchMock.mockReset()
    searchQueryMock.mockReset()
    searchQueryMock.mockReturnValue({ data: { items: [] }, isLoading: false, isError: false, refetch: refetchMock })
  })

  it('opens from navigation and both global keyboard shortcuts', async () => {
    const user = userEvent.setup()
    renderSearch()
    const trigger = await screen.findByRole('button', { name: 'Search inventory' })

    expect(trigger).toHaveAttribute('aria-keyshortcuts', 'Meta+K Control+K')
    expect(screen.getByText('Search')).toHaveClass('global-inventory-search__label')

    await user.click(trigger)
    expect(screen.getByRole('combobox', { name: 'Search inventory' })).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Close search' }))
    await waitFor(() => expect(screen.queryByRole('combobox', { name: 'Search inventory' })).not.toBeInTheDocument())

    fireEvent.keyDown(document, { key: 'k', metaKey: true })
    expect(screen.getByRole('combobox', { name: 'Search inventory' })).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Close search' }))

    fireEvent.keyDown(document, { key: 'k', ctrlKey: true })
    expect(screen.getByRole('combobox', { name: 'Search inventory' })).toBeVisible()
  })

  it('renders an icon-only header trigger and suppresses the input focus outline', async () => {
    const user = userEvent.setup()
    renderSearch('header')

    const trigger = await screen.findByRole('button', { name: 'Search inventory' })
    expect(trigger).toHaveClass('application-header__icon-button', 'global-inventory-search__header-trigger')
    expect(screen.queryByText('Search')).not.toBeInTheDocument()

    await user.click(trigger)
    expect(screen.getByRole('combobox', { name: 'Search inventory' })).toHaveClass('global-inventory-search__input')
  })

  it('uses the Inventory keyword query and opens the selected Unit', async () => {
    const user = userEvent.setup()
    searchQueryMock.mockReturnValue({ data: { items: [result] }, isLoading: false, isError: false, refetch: refetchMock })
    const router = renderSearch()

    await user.click(await screen.findByRole('button', { name: 'Search inventory' }))
    await user.type(screen.getByRole('combobox', { name: 'Search inventory' }), '  STK-2048  ')

    await waitFor(() => expect(searchQueryMock).toHaveBeenLastCalledWith('STK-2048'))
    await user.click(await screen.findByRole('option', { name: /STK-2048.*Aster A7 Touring/i }))

    await waitFor(() => expect(router.state.location.pathname).toBe('/inventory/IU-2048'))
    expect(screen.queryByRole('combobox', { name: 'Search inventory' })).not.toBeInTheDocument()
  })

  it('supports keyboard selection and restores focus after Escape', async () => {
    const user = userEvent.setup()
    searchQueryMock.mockReturnValue({ data: { items: [result] }, isLoading: false, isError: false, refetch: refetchMock })
    const router = renderSearch()
    const trigger = await screen.findByRole('button', { name: 'Search inventory' })

    await user.click(trigger)
    await user.keyboard('{Escape}')
    await waitFor(() => expect(trigger).toHaveFocus())

    fireEvent.keyDown(document, { key: 'k', metaKey: true })
    await user.type(screen.getByRole('combobox', { name: 'Search inventory' }), 'Aster')
    await screen.findByRole('option', { name: /STK-2048.*Aster A7 Touring/i })
    await user.keyboard('{Enter}')

    await waitFor(() => expect(router.state.location.pathname).toBe('/inventory/IU-2048'))
  })

  it('announces loading and empty search states', async () => {
    const user = userEvent.setup()
    searchQueryMock.mockReturnValue({ data: undefined, isLoading: true, isError: false, refetch: refetchMock })
    renderSearch()

    await user.click(await screen.findByRole('button', { name: 'Search inventory' }))
    await user.type(screen.getByRole('combobox', { name: 'Search inventory' }), 'Aster')
    expect(await screen.findByText('Searching inventory…')).toBeVisible()

    cleanup()
    searchQueryMock.mockReturnValue({ data: { items: [] }, isLoading: false, isError: false, refetch: refetchMock })
    renderSearch()
    await user.click(await screen.findByRole('button', { name: 'Search inventory' }))
    await user.type(screen.getByRole('combobox', { name: 'Search inventory' }), 'Unknown')
    expect(await screen.findByText('No Inventory Units match “Unknown”.')).toBeVisible()
  })

  it('offers retry when Inventory search fails', async () => {
    const user = userEvent.setup()
    searchQueryMock.mockReturnValue({ data: undefined, isLoading: false, isError: true, refetch: refetchMock })
    renderSearch()

    await user.click(await screen.findByRole('button', { name: 'Search inventory' }))
    await user.type(screen.getByRole('combobox', { name: 'Search inventory' }), 'Aster')

    await user.click(await screen.findByRole('button', { name: 'Try again' }))
    expect(refetchMock).toHaveBeenCalledTimes(1)
  })
})
