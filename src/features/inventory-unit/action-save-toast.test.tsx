import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ActionSaveToast } from './action-save-toast'

describe('ActionSaveToast', () => {
  it('renders the Base UI toast anatomy and dismisses via its close control', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(
      <ActionSaveToast
        message="Price reduction planned was added to STK-2095 activity."
        onDismiss={onDismiss}
      />,
    )

    expect(await screen.findByText('Action saved')).toBeVisible()
    expect(screen.getByText('Price reduction planned was added to STK-2095 activity.')).toBeVisible()
    expect(document.querySelector('.action-save-toast__viewport')).toBeInTheDocument()
    expect(document.querySelector('.action-save-toast__content')).toBeInTheDocument()

    const dismissButton = document.querySelector<HTMLButtonElement>(
      '.action-save-toast__dismiss',
    )
    expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss action saved message')

    await user.click(dismissButton!)
    await waitFor(() => expect(onDismiss).toHaveBeenCalledTimes(1))
  })

  it('replaces the message without stacking duplicate save notifications', async () => {
    const { rerender } = render(
      <ActionSaveToast message="First saved message." onDismiss={vi.fn()} />,
    )

    expect(await screen.findByText('First saved message.')).toBeVisible()
    rerender(<ActionSaveToast message="Updated saved message." onDismiss={vi.fn()} />)

    expect(await screen.findByText('Updated saved message.')).toBeVisible()
    expect(screen.queryByText('First saved message.')).not.toBeInTheDocument()
    expect(document.querySelectorAll('.action-save-toast')).toHaveLength(1)
  })
})
