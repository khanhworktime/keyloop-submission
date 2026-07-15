import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { InventoryUnit } from '../../domain/inventory-types'
import { InventoryUnitEditSheet } from './inventory-unit-edit-sheet'

const mutation = vi.hoisted(() => ({
  error: null as Error | null,
  isPending: false,
  mutateAsync: vi.fn(),
  reset: vi.fn(),
}))

vi.mock('../inventory/inventory-queries', () => ({
  useUpdateInventoryUnitMutation: () => mutation,
}))

const unit: InventoryUnit = {
  id: 'IU-2048',
  vehicleMasterId: 'VM-014',
  vin: 'WDD2231861A002048',
  stockNumber: 'STK-2048',
  arrivalDate: '2026-03-09T10:00:00.000Z',
  inventoryStatus: 'available',
  zoneSlot: 'North · N-04',
  latestAction: null,
}

describe('InventoryUnitEditSheet', () => {
  beforeEach(() => {
    mutation.mutateAsync.mockReset()
    mutation.reset.mockReset()
    mutation.error = null
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
  })

  it('submits edited identifiers, status, and Zone / Slot', async () => {
    const user = userEvent.setup()
    const onSaved = vi.fn()
    mutation.mutateAsync.mockResolvedValue({
      unit: { unit: { stockNumber: 'STK-UPDATED' } },
      activity: { activity: { eventType: 'unit-updated' } },
    })
    render(<InventoryUnitEditSheet unit={unit} onSaved={onSaved} />)

    await user.click(screen.getByRole('button', { name: 'Edit Inventory Unit STK-2048' }))
    fireEvent.change(await screen.findByLabelText('Stock No.'), { target: { value: ' STK-UPDATED ' } })
    fireEvent.change(screen.getByLabelText('VIN'), { target: { value: ' VIN-UPDATED ' } })
    fireEvent.change(screen.getByLabelText(/Zone \/ Slot/), { target: { value: ' South · S-09 ' } })
    await user.click(screen.getByRole('combobox', { name: 'Status' }))
    await user.click(await screen.findByRole('option', { name: 'Reserved' }))
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    await waitFor(() => expect(mutation.mutateAsync).toHaveBeenCalledTimes(1))
    expect(mutation.mutateAsync).toHaveBeenCalledWith({
      unitId: 'IU-2048',
      vin: 'VIN-UPDATED',
      stockNumber: 'STK-UPDATED',
      inventoryStatus: 'reserved',
      zoneSlot: 'South · S-09',
    })
    expect(onSaved).toHaveBeenCalledWith('STK-UPDATED details were updated.')
  })

  it('keeps the sheet open and blocks an empty required identity', async () => {
    const user = userEvent.setup()
    render(<InventoryUnitEditSheet unit={unit} onSaved={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Edit Inventory Unit STK-2048' }))
    fireEvent.change(await screen.findByLabelText('VIN'), { target: { value: '   ' } })
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('VIN and stock number are required')
    expect(screen.getByRole('heading', { name: 'Edit unit details' })).toBeVisible()
    expect(mutation.mutateAsync).not.toHaveBeenCalled()
  })
})
