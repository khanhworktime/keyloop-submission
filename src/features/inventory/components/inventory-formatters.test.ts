import { describe, expect, it } from 'vitest'

import { formatInventoryAction, formatInventoryStatus } from './inventory-formatters'

describe('inventory presentation labels', () => {
  it('uses an honest fallback when no action exists', () => {
    expect(formatInventoryAction(undefined)).toBe('Not recorded')
  })

  it('formats API enum values as readable English', () => {
    expect(formatInventoryAction('price-reduction-planned')).toBe('Price reduction planned')
    expect(formatInventoryStatus('available')).toBe('Available')
  })
})
