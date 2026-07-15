import { describe, expect, it } from 'vitest'

import {
  toInventoryFilters,
  updateInventorySearch,
  validateInventorySearch,
} from './inventory-filter-state'

describe('inventory URL filter state', () => {
  it('normalizes invalid and default values out of the URL state', () => {
    expect(validateInventorySearch({
      age: 'old',
      page: '-2',
      pageSize: '12',
      search: '   ',
      sortBy: 'location',
      sortDirection: 'sideways',
    })).toEqual({
      age: undefined,
      make: undefined,
      model: undefined,
      page: undefined,
      pageSize: undefined,
      search: undefined,
      sortBy: undefined,
      sortDirection: undefined,
    })
  })

  it('hydrates supported filters and constrains text', () => {
    const search = validateInventorySearch({
      age: 'aging',
      make: ' Aster ',
      model: 'A7',
      page: '3',
      pageSize: '25',
      search: ' STK-2048 ',
      sortBy: 'make',
      sortDirection: 'asc',
    })

    expect(search).toEqual({
      age: 'aging',
      make: 'Aster',
      model: 'A7',
      page: 3,
      pageSize: 25,
      search: 'STK-2048',
      sortBy: 'make',
      sortDirection: 'asc',
    })
  })

  it('maps clean URL state to API defaults', () => {
    expect(toInventoryFilters({})).toEqual({
      age: 'all',
      make: undefined,
      model: undefined,
      page: 1,
      pageSize: 10,
      search: undefined,
      sortBy: 'daysInStock',
      sortDirection: 'desc',
    })
  })

  it('resets the page when a filter changes', () => {
    expect(updateInventorySearch({ page: 4, make: 'Aster' }, { age: 'aging' })).toEqual({
      age: 'aging',
      make: 'Aster',
      model: undefined,
      page: undefined,
      pageSize: undefined,
      search: undefined,
      sortBy: undefined,
      sortDirection: undefined,
    })
  })

  it('preserves an explicit pagination change', () => {
    expect(updateInventorySearch({ age: 'aging', page: 2 }, { page: 3 }, false).page).toBe(3)
  })
})
