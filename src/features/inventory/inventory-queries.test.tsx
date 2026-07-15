import type { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { InventoryPage, RecordActionResult, UpdateInventoryUnitResult } from '../../domain/inventory-types'
import type { InventoryUnitId } from '../../domain/inventory-types'
import type { RecordActionRequest, UpdateInventoryUnitRequest } from '../../lib/api-contracts'
import { useGlobalInventorySearchQuery, useRecordActionMutation, useUpdateInventoryUnitMutation } from './inventory-queries'

const recordActionMock = vi.fn<
  (unitId: InventoryUnitId, payload: RecordActionRequest) => Promise<RecordActionResult>
>()
const updateUnitMock = vi.fn<
  (unitId: InventoryUnitId, payload: UpdateInventoryUnitRequest) => Promise<UpdateInventoryUnitResult>
>()
const fetchInventoryMock = vi.fn<(filters: Record<string, unknown>) => Promise<InventoryPage>>()

vi.mock('../shared/inventory-api', () => ({
  fetchInventory: (filters: Record<string, unknown>) => fetchInventoryMock(filters),
  fetchInventoryUnit: vi.fn(),
  recordInventoryAction: (unitId: InventoryUnitId, payload: RecordActionRequest) =>
    recordActionMock(unitId, payload),
  updateInventoryUnit: (unitId: InventoryUnitId, payload: UpdateInventoryUnitRequest) =>
    updateUnitMock(unitId, payload),
}))

describe('record action mutation', () => {
  beforeEach(() => {
    recordActionMock.mockReset()
    updateUnitMock.mockReset()
    fetchInventoryMock.mockReset()
  })

  it('only searches Inventory for a trimmed non-empty global keyword', async () => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    const wrapper = ({ children }: PropsWithChildren): React.JSX.Element => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { rerender } = renderHook(
      ({ search }) => useGlobalInventorySearchQuery(search),
      { initialProps: { search: '   ' }, wrapper },
    )

    expect(fetchInventoryMock).not.toHaveBeenCalled()

    fetchInventoryMock.mockResolvedValue({ items: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 1 }, facets: { makes: [], models: [], ages: { all: 0, aging: 0, notAging: 0 } } })
    rerender({ search: '  VM  ' })

    await waitFor(() => expect(fetchInventoryMock).toHaveBeenCalledWith({
      search: 'VM',
      page: 1,
      pageSize: 10,
      sortBy: 'daysInStock',
      sortDirection: 'desc',
    }))
  })

  it('invalidates every affected query family after a Unit update', async () => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    const invalidate = vi.spyOn(queryClient, 'invalidateQueries')
    updateUnitMock.mockResolvedValue({} as UpdateInventoryUnitResult)
    const wrapper = ({ children }: PropsWithChildren): React.JSX.Element => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useUpdateInventoryUnitMutation(), { wrapper })

    await act(async () => {
      await result.current.mutateAsync({
        unitId: 'IU-2048',
        vin: 'VIN-UPDATED',
        stockNumber: 'STK-UPDATED',
        inventoryStatus: 'reserved',
        zoneSlot: 'South · S-09',
      })
    })

    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['overview'] })
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['inventory'] })
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['inventory', 'unit', 'IU-2048'] })
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['activity'] })
  })

  it('invalidates every affected query family after success', async () => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    const invalidate = vi.spyOn(queryClient, 'invalidateQueries')
    recordActionMock.mockResolvedValue({} as RecordActionResult)
    const wrapper = ({ children }: PropsWithChildren): React.JSX.Element => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useRecordActionMutation(), { wrapper })

    await act(async () => {
      await result.current.mutateAsync({
        unitId: 'IU-2095',
        action: 'price-reduction-planned',
      })
    })

    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['overview'] })
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['inventory'] })
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['inventory', 'unit', 'IU-2095'] })
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['activity'] })
  })

  it('does not invalidate queries when the mutation fails', async () => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    const invalidate = vi.spyOn(queryClient, 'invalidateQueries')
    recordActionMock.mockRejectedValue(new Error('Save failed'))
    const wrapper = ({ children }: PropsWithChildren): React.JSX.Element => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useRecordActionMutation(), { wrapper })

    await expect(
      act(async () =>
        result.current.mutateAsync({
          unitId: 'IU-2095',
          action: 'price-reduction-planned',
        }),
      ),
    ).rejects.toThrow('Save failed')
    expect(invalidate).not.toHaveBeenCalled()
  })
})
