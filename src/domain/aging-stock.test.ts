import { describe, expect, it } from 'vitest'

import { daysInStock, isAgingStock } from './aging-stock'

describe('aging stock', () => {
  const now = new Date('2026-07-15T00:01:00-07:00')

  it.each([
    ['2026-04-17T23:59:59Z', 'available', 89, false],
    ['2026-04-16T00:00:00Z', 'available', 90, false],
    ['2026-04-15T23:59:59Z', 'available', 91, true],
    ['2026-04-15T23:59:59Z', 'reserved', 91, false],
    ['2026-04-15T23:59:59Z', 'sold', 91, false],
  ] as const)('derives UTC calendar age for %s with %s status', (arrivalDate, status, expectedDays, expectedAging) => {
    expect(daysInStock(arrivalDate, now)).toBe(expectedDays)
    expect(isAgingStock(arrivalDate, status, now)).toBe(expectedAging)
  })

  it('does not produce a negative age for a future arrival date', () => {
    expect(daysInStock('2026-07-16T00:00:00Z', now)).toBe(0)
  })

  it('rejects invalid dates', () => {
    expect(() => daysInStock('not-a-date', now)).toThrow(RangeError)
  })
})
