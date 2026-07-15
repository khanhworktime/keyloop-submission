import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ActivityPage } from './activity-page'

const queryResult = vi.hoisted(() => ({
  data: {
    items: [],
    meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
    facets: { actors: [], eventTypes: [], units: [{ id: 'IU-2048', stockNumber: 'STK-2048', vin: 'WDD2231861A002048', label: 'Aster A7 Touring' }] },
  },
  error: null,
  isError: false,
  isLoading: false,
  refetch: vi.fn(),
}))

vi.mock('../activity-queries', () => ({
  useActivityQuery: () => queryResult,
}))

describe('ActivityPage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
  })

  it('keeps global framing when a Stock Number URL filter is active', () => {
    render(<ActivityPage filters={{ units: ['STK-2048'] }} onFiltersChange={vi.fn()} />)

    expect(screen.getByRole('heading', { name: 'Operational activity' })).toBeVisible()
    expect(screen.getByText(/system events across all inventory/i)).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Filters' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Remove STK-2048' })).toBeVisible()
    expect(screen.getByText('No activity matches these filters')).toBeVisible()
  })

  it('keeps inventory selections as a draft until Apply filter is pressed', async () => {
    const user = userEvent.setup()
    const onFiltersChange = vi.fn()
    render(<ActivityPage filters={{}} onFiltersChange={onFiltersChange} />)

    await user.click(screen.getByRole('combobox', { name: 'Inventory unit' }))
    await user.click(await screen.findByRole('option', { name: /STK-2048.*Aster A7 Touring/i }))

    expect(onFiltersChange).not.toHaveBeenCalled()
    await user.keyboard('{Escape}')
    await user.click(screen.getByRole('button', { name: 'Apply filter' }))
    expect(onFiltersChange).toHaveBeenCalledWith({ units: ['STK-2048'], page: undefined })
  })
})
