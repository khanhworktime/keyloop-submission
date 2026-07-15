import { describe, expect, it } from 'vitest'

import { InventoryRepositoryError } from '../../domain/inventory-repository'
import { createInventorySeed } from '../data/inventory-seed'
import { parseInventoryState } from './inventory-state-parser'

function expectParserError(raw: string, code: InventoryRepositoryError['code']): void {
  try {
    parseInventoryState(raw)
    throw new Error(`Expected ${code} to be thrown.`)
  } catch (error) {
    expect(error).toBeInstanceOf(InventoryRepositoryError)
    expect((error as InventoryRepositoryError).code).toBe(code)
  }
}

describe('parseInventoryState', () => {
  it('rejects unknown state shapes and missing master references', () => {
    expectParserError(JSON.stringify({ version: 2 }), 'CORRUPT_STATE')

    const state = createInventorySeed()
    state.vehicleMasters = state.vehicleMasters.filter(({ id }) => id !== 'VM-014')
    expectParserError(JSON.stringify(state), 'MISSING_REFERENCE')
  })

  it('rejects forbidden persisted fields and overlong persisted notes', () => {
    const withForbiddenField = JSON.parse(JSON.stringify(createInventorySeed())) as {
      inventoryUnits: Array<Record<string, unknown>>
    }
    const firstUnit = withForbiddenField.inventoryUnits[0]
    if (!firstUnit) throw new Error('Expected seeded inventory unit.')
    firstUnit.zone = 'North'
    expectParserError(JSON.stringify(withForbiddenField), 'CORRUPT_STATE')

    const withLongNote = createInventorySeed()
    const action = withLongNote.inventoryUnits.find(({ latestAction }) => latestAction)?.latestAction
    if (!action) throw new Error('Expected seeded action.')
    action.note = 'x'.repeat(501)
    expectParserError(JSON.stringify(withLongNote), 'CORRUPT_STATE')
  })

  it('rejects activity references to missing units', () => {
    const state = createInventorySeed()
    state.inventoryUnits = state.inventoryUnits.filter(({ id }) => id !== state.activities[0]?.unitId)

    expectParserError(JSON.stringify(state), 'MISSING_REFERENCE')
  })

  it('rejects non-canonical timestamps and oversized identity fields', () => {
    const invalidDate = createInventorySeed()
    invalidDate.inventoryUnits[0]!.arrivalDate = '2026-02-30T12:00:00.000Z'
    expectParserError(JSON.stringify(invalidDate), 'CORRUPT_STATE')

    const oversizedVin = createInventorySeed()
    oversizedVin.inventoryUnits[0]!.vin = 'V'.repeat(65)
    expectParserError(JSON.stringify(oversizedVin), 'CORRUPT_STATE')

    const oversizedZoneSlot = createInventorySeed()
    oversizedZoneSlot.inventoryUnits[0]!.zoneSlot = 'Z'.repeat(81)
    expectParserError(JSON.stringify(oversizedZoneSlot), 'CORRUPT_STATE')
  })

  it('keeps older V1 snapshots without Zone / Slot readable', () => {
    const state = createInventorySeed()
    delete state.inventoryUnits[0]!.zoneSlot

    expect(parseInventoryState(JSON.stringify(state)).inventoryUnits[0]?.zoneSlot).toBeUndefined()
  })
})
