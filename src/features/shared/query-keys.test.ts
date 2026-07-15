import { describe, expect, it } from 'vitest'

import { activityKeys, inventoryKeys } from './query-keys'

describe('query keys', () => {
  it('keeps inventory filter keys stable across property order', () => {
    expect(inventoryKeys.list({ make: 'Aster', age: 'aging', page: 1 })).toEqual(
      inventoryKeys.list({ page: 1, age: 'aging', make: 'Aster' }),
    )
  })

  it('omits empty global activity filters', () => {
    expect(activityKeys.list({ units: [], eventType: undefined })).toEqual([
      'activity',
      'list',
      '',
    ])
  })
})
