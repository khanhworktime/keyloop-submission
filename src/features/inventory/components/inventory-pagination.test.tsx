import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { InventoryPagination } from './inventory-pagination'

describe('InventoryPagination', () => {
  it('converts the selected page size back to a number', async () => {
    const user = userEvent.setup()
    const onPageSizeChange = vi.fn()
    render(
      <InventoryPagination
        meta={{ page: 1, pageSize: 10, total: 12, totalPages: 2 }}
        onPageChange={vi.fn()}
        onPageSizeChange={onPageSizeChange}
      />,
    )

    await user.click(screen.getByRole('combobox', { name: 'Per page' }))
    await user.click(await screen.findByRole('option', { name: '25' }))

    expect(onPageSizeChange).toHaveBeenCalledWith(25)
  })
})
