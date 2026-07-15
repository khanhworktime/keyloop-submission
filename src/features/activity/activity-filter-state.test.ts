import { describe, expect, it } from 'vitest'

import {
  countAdvancedFilters,
  parseActivitySearch,
  toActivityQueryFilters,
  withoutFilter,
} from './activity-filter-state'

describe('activity filter state', () => {
  it('keeps human-readable stock filters and supported advanced values', () => {
    expect(
      parseActivitySearch({
        unit: ' STK-2048 ',
        eventType: 'manager-action',
        actor: 'Krist Manager',
        from: '2026-07-01',
        to: '2026-07-15',
        page: '2',
      }),
    ).toEqual({
      units: ['STK-2048'],
      search: undefined,
      eventType: 'manager-action',
      actor: 'Krist Manager',
      from: '2026-07-01',
      to: '2026-07-15',
      page: 2,
    })
  })

  it('drops malformed values before they reach the API', () => {
    expect(
      parseActivitySearch({ eventType: 'zone-change', from: 'later', to: '2026-06-01', page: -4 }),
    ).toEqual({
      units: undefined,
      search: undefined,
      eventType: undefined,
      actor: undefined,
      from: undefined,
      to: '2026-06-01',
      page: undefined,
    })
  })

  it('rejects calendar-invalid dates that Date.parse would normalize', () => {
    expect(parseActivitySearch({ from: '2026-02-30', to: '2026-13-01' })).toMatchObject({
      from: undefined,
      to: undefined,
    })
  })

  it('builds a bounded API page and resets pagination when a chip is removed', () => {
    expect(toActivityQueryFilters({ units: ['STK-2048', 'STK-1934'] })).toEqual({
      units: ['STK-2048', 'STK-1934'],
      page: 1,
      pageSize: 10,
    })
    expect(withoutFilter({ units: ['STK-2048'], page: 3 }, 'units')).toEqual({
      units: undefined,
      page: undefined,
    })
    expect(countAdvancedFilters({ eventType: 'manager-action', from: '2026-07-01', to: '2026-07-15' })).toBe(2)
  })
})
