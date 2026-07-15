import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { InventoryFacets } from '../../../domain/inventory-types'
import { InventoryFilters } from './inventory-filters'

const facets: InventoryFacets = {
  ages: { aging: 4, all: 12, notAging: 8 },
  makes: ['Aster', 'Vela'],
  models: ['A7', 'C4'],
}

describe('inventory filters', () => {
  it('shows global age counts before other filters narrow the result', () => {
    render(<InventoryFilters facets={facets} search={{}} onChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'All units · 12' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Aging inventory · 4' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Not aging · 8' })).toBeInTheDocument()
  })

  it('does not present global age facets as filtered result counts', () => {
    render(<InventoryFilters facets={facets} search={{ make: 'Aster' }} onChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'All units' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'All units · 12' })).not.toBeInTheDocument()
  })

  it('emits the existing filter state shape from the branded Make select', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<InventoryFilters facets={facets} search={{ age: 'aging' }} onChange={onChange} />)

    await user.click(screen.getByRole('combobox', { name: 'Make' }))
    await user.click(await screen.findByRole('option', { name: 'Aster' }))

    expect(onChange).toHaveBeenCalledWith({ age: 'aging', make: 'Aster', page: undefined })
  })

  it('submits a Vehicle Master keyword through the shared Inventory search state', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<InventoryFilters facets={facets} search={{}} onChange={onChange} />)

    await user.type(screen.getByRole('textbox', { name: 'Search inventory' }), 'VM-014')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(onChange).toHaveBeenCalledWith({ search: 'VM-014', page: undefined })
  })
})
