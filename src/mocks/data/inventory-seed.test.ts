import { describe, expect, it } from 'vitest'

import { daysInStock } from '../../domain/aging-stock'
import { createInventorySeed, SEED_REFERENCE_NOW } from './inventory-seed'

describe('inventory seed', () => {
  it('preserves the reviewed Aster, Northstar, and Vela identities', () => {
    const state = createInventorySeed()
    const identities = state.inventoryUnits.map((unit) => {
      const master = state.vehicleMasters.find((candidate) => candidate.id === unit.vehicleMasterId)
      return `${unit.stockNumber}:${master?.make} ${master?.model} ${master?.variant}`
    })

    expect(identities).toContain('STK-2048:Aster A7 Touring')
    expect(identities).toContain('STK-1934:Northstar E2 Motion')
    expect(identities).toContain('STK-1918:Vela C4 Urban')
  })

  it('contains realistic breadth and the 89, 90, and 91 day boundaries', () => {
    const state = createInventorySeed()
    const ages = state.inventoryUnits.map((unit) => daysInStock(unit.arrivalDate, SEED_REFERENCE_NOW))

    expect(state.inventoryUnits).toHaveLength(12)
    expect(ages).toEqual(expect.arrayContaining([89, 90, 91]))
    expect(new Set(state.inventoryUnits.map((unit) => unit.vin)).size).toBe(12)
  })

  it('keeps derived aging fields out of the persisted envelope', () => {
    const serialized = JSON.stringify(createInventorySeed())

    expect(serialized).not.toContain('daysInStock')
    expect(serialized).not.toContain('isAging')
    expect(serialized).toContain('North · N-04')
  })
})
