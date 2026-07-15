import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ActivityFilterDrawer } from './activity-filter-drawer'

describe('ActivityFilterDrawer', () => {
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

  it('uses the shared accessible selects for event type and actor', async () => {
    const user = userEvent.setup()
    render(
      <ActivityFilterDrawer
        facets={{
          actors: ['Manager'],
          eventTypes: ['manager-action'],
          units: [],
        }}
        filters={{}}
        onApply={vi.fn()}
      />,
    )

    await user.click(screen.getByRole('button', { name: /advanced filters/i }))

    expect(await screen.findByRole('combobox', { name: 'Event type' })).toHaveTextContent('All events')
    expect(screen.getByRole('combobox', { name: 'Actor' })).toHaveTextContent('Anyone')
  })
})
