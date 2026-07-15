import { describe, expect, it } from 'vitest'

import { parseRecordActionRequest } from './action-body-parser'
import { parseActivityFilters } from './activity-query-parser'
import { parseInventoryFilters } from './inventory-query-parser'

describe('inventory query parser', () => {
  it('applies stable defaults', () => {
    expect(parseInventoryFilters(new URLSearchParams())).toMatchObject({
      page: 1,
      pageSize: 10,
      age: 'all',
      sortBy: 'daysInStock',
      sortDirection: 'desc',
    })
  })

  it('rejects an unsupported page size', () => {
    expect(() => parseInventoryFilters(new URLSearchParams('pageSize=12'))).toThrow(
      'One or more request values are invalid.',
    )
  })
})

describe('activity query parser', () => {
  it('preserves repeated Stock Number filters and the legacy unit parameter', () => {
    expect(parseActivityFilters(new URLSearchParams('units=STK-2048&units=STK-1934&unit=STK-2048'))).toMatchObject({
      units: ['STK-2048', 'STK-1934'],
    })
  })

  it('rejects an inverted date range', () => {
    expect(() =>
      parseActivityFilters(new URLSearchParams('from=2026-07-15&to=2026-07-01')),
    ).toThrow('One or more request values are invalid.')
  })

  it('rejects calendar-invalid dates', () => {
    expect(() =>
      parseActivityFilters(new URLSearchParams('from=2026-02-30')),
    ).toThrow('One or more request values are invalid.')
  })
})

describe('record action parser', () => {
  it('normalizes a valid action request', () => {
    expect(
      parseRecordActionRequest({
        action: 'price-reduction-planned',
        note: '  Review pricing this Friday.  ',
      }),
    ).toEqual({
      action: 'price-reduction-planned',
      note: 'Review pricing this Friday.',
    })
  })

  it('rejects notes above the limit', () => {
    expect(() =>
      parseRecordActionRequest({
        action: 'price-reduction-planned',
        note: 'x'.repeat(501),
      }),
    ).toThrow('One or more request values are invalid.')
  })
})
