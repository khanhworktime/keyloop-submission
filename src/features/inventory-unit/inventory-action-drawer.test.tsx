import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { InventoryActionDrawer } from './inventory-action-drawer'

const mutation = vi.hoisted(() => ({
  error: null as Error | null,
  isPending: false,
  mutateAsync: vi.fn(),
  reset: vi.fn(),
}))

vi.mock('../inventory/inventory-queries', () => ({
  useRecordActionMutation: () => mutation,
}))

describe('InventoryActionDrawer', () => {
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

  it('blocks notes above 500 characters without calling the mutation', async () => {
    const user = userEvent.setup()
    render(
      <InventoryActionDrawer
        initialAction="price-reduction-planned"
        stockNumber="STK-2048"
        unitId="IU-2048"
        vehicleLabel="Aster A7 Touring"
        onSaved={vi.fn()}
      />,
    )
    await user.click(screen.getByRole('button', { name: /record proposed action for STK-2048/i }))
    fireEvent.change(await screen.findByLabelText(/manager note/i), { target: { value: 'x'.repeat(501) } })
    await user.click(screen.getByRole('button', { name: /save proposed action/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent('500 characters or fewer')
    expect(mutation.mutateAsync).not.toHaveBeenCalled()
  })

  it('submits one action and announces persisted activity evidence', async () => {
    const user = userEvent.setup()
    const onSaved = vi.fn()
    mutation.mutateAsync.mockResolvedValue({})
    render(
      <InventoryActionDrawer
        initialAction="marketing-campaign-review"
        stockNumber="STK-2048"
        unitId="IU-2048"
        vehicleLabel="Aster A7 Touring"
        onSaved={onSaved}
      />,
    )
    await user.click(screen.getByRole('button', { name: /record proposed action for STK-2048/i }))
    fireEvent.change(await screen.findByLabelText(/manager note/i), { target: { value: 'Review Friday.' } })
    await user.click(screen.getByRole('button', { name: /save proposed action/i }))

    await waitFor(() => expect(mutation.mutateAsync).toHaveBeenCalledTimes(1))
    expect(mutation.mutateAsync).toHaveBeenCalledWith({
      unitId: 'IU-2048',
      action: 'marketing-campaign-review',
      note: 'Review Friday.',
    })
    expect(onSaved).toHaveBeenCalledWith(
      'Marketing campaign review was added to STK-2048 activity.',
    )
  })

})
